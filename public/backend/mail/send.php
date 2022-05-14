<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Importování nutných závislostí
require './PHPMailer/PHPMailer.php';
require './PHPMailer/SMTP.php';
require './PHPMailer/Exception.php';

require_once '../utils.php';
require_once '../secret.php';

$mail = new PHPMailer(true);

// Podpora diakritiky
$mail->CharSet = 'UTF-8';
$mail->Encoding = 'base64';

try {
    $php_input = file_get_contents('php://input');

    if (strlen($php_input) <= 0 && !isValidJSON($php_input)) {
        throw new Exception('Invalid JSON');
    }

    $API_REQUEST = json_decode($php_input);

    //die(print_r($API_REQUEST));

    if (!isset($API_REQUEST->{'email'})) {
        throw new Exception('Missing email property');
    } else {
        if (!filter_var($API_REQUEST->{'email'}, FILTER_VALIDATE_EMAIL)) {
            throw new Exception('Invalid e-mail address');
        }
    }
    if (!isset($API_REQUEST->{'name'})) {
        throw new Exception('Missing name property');
    }

    //Ověření validity e-mailu a jména
    if ($mail->addReplyTo($API_REQUEST->{'email'}, $API_REQUEST->{'name'})) {
        //Ověření existence captchy
        if (isset($API_REQUEST->{'captcha'})) {
            $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
            $recaptcha_secret = RECAPTCHA_SECRET;
            $recaptcha_response = $API_REQUEST->{'captcha'};
            //Verifikace reCAPTCHA
            $curl = curl_init();
            if ($curl === false) {
                throw new Exception('Can\'t create cURL handle');
            }
            curl_setopt($curl, CURLOPT_URL, $recaptcha_url . '?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            $recaptcha = curl_exec($curl);
            curl_close($curl);
            $recaptcha = json_decode($recaptcha);

            if ($recaptcha->success == true) {
                if ($recaptcha->score >= 0.3) {
                    //Nastavení
                    $mail->isSMTP();                                                                        //Aktivování SMTP
                    $mail->Host       = MAIL_HOST;                                                          //Nastavení SMTP serveru
                    $mail->SMTPAuth   = true;                                                               //Povolení SMTP autentifikace
                    $mail->Username   = MAIL_USERNAME;                                                      //SMTP login
                    $mail->Password   = base64_decode(MAIL_SECRET);                                         //SMTP heslo
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;                                     //TLS šifrování
                    $mail->Port       = 587;                                                                //Port pro STARTTLS

                    //Kontakt
                    $mail->setFrom(MAIL_USERNAME, 'Webový formulář');
                    $mail->addAddress(MAIL_USERNAME);

                    $mail->addReplyTo($API_REQUEST->{'email'}, $API_REQUEST->{'name'});

                    //Obsah
                    $content = 'Jméno: ' . $API_REQUEST->{'name'} . "\n E-mail: " . $API_REQUEST->{'email'} . "\n Rok narození: " . $API_REQUEST->{'birthDate'} . "\n Zpráva: " . $API_REQUEST->{'message'};
                    $mail->isHTML(false);
                    $mail->Subject = 'HackDays 2022 | Předběžná registrace přes webový formulář';
                    $mail->Body    = $content;

                    //Odeslání
                    $mail->send();
                    echo json_encode(array('result' => 'SUCCESS'));
                } else {
                    echo json_encode(array('result' => 'CAPTCHA', 'error' => "Score too low: " . $recaptcha->score));
                }
            } else {
                echo json_encode(array('result' => 'CAPTCHA', 'error' => 'reCAPTCHA was evaluated as invalid'));
            }
        } else {
            throw new Exception('Missing reCAPTCHA');
        }
    } else {
        throw new Exception('Invalid values of properties email and name in JSON');
    }
} catch (Exception $e) {
    echo json_encode(array('result' => 'ERROR', 'error' => $e->getMessage()));
}

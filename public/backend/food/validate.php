<?php
require_once '../utils.php';
require_once '../secret.php';

try {
    $php_input = file_get_contents('php://input');

    if (strlen($php_input) <= 0 && !isValidJSON($php_input)) {
        throw new Exception('Invalid JSON');
    }

    $API_REQUEST = json_decode($php_input);

    if (!isset($API_REQUEST->{'token'})) {
        throw new Exception('Missing token property');
    }

    if (isValidJwt($API_REQUEST->{'token'}, FOOD_TOKEN_SECRET)) {
        echo json_encode(array('result' => 'true'));
    } else {
        echo json_encode(array('result' => 'false'));
    }
} catch (Exception $e) {
    echo json_encode(array('result' => 'ERROR', 'error' => $e->getMessage()));
}

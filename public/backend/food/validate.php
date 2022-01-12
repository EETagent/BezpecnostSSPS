<?php
require '../utils.php';

const SECRET = 'REDACTED';

try {
    $php_input = file_get_contents('php://input');

    if (strlen($php_input) <= 0 && !isValidJSON($php_input)) {
        throw new Exception('Invalid JSON');
    }

    $API_REQUEST = json_decode($php_input);
    
    if (!isset($API_REQUEST->{'token'})) {
        throw new Exception('Missing token property');
    } 

    echo json_encode(array('result'=>isValidJWT($API_REQUEST->{'token'}, SECRET)));
} 

catch (Exception $e) {
    echo json_encode(array('result'=>'ERROR', 'error'=>$e->getMessage()));
}
?>

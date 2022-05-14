<?php

require_once '../../utils.php';
require_once '../../config.php';
require_once 'init.php';

try {
    $db = init_db(write: true);

    $php_input = file_get_contents('php://input');

    if (strlen($php_input) <= 0 && !isValidJSON($php_input)) {
        throw new Exception('Invalid JSON');
    }

    $API_REQUEST = json_decode($php_input);

    if (!isset($API_REQUEST->{'token'})) {
        throw new Exception('Missing token property');
    }

    if (!isValidJWT($API_REQUEST->{'token'}, FOOD_TOKEN_SECRET)) {
        throw new Exception('Invalid JWT');
    }

    $stmt = $db->prepare('DELETE FROM food WHERE token = :token');
    $stmt->bindValue(':token', $API_REQUEST->{'token'}, SQLITE3_TEXT);

    $result = $stmt->execute();

    $db->close();
    echo json_encode(array('result' => 'SUCCESS'));
} catch (Exception $e) {
    if (isset($db)) {
        $db->close();
    }
    echo json_encode(array('result' => 'ERROR', 'error' => $e->getMessage()));
}

<?php
require_once '../../utils.php';
require_once '../../secret.php';
require_once 'init.php';

try {
    $db = init_db(write: true);

    $php_input = file_get_contents('php://input');

    if (strlen($php_input) <= 0 && !isValidJSON($php_input)) {
        throw new Exception('Invalid JSON');
    }

    $API_REQUEST = json_decode($php_input);

    if (!isset($API_REQUEST->{'secret'})) {
        throw new Exception('Missing secret property');
    }

    if ($API_REQUEST->{'secret'} !== FOOD_TOKEN_SECRET) {
        throw new Exception('Invalid secret property');
    }

    $result = $db->query('SELECT * FROM food');

    $data = array('result' => 'SUCCESS');
    $data['data']  = array();

    $resultArray = $result->fetchArray(SQLITE3_ASSOC);
    while ($resultArray !== false) {
        array_push($data['data'], $resultArray);
        $resultArray = $result->fetchArray(SQLITE3_ASSOC);
    }
    unset($resultArray);

    $db->close();

    echo json_encode($data);
} catch (Exception $e) {
    if (isset($db)) {
        $db->close();
    }
    echo json_encode(array('result' => 'ERROR', 'error' => $e->getMessage()));
}

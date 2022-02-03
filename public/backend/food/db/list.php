<?php
require_once '../../utils.php';
require_once '../../secret.php';
require_once 'init.php';

try {
    $db = init_db();

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

<?php
function isValidJSON($str) {
    json_decode($str);
    return json_last_error() == JSON_ERROR_NONE;
}

function base64UrlEncode($text) {
    return str_replace(
        ['+', '/', '='],
        ['-', '_', ''],
        base64_encode($text)
    );
}

function isValidJWT($jwt, $secret) {
    $tokenParts = explode('.', $jwt);

    if (count($tokenParts) !== 3) {
        return false;
    }

    $header = base64_decode($tokenParts[0]);
    $payload = base64_decode($tokenParts[1]);
    $signatureProvided = $tokenParts[2];

    $base64UrlHeader = base64UrlEncode($header);
    $base64UrlPayload = base64UrlEncode($payload);
    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret, true);
    $base64UrlSignature = base64UrlEncode($signature);

    return $base64UrlSignature === $signatureProvided;
}

function getPayloadJWT($jwt) {
    $tokenParts = explode('.', $jwt);
    return base64_decode($tokenParts[1]);
}

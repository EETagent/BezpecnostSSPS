<?php
function isValidJSON(string $str): bool {
    json_decode($str);
    return json_last_error() == JSON_ERROR_NONE;
}

function base64UrlEncode(string $text): string {
    return str_replace(
        ['+', '/', '='],
        ['-', '_', ''],
        base64_encode($text)
    );
}

function isValidJWT(string $jwt, string $secret): bool {
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

function getPayloadJWT($jwt): string {
    $tokenParts = explode('.', $jwt);
    return base64_decode($tokenParts[1]);
}

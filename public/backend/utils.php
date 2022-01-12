<?
// Ověření validty JSON vstupu
function isValidJSON($str) {
    json_decode($str);
    return json_last_error() == JSON_ERROR_NONE;
}

// Ověření validyty JWT tokenu
function isValidJWT($jwt, $secret) {
	$tokenParts = explode('.', $jwt);
    if (count($tokenParts) !== 3) {
        return FALSE;
    }
	$header = base64_decode($tokenParts[0]);

	$payload = base64_decode($tokenParts[1]);

	$signature_provided = $tokenParts[2];

	$base64_url_header = base64url_encode($header);
	$base64_url_payload = base64url_encode($payload);
	$signature = hash_hmac('SHA256', $base64_url_header . "." . $base64_url_payload, $secret, true);
	$base64_url_signature = base64url_encode($signature);

	$is_signature_valid = ($base64_url_signature === $signature_provided);
	
	if (!$is_signature_valid) {
		return FALSE;
	} else {
		return TRUE;
	}
}

// Base64 decode
function base64url_encode($str) {
    return rtrim(strtr(base64_encode($str), '+/', '-_'), '=');
}
?>
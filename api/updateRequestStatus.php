<?php


header("Access-Control-Allow-Origin: https://bloodbankreact.onrender.com/");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: *");

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
require_once "./config/database.php";

try {

    $data = json_decode(file_get_contents("php://input"), true);

    $requestId = $data['requestId'] ?? '';
    $status = $data['status'] ?? '';

    if (
        empty($requestId) ||
        empty($status)
    ) {
        throw new Exception("Missing fields");
    }

    $allowedStatus = [
        "Approved",
        "Rejected",
        "Pending"
    ];

    if (!in_array($status, $allowedStatus)) {
        throw new Exception("Invalid status");
    }

    $database = new Database();
    $conn = $database->connect();

    $query = "
        UPDATE blood_requests
        SET status = ?
        WHERE id = ?
    ";

    $stmt = $conn->prepare($query);

    if (!$stmt) {
        throw new Exception($conn->error);
    }

    $stmt->bind_param(
        "si",
        $status,
        $requestId
    );

    $stmt->execute();

    echo json_encode([
        "status" => true,
        "message" => "Request updated successfully"
    ]);

} catch (Exception $e) {

    echo json_encode([
        "status" => false,
        "message" => $e->getMessage()
    ]);
}
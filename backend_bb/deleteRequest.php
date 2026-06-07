<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "./config/database.php";

$conn = (new Database())->connect();

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['id'])) {
    echo json_encode([
        "status" => false,
        "message" => "Request ID is required"
    ]);
    exit;
}

$id = (int)$data['id'];

$sql = "DELETE FROM blood_requests WHERE id = ?";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "status" => false,
        "message" => "Prepare failed",
        "error" => $conn->error
    ]);
    exit;
}

$stmt->bind_param("i", $id);

if ($stmt->execute()) {

    if ($stmt->affected_rows > 0) {
        echo json_encode([
            "status" => true,
            "message" => "Request deleted successfully"
        ]);
    } else {
        echo json_encode([
            "status" => false,
            "message" => "Request not found"
        ]);
    }

} else {
    echo json_encode([
        "status" => false,
        "message" => "Failed to delete request",
        "error" => $stmt->error
    ]);
}

$stmt->close();
$conn->close();
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

    $receiverId = $_GET['receiverId'] ?? '';

    if (empty($receiverId)) {
        echo json_encode([
            "status" => false,
            "message" => "Receiver ID is required"
        ]);
        exit;
    }

    $database = new Database();
    $conn = $database->connect();

    $query = "
        SELECT
            id,
            hospital_name,
            requested_blood_group AS blood_group,
            quantity,
            status
        FROM blood_requests
        WHERE receiver_id = ?
        ORDER BY id DESC
    ";

    $stmt = $conn->prepare($query);

    if (!$stmt) {
        throw new Exception("Prepare Failed: " . $conn->error);
    }

    $stmt->bind_param("i", $receiverId);

    if (!$stmt->execute()) {
        throw new Exception("Execute Failed: " . $stmt->error);
    }

    $result = $stmt->get_result();

    $requests = [];

    while ($row = $result->fetch_assoc()) {
        $requests[] = $row;
    }

    echo json_encode([
        "status" => true,
        "count" => count($requests),
        "data" => $requests
    ]);

} catch (Exception $e) {

    echo json_encode([
        "status" => false,
        "message" => $e->getMessage()
    ]);
}
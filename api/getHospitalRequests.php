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

    $hospitalName = $_GET['hospital_name'] ?? '';

    if (empty($hospitalName)) {
        throw new Exception("Hospital name is required");
    }

    $database = new Database();
    $conn = $database->connect();

    $query = "
        SELECT
            id,
            receiver_name,
            email,
            contact,
            address,
            requested_blood_group,
            quantity,
            status,
            created_at
        FROM blood_requests
        WHERE hospital_name = ?
        ORDER BY id DESC
    ";

    $stmt = $conn->prepare($query);

    if (!$stmt) {
        throw new Exception($conn->error);
    }

    $stmt->bind_param("s", $hospitalName);
    $stmt->execute();

    $result = $stmt->get_result();

    $requests = [];

    while ($row = $result->fetch_assoc()) {
        $requests[] = $row;
    }

    echo json_encode([
        "status" => true,
        "data" => $requests
    ]);

} catch (Exception $e) {

    echo json_encode([
        "status" => false,
        "message" => $e->getMessage()
    ]);
}
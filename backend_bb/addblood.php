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

try {

    $json = file_get_contents("php://input");

    if (empty($json)) {
        echo json_encode([
            "status" => false,
            "message" => "No data received"
        ]);
        exit;
    }

    $data = json_decode($json, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode([
            "status" => false,
            "message" => "Invalid JSON: " . json_last_error_msg()
        ]);
        exit;
    }

    $hospital_id = isset($data['hospital_id']) ? (int)$data['hospital_id'] : 0;
    $hospital_name = trim($data['hospital_name'] ?? '');
    $role = trim($data['role'] ?? '');
    $blood_group = trim($data['blood_group'] ?? '');
    $quantity = isset($data['quantity']) ? (int)$data['quantity'] : 0;

    if (
        $hospital_id <= 0 ||
        empty($hospital_name) ||
        empty($blood_group) ||
        $quantity <= 0
    ) {
        echo json_encode([
            "status" => false,
            "message" => "All fields are required"
        ]);
        exit;
    }

    if ($role !== "hospital") {
        echo json_encode([
            "status" => false,
            "message" => "Only hospitals can add blood samples"
        ]);
        exit;
    }

    $database = new Database();
    $conn = $database->connect();

    if (!$conn) {
        throw new Exception("Database connection failed");
    }

$query = "INSERT INTO blood_samples
(hospital_id, hospital_name, blood_group, quantity)
VALUES (?, ?, ?, ?)";

$stmt = mysqli_prepare($conn, $query);

mysqli_stmt_bind_param(
    $stmt,
    "issi",
    $hospital_id,
    $hospital_name,
    $blood_group,
    $quantity
);

if (mysqli_stmt_execute($stmt)) {

    echo json_encode([
        "status" => true,
        "message" => "Blood Sample Added Successfully",
        "blood_id" => mysqli_insert_id($conn)
    ]);

} else {

    echo json_encode([
        "status" => false,
        "message" => mysqli_error($conn)
    ]);
}

} catch (PDOException $e) {

    echo json_encode([
        "status" => false,
        "message" => "Database Error",
        "error" => $e->getMessage()
    ]);

} catch (Exception $e) {

    echo json_encode([
        "status" => false,
        "message" => $e->getMessage()
    ]);
}
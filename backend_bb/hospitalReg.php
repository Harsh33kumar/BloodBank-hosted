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
    $data = json_decode($json, true);

    if (!$data) {
        echo json_encode([
            "status" => false,
            "message" => "Invalid JSON Data"
        ]);
        exit;
    }

    $hospitalName = trim($data['hospitalName'] ?? '');
    $email = trim($data['email'] ?? '');
    $password = trim($data['password'] ?? '');
    $address = trim($data['address'] ?? '');
    $phone = trim($data['phone'] ?? '');

    if (
        empty($hospitalName) ||
        empty($email) ||
        empty($password)
    ) {
        echo json_encode([
            "status" => false,
            "message" => "Hospital Name, Email and Password are required"
        ]);
        exit;
    }

    $db = new Database();
    $conn = $db->connect();

    // Check existing email
    $check = $conn->prepare(
        "SELECT id FROM hospitals WHERE email = ?"
    );

    $check->bind_param("s", $email);
    $check->execute();

    $result = $check->get_result();

    if ($result->num_rows > 0) {
        echo json_encode([
            "status" => false,
            "message" => "Email already registered"
        ]);
        exit;
    }

    // Hash password
    $hashedPassword = password_hash(
        $password,
        PASSWORD_DEFAULT
    );

    // // Insert record
    // $stmt = $conn->prepare(
    //     "INSERT INTO hospitals
    //     (hospital_name, email, password, address, phone)
    //     VALUES (?, ?, ?, ?, ?)"
    // );

    // $stmt->bind_param(
    //     "sssss",
    //     $hospitalName,
    //     $email,
    //     $hashedPassword,
    //     $address,
    //     $phone
    // );
    $role = "hospital";

$stmt = $conn->prepare(
    "INSERT INTO hospitals
    (hospital_name, email, password, address, phone, role)
    VALUES (?, ?, ?, ?, ?, ?)"
);

$stmt->bind_param(
    "ssssss",
    $hospitalName,
    $email,
    $hashedPassword,
    $address,
    $phone,
    $role
);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => true,
            "message" => "Hospital registered successfully"
        ]);
    } else {
        echo json_encode([
            "status" => false,
            "message" => "Failed to register hospital"
        ]);
    }

    $stmt->close();
    $check->close();
    $conn->close();

} catch (Exception $e) {

    echo json_encode([
        "status" => false,
        "message" => $e->getMessage()
    ]);
}
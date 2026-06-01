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

    // Match frontend field names
    $username = trim($data['username'] ?? '');
    $email = trim($data['email'] ?? '');
    $password = trim($data['password'] ?? '');
    $address = trim($data['address'] ?? '');
    $contact = trim($data['contact'] ?? '');
    $bloodGroup = trim($data['bloodGroup'] ?? '');

    if (
        empty($username) ||
        empty($email) ||
        empty($password) ||
        empty($bloodGroup)
    ) {
        echo json_encode([
            "status" => false,
            "message" => "All required fields are mandatory"
        ]);
        exit();
    }

    $db = new Database();
    $conn = $db->connect();

    // Check existing email
    $check = $conn->prepare(
        "SELECT id FROM receivers WHERE email = ?"
    );

    $check->bind_param("s", $email);
    $check->execute();

    $result = $check->get_result();

    if ($result->num_rows > 0) {
        echo json_encode([
            "status" => false,
            "message" => "Email already registered"
        ]);
        exit();
    }

    // Hash password
    $hashedPassword = password_hash(
        $password,
        PASSWORD_DEFAULT
    );

    $role = "receiver"; // Set role for receiver
    // Insert receiver
    $stmt = $conn->prepare(
        "INSERT INTO receivers
        (username, email, password, address, contact, role, blood_group)
        VALUES (?, ?, ?, ?, ?, ?, ?)"
    );

    $stmt->bind_param(
        "sssssss",
        $username,
        $email,
        $hashedPassword,
        $address,
        $contact,
        $role,
        $bloodGroup
    );

    if ($stmt->execute()) {

        echo json_encode([
            "status" => true,
            "message" => "Receiver registered successfully"
        ]);

    } else {

        echo json_encode([
            "status" => false,
            "message" => "Failed to register receiver"
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
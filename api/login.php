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

    $db = new Database();
    $conn = $db->connect();

    if (!$conn) {
        throw new Exception("Database connection failed");
    }

    $rawData = file_get_contents("php://input");

    $data = json_decode($rawData, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode([
            "status" => false,
            "message" => "Invalid JSON data"
        ]);
        exit;
    }

    $username = trim($data["username"] ?? "");
    $password = trim($data["password"] ?? "");
    $role = trim($data["role"] ?? "");

    if (
        empty($username) ||
        empty($password) ||
        empty($role)
    ) {
        echo json_encode([
            "status" => false,
            "message" => "All fields are required"
        ]);
        exit;
    }

    switch ($role) {

        case "hospital":
            $table = "hospitals";
            
            break;

        case "receiver":
            $table = "receivers";
            break;

        default:
            echo json_encode([
                "status" => false,
                "message" => "Invalid role selected"
            ]);
            exit;
    }

    $query = "SELECT * FROM {$table} WHERE email = ? LIMIT 1";

    $stmt = $conn->prepare($query);

    if (!$stmt) {
        throw new Exception($conn->error);
    }

    $stmt->bind_param("s", $username);

    if (!$stmt->execute()) {
        throw new Exception($stmt->error);
    }

    $result = $stmt->get_result();

    if ($result->num_rows === 0) {

        echo json_encode([
            "status" => false,
            "message" => "User not found"
        ]);
        exit;
    }

    $user = $result->fetch_assoc();

    if (!isset($user["password"])) {

        echo json_encode([
            "status" => false,
            "message" => "Password column not found"
        ]);
        exit;
    }

    if (!password_verify($password, $user["password"])) {

        echo json_encode([
            "status" => false,
            "message" => "Invalid password"
        ]);
        exit;
    }

    unset($user["password"]);

    echo json_encode([
        "status" => true,
        "message" => "Login successful",
        "user" => $user
    ]);

    $stmt->close();
    $conn->close();

} catch (Exception $e) {

    http_response_code(500);

    echo json_encode([
        "status" => false,
        "message" => $e->getMessage()
    ]);
}
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

if (!$data) {
    echo json_encode([
        "status" => false,
        "message" => "No data received"
    ]);
    exit;
}

$receiverId = (int)($data['receiverId'] ?? 0);
$receiverName = trim($data['receiverName'] ?? '');
$email = trim($data['email'] ?? '');
$contact = trim($data['contact'] ?? '');
$address = trim($data['address'] ?? '');
$receiverBloodGroup = trim($data['receiverBloodGroup'] ?? '');

$hospitalName = trim($data['hospitalName'] ?? '');
$requestedBloodGroup = trim($data['bloodGroup'] ?? '');

$quantity = (int)($data['quantity'] ?? 0);
$status = "Pending";

$userType = $data['userType'] ?? 'receiver';

if ($userType === "hospital") {
    echo json_encode([
        "status" => false,
        "message" => "Hospitals are not allowed to request blood."
    ]);
    exit;
}

if (
    $receiverId <= 0 ||
    empty($receiverName) ||
    empty($email) ||
    empty($contact) ||
    empty($address) ||
    empty($receiverBloodGroup) ||
    empty($hospitalName) ||
    empty($requestedBloodGroup) ||
    $quantity <= 0
) {
    echo json_encode([
        "status" => false,
        "message" => "All fields are required."
    ]);
    exit;
}

/*
|--------------------------------------------------------------------------
| Duplicate Request Check
|--------------------------------------------------------------------------
*/

$checkQuery = "
SELECT id
FROM blood_requests
WHERE receiver_id = ?
AND hospital_name = ?
AND status IN ('Pending','Approved')
";

$checkStmt = $conn->prepare($checkQuery);
$checkStmt->bind_param(
    "is",
    $receiverId,
    $hospitalName
);

$checkStmt->execute();
$result = $checkStmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode([
        "status" => false,
        "message" => "You have already requested blood from this hospital."
    ]);
    exit;
}

/*
|--------------------------------------------------------------------------
| Insert Request
|--------------------------------------------------------------------------
*/

$insertQuery = "
INSERT INTO blood_requests
(
    receiver_id,
    receiver_name,
    email,
    contact,
    address,
    receiver_blood_group,
    hospital_name,
    requested_blood_group,
    quantity,
    status
)
VALUES
(
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
)
";

$stmt = $conn->prepare($insertQuery);

$stmt->bind_param(
    "isssssssis",
    $receiverId,
    $receiverName,
    $email,
    $contact,
    $address,
    $receiverBloodGroup,
    $hospitalName,
    $requestedBloodGroup,
    $quantity,
    $status
);

if ($stmt->execute()) {
    echo json_encode([
        "status" => true,
        "message" => "Blood Request Submitted Successfully"
    ]);
} else {
    echo json_encode([
        "status" => false,
        "message" => "Failed to Submit Request",
        "error" => $stmt->error
    ]);
}
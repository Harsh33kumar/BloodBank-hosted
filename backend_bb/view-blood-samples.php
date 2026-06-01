<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "./config/database.php";

try {

    if (!isset($_GET['hospital_id'])) {
        echo json_encode([
            "status" => false,
            "message" => "Hospital ID is required"
        ]);
        exit;
    }

    $hospital_id = (int)$_GET['hospital_id'];

    $database = new Database();
    $conn = $database->connect();

    $query = "
        SELECT id, blood_group, quantity
        FROM blood_samples
        WHERE hospital_id = ?
        ORDER BY id DESC
    ";

    $stmt = mysqli_prepare($conn, $query);

    mysqli_stmt_bind_param($stmt, "i", $hospital_id);

    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);

    $bloodSamples = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $bloodSamples[] = $row;
    }

    echo json_encode([
        "status" => true,
        "data" => $bloodSamples
    ]);

} catch (Exception $e) {

    echo json_encode([
        "status" => false,
        "message" => $e->getMessage()
    ]);
}
<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "./config/database.php";

try {

    $database = new Database();
    $conn = $database->connect();

    $query = "
        SELECT
            id,
            hospital_name,
            blood_group,
            quantity
        FROM blood_samples
        ORDER BY id DESC
    ";

    $stmt = $conn->prepare($query);
    $stmt->execute();

    $result = $stmt->get_result();

    $bloodSamples = [];

    while ($row = $result->fetch_assoc()) {
        $bloodSamples[] = $row;
    }

    echo json_encode([
        "status" => true,
        "count" => count($bloodSamples),
        "data" => $bloodSamples
    ]);

} catch (Exception $e) {

    echo json_encode([
        "status" => false,
        "message" => $e->getMessage()
    ]);
}
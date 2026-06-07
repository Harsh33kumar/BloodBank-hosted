<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

require_once "./config/database.php";

try {

    $data = json_decode(file_get_contents("php://input"), true);

    if (
        !isset($data['id']) ||
        !isset($data['quantity'])
    ) {
        echo json_encode([
            "status" => false,
            "message" => "Sample ID and Quantity are required"
        ]);
        exit;
    }

    $sampleId = (int)$data['id'];
    $quantity = (int)$data['quantity'];

    if ($quantity < 0) {
        echo json_encode([
            "status" => false,
            "message" => "Quantity cannot be negative"
        ]);
        exit;
    }

    $database = new Database();
    $conn = $database->connect();

    $query = "
        UPDATE blood_samples
        SET quantity = ?
        WHERE id = ?
    ";

    $stmt = mysqli_prepare($conn, $query);

    if (!$stmt) {
        throw new Exception(mysqli_error($conn));
    }

    mysqli_stmt_bind_param(
        $stmt,
        "ii",
        $quantity,
        $sampleId
    );

    if (mysqli_stmt_execute($stmt)) {

        if (mysqli_stmt_affected_rows($stmt) > 0) {

            echo json_encode([
                "status" => true,
                "message" => "Blood sample updated successfully"
            ]);

        } else {

            echo json_encode([
                "status" => false,
                "message" => "No record found or quantity unchanged"
            ]);
        }

    } else {

        echo json_encode([
            "status" => false,
            "message" => mysqli_stmt_error($stmt)
        ]);
    }

} catch (Exception $e) {

    echo json_encode([
        "status" => false,
        "message" => $e->getMessage()
    ]);
}
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

    $data = json_decode(file_get_contents("php://input"), true);

    if (
        !isset($data['id']) ||
        !isset($data['hospital_id'])
    ) {
        echo json_encode([
            "status" => false,
            "message" => "Sample ID and Hospital ID are required"
        ]);
        exit;
    }

    $sampleId = (int)$data['id'];
    $hospitalId = (int)$data['hospital_id'];

    $database = new Database();
    $conn = $database->connect();

    $query = "
        DELETE FROM blood_samples
        WHERE id = ? AND hospital_id = ?
    ";

    $stmt = mysqli_prepare($conn, $query);

    if (!$stmt) {
        throw new Exception(mysqli_error($conn));
    }

    mysqli_stmt_bind_param(
        $stmt,
        "ii",
        $sampleId,
        $hospitalId
    );

    if (mysqli_stmt_execute($stmt)) {

        if (mysqli_stmt_affected_rows($stmt) > 0) {

            echo json_encode([
                "status" => true,
                "message" => "Blood sample deleted successfully"
            ]);

        } else {

            echo json_encode([
                "status" => false,
                "message" => "Blood sample not found or access denied"
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
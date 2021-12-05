<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

include("connection.php");

$pay_load = json_decode(file_get_contents("php://input"));

$response = [];
$response[] = $pay_load->category_name;


$deletQuery = "DELETE FROM clickedCategory";
$stmt1 = $connection->prepare($deletQuery);
$stmt1->execute();
$result = $stmt1->get_result();

$query = "INSERT INTO clickedCategory VALUES (?)";
$stmt = $connection->prepare($query);
$stmt->bind_param('s', $pay_load->category_name);
$stmt->execute();
$results = $stmt->get_result();


$result_json = json_encode($response);
echo $result_json;
?>
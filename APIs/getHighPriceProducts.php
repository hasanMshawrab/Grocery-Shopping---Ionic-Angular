<?php
header('Access-Control-Allow-Origin: *');

include("connection.php");

$category = $_GET["category"];

$query = "SELECT * FROM products WHERE category=? ORDER BY final_price DESC";
$stmt = $connection->prepare($query);
$stmt->bind_param('s', $category);
$stmt->execute();
$results = $stmt->get_result();

$temp_array = [];

while($row = $results->fetch_assoc()){
	$temp_array[] = $row;
}

$json = json_encode($temp_array);
print $json;
?>
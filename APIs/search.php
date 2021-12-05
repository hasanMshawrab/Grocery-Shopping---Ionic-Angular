<?php
header('Access-Control-Allow-Origin: *');

include("connection.php");

$category = $_GET["category"];
$word = $_GET["word"];
$str = "%$word%";

$query = "SELECT * FROM products WHERE product_name LIKE ? AND category=?";
$stmt = $connection->prepare($query);
$stmt->bind_param('ss', $str, $category);
$stmt->execute();
$results = $stmt->get_result();

$temp_array = [];

while($row = $results->fetch_assoc()){
	$temp_array[] = $row;
}

$json = json_encode($temp_array);
print $json;
?>
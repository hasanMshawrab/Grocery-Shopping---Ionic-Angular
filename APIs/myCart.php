<?php
header('Access-Control-Allow-Origin: *');

include("connection.php");

$user_name = $_GET["user_name"];

$query = "SELECT * FROM mycart WHERE user_name = ? AND quantity>0";
$stmt = $connection->prepare($query);
$stmt->bind_param('s', $user_name);
$stmt->execute();
$results = $stmt->get_result();

$temp_array = [];

while($row = $results->fetch_assoc()){
	$temp_array[] = $row;
}

$json = json_encode($temp_array);
print $json;
?>
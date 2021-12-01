<?php

include("connection.php");

$query = "SELECT user_name,  FROM users where ";
$stmt = $connection->prepare($query);
$stmt->execute();
$results = $stmt->get_result();

$temp_array = [];

while($row = $results->fetch_assoc()){
	$temp_array[] = $row;
}

$json = json_encode($temp_array);
print $json;

?>
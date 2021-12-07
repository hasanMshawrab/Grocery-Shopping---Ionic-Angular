<?php
header('Access-Control-Allow-Origin: *');

include("connection.php");

$user_name = $_GET["user_name"];

$query = "DELETE FROM mycart WHERE user_name=?";
$stmt = $connection->prepare($query);
$stmt->bind_param('s', $user_name);
$stmt->execute();

$temp_array = [];

$json = json_encode($temp_array);
print $json;
?>
<?php

include("connection.php");

$user_name = $_GET["username"];

$query = "SELECT * FROM users WHERE user_name = ?";
$stmt = $connection->prepare($query);
$stmt->bind_param('s', $user_name);
$stmt->execute();
$results = $stmt->get_result();
$user = $results->fetch_assoc();

$json = json_encode($user);
print $json;

?>
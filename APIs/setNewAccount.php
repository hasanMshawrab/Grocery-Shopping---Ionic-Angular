<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

include("connection.php");

$pay_load = json_decode(file_get_contents("php://input"));

$response = [];

$first_name = $pay_load->first_name;
$last_name = $pay_load->last_name;
$email = $pay_load->email;
$user_name = $pay_load->user_name;
$password = $pay_load->password;


$checkUsernameQuery = "SELECT * FROM users WHERE user_name= ?";
$stmt1 = $connection->prepare($checkUsernameQuery);
$stmt1->bind_param('s', $user_name);
$stmt1->execute();
$result = $stmt1->get_result();

if ($result->num_rows > 0) {
    $response[] = false;
}else{
    $query = "INSERT INTO users VALUES (?,?,?,?,?)";
    $stmt = $connection->prepare($query);
    $stmt->bind_param('sssss', $user_name, $first_name, $last_name, $email, $password);
    $stmt->execute();
    $results = $stmt->get_result();

    $response[] = true;
}

$result_json = json_encode($response);
echo $result_json;
?>
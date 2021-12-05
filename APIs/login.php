<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

include("connection.php");

$pay_load = json_decode(file_get_contents("php://input"));

$response = [];

$user_name = $pay_load->user_name;
$password = $pay_load->password;


$checkUsernameQuery = "SELECT user_name, password FROM users WHERE user_name= ?";
$stmt1 = $connection->prepare($checkUsernameQuery);
$stmt1->bind_param('s', $user_name);
$stmt1->execute();
$results = $stmt1->get_result();

if ($results->num_rows == 0) {
    $response[] = false;
}else{
    $temp_array = [];
    while($row = $results->fetch_assoc()){
	    $temp_array[] = $row;
    }

    if($temp_array[0]["password"] == $password){
        $response[] = true;
    }else{
        $response[] = false;
    }

}

$result_json = json_encode($response);
echo $result_json;
?>
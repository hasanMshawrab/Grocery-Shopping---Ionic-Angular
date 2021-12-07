<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

include("connection.php");

$pay_load = json_decode(file_get_contents("php://input"));

$response = [];

$user_name = $pay_load->user_name;
$product_id = $pay_load->product_id;
$final_price = $pay_load->final_price;
$quantity = $pay_load->quantity;


$checkIfPurchased = "SELECT * FROM mycart WHERE user_name= ? AND product_id = ?";
$stmt1 = $connection->prepare($checkIfPurchased);
$stmt1->bind_param('ss', $user_name, $product_id);
$stmt1->execute();
$result = $stmt1->get_result();
$temp_array = [];    
while($row = $result->fetch_assoc()){
	$temp_array[] = $row;
}

if ($result->num_rows > 0) {
    $query = "UPDATE mycart SET quantity = ? WHERE user_name = ? AND product_id = ?";
    $stmt = $connection->prepare($query);
    $stmt->bind_param('sss', $quantity, $user_name, $product_id);
    $stmt->execute();
    $results = $stmt->get_result();

    $response[] = true;
}else{
    $query = "SELECT * FROM products WHERE product_id = ?";
    $stmt1 = $connection->prepare($query);
    $stmt1->bind_param('s', $product_id);
    $stmt1->execute();
    $result = $stmt1->get_result();
    $temp_array = [];    
    while($row = $result->fetch_assoc()){
        $temp_array[] = $row;
    }
    $product_name = $temp_array[0]['product_name'];
    $image = $temp_array[0]['image'];

    $query = "INSERT INTO myCart VALUES (?,?,?,?,?,?)";
    $stmt = $connection->prepare($query);
    $stmt->bind_param('ssssss', $user_name, $product_id, $product_name ,$final_price,$quantity, $image);
    $stmt->execute();
    $results = $stmt->get_result();

    $response[] = true;
}

$result_json = json_encode($response);
echo $result_json;
?>
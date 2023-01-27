<?php

/***********************************************************************************
/*             GETTING THE DEFAULT POST SHARING AND EDITING SETTINGS               */
/*          This page receives XHR from: "../scriptS/create_recipe.js              */
/***********************************************************************************/

//Start session
session_start();

//Connect database
include "../incudes/db_conn.php"; 
$pdo = connectDB();

//Headers
header('Access-Control-Allow-Origin: *');
header("Content-Type:application/json");

//Get session variable username if set
if (!isset($_SESSION['username'])) {
    $username = $_SESSION['username']; 
}
//If unset, return error
else{
    echo "error"; 
}

//Query the default post sharing and editing settings from users database table using the username
$statement = $pdo->prepare("SELECT `can share posts`, `can edit posts` FROM `cois3420_cravings_users` WHERE username = ?");
$statement->execute([$username]);

//Enter query results into array
$getSetting = array(); 
foreach($stmt as $row){
    $getSetting['share'] = $row['can share posts']; 
    $getSetting['edit'] = $row['can edit posts']; 
}

//ENCODE ARRAY TO JSON
echo json_encode($getSetting, JSON_PRETTY_PRINT);

?>

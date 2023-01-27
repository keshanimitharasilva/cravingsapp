<?php

/***********************************************************************************
/*                       SAVING A POST FROM THE HOMEPAGE                           */
/*          This page receives XHR from: "../scripts/homepage.js"             */
/***********************************************************************************/

//Start session
session_start();

//Connect database
include "../incudes/db_conn.php"; 
$pdo = connectDB();

//Headers
header('Access-Control-Allow-Origin: *');

//Get session variable username if set
if (!isset($_SESSION['username'])) {
    $username = $_SESSION['username']; 
}
//If unset, return error
else{
    echo "error"; 
}

//Get variables from post array
$postId = $_POST['postId'] ?? NULL;

var_dump($_POST); 

//Query database using username and insert value
$query = "INSERT INTO `cois3420_cravings_saved` VALUES(?) WHERE `username`=?"; 
$stmt=$pdo->prepare($query) ->execute([$postID, $username]);

?>

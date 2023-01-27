<?php

/***********************************************************************************
/*         POST REGISTRATION FORM DATA TO COIS_CRAVINGS_USERS DATABASE TABLE       */
/*              This page receives XHR from: "../scripts/register.js"              */
/***********************************************************************************/

//SET UP DATABASE CONNECTION
include "../incudes/db_conn.php"; 
$pdo = connectDB();

//HEADERS
header('Access-Control-Allow-Origin: *');
header("Content-Type:application/json");

//GET VALUES FROM POST ARRAY
$name = trim($_POST['name']) ?? NULL;
$email = trim($_POST['email']) ?? NULL;
$username =trim($_POST['username']) ?? NULL;
$password = trim($_POST['password']) ?? NULL;

//HASH PASSWORD
$hashedPass = password_hash($password, PASSWORD_DEFAULT);
//Use PD    hO query to insert into database tables
$query = "INSERT INTO `cois3420_cravings_users`(`name`, `email`, `username`, `password`) VALUES(?,?,?,?)";
$stmt=$pdo->prepare($query) ->execute([$name, $email, $username, $hashedPass]);

$query = "INSERT INTO `cois3420_cravings_saved`(`username`, `name`) VALUES(?, ?)"; 
$stmt=$pdo->prepare($query) ->execute([$username, $name]);

?>

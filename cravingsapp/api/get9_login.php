<?php

/***********************************************************************************
/*                            VALIDATING LOGIN DETAILS                             */
/*          This page receives XHR from: "../scripts/login.js"                     */
/***********************************************************************************/

//Connect database
include "../incudes/db_conn.php"; 
$pdo = connectDB();

//Get values from get array
$username = $_GET['username'] ?? ""; 
$password = $_GET['password'] ?? ""; 

//Query database using username
$query="SELECT * FROM `cois3420_cravings_users` WHERE `username`=?";
$statement = $pdo->prepare($query);
$statement->execute([trim($username)]);
//echo $query.$username;

//If username exists
if ($row = $statement->fetch()) {
    //var_dump($row);
        if (password_verify($password, $row['password'])){
            echo "password valid"; 
            //Start session
            session_start();
            //Set session variable
            $_SESSION['username'] = $username; 
            $_SESSION['name'] =  $row['name']; 
            $_SESSION['email'] = $row['email']; 
            $_SESSION['share'] = $row['can share posts']; 
            $_SESSION['edit'] = $row['can edit posts']; 

        }
        else{
            echo "password invalid"; 
        }
} 
//If username does not exist
else {
    echo "user does not exist"; 
}

exit(); 

?>

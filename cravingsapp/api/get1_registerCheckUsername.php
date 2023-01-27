<?php

/***********************************************************************************/
/*         CHECK IF USERNAME ALREADY EXISTS ON REGISTRATION AND UPDATING USERNAME  */
/*                            This page receives XHR from:                         */                  
/*                                "../scripts/register.js"                         */
/*                             "../scripts/account_settings.js"                    */
/***********************************************************************************/
//Start session
session_start(); 

//HEADERS
header('Access-Control-Allow-Origin: *');
header("Content-Type:application/json");

//SET UP DATABASE CONNECTION
include "../incudes/db_conn.php"; 
$pdo = connectDB();

//GET USERNAME FROM GET ARRAY
$username = $_GET['username'] ?? "";

//QUERY FOR A RECORD THAT MATCHES THE GIVEN USERNAME
$statement = $pdo->prepare("SELECT * FROM `cois3420_cravings_users` WHERE username = ?");
$statement->execute([$username]);

//IF THERE ARE RECORDS: RETURN TRUE
if ($statement->fetch()) {
    echo 'true'; 
//IF THERE ARE NO RECORDS: RETURN FALSE
} else {
    echo 'false'; 
}

exit();

?>

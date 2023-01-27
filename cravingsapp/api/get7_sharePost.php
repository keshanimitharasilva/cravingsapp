<?php

/***********************************************************************************
/*                            SHARING A POST ON HOMEPAGE                           */
/*          This page receives XHR from: "../scripts/homepage.js                   */
/***********************************************************************************/

//Start session
session_start();

//Connect database
include "../incudes/db_conn.php"; 
$pdo = connectDB();

//Headers
header('Access-Control-Allow-Origin: *');
header("Content-Type:application/json");


//If session variable username is set, get it. Else, return an error. 
if (!isset($_SESSION['username'])) {
    $sharedByUsername = $_SESSION['username']; 
}
else{
    echo "error"; 
}

//Get variables from get array
$postId = $_GET['id'] ?? NULL;


//Query the database for the recipe
$statement = $pdo->prepare("SELECT * FROM `cois3420_cravings_recipes` WHERE `recipe ID` = ?");
$statement->execute([$postID]);

//Insert query results into array 
$getRecipe = array();
foreach($stmt as $row){
    $getRecipe['recipeId'] = $row['recipe ID'];
    $getRecipe['username'] = $row['username']; 
    $getRecipe['recipeName'] = $row['recipe name'];
    $getRecipe['prepTime'] = $row['prep time']; 
    $getRecipe['ingredients'] = $row['ingredients'];
    //for the homepage, we only get a snippet of the description
    $getRecipe['directions'] = substr($row['directions'], 60);
    $getRecipe['canShare'] = $row['can share']; 
    $getRecipe['canEdit'] = $row['canEdit']; 
    $getRecipe['timeCreated'] = $row['time created']; 
}

//Add the username of the person who shared the post, into the array
$getRecipe['sharedBy'] = $sharedByUsername; 

//ENCODE ARRAY TO JSON
echo json_encode($getRecipe, JSON_PRETTY_PRINT);

var_dump($getRecipe); 

?>

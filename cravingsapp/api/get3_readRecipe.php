<?php
/********************************************************************************************/
/*                           GET SPECIFIC RECIPE TO BE DISPLAYED                    
/*         This page receives XHR from: "../scripts/read_recipe.js"                         */
/*                                      "../scripts/edit_recipe.js"                        */
/******************************************************************************************/

//Start session
session_start(); 

//Connect database
include "../incudes/db_conn.php"; 
$pdo = connectDB();

//Headers
header('Access-Control-Allow-Origin: *');
header("Content-Type:application/json");

//Get recipe ID from GET array
$recipeId = $_GET['recipeId'] ?? null;

//Query recipe database for recipe using recipe ID
$statement = $pdo->prepare("SELECT * FROM `cois3420_cravings_recipes` WHERE `recipe ID` = ?");
$statement->execute([$recipeID]);

//Insert query results into array
$getRecipe = array(); 
foreach($statement as $row){
    $getRecipe['recipeId'] = $row['recipe ID'];
    $getRecipe['username'] = $row['username']; 
    $getRecipe['recipeName'] = $row['recipe name'];
    $getRecipe['prepTime'] = $row['prep time']; 
    $ingID =  $row['ingredients']; 
    $getRecipe['directions'] = $row['directions']; 
    $getRecipe['canShare'] = $row['can share']; 
    $getRecipe['canEdit'] = $row['canEdit']; 
    $getRecipe['timeCreated'] = $row['time created'];
}

//Query ingredients database table for ingredients using the ID for ingredients 
$stmt = $pdo->prepare("SELECT * FROM `cois3420_cravings_ingredients` WHERE `ing ID` = ?");
$stmt->execute([$ingID]);

//Insert all ingredients into an array
$getIng = array(); 
$i = 0; 
foreach($stmt as $row){
    $i = $i + 1; 
    $getIng[] = $row[$i]; 
}

$getRecipe[] = $getIng; 

//Encode array to JSON
echo json_encode($getRecipe, JSON_PRETTY_PRINT);
?>

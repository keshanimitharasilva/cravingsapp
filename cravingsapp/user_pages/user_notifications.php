<?php

//Session code reference: https://www.geeksforgeeks.org/how-to-display-logged-in-user-information-in-php/

//Start session
session_start();
//If username is not set, head to login page
if (!isset($_SESSION['username'])) {
    header('location: ../cravings_pages/login.php');
}
//If logout button is pressed, destroy session, delete session variables, and head to login page. 
if (isset($_GET['logout'])) {
    session_destroy();
    unset($_SESSION['username']);
    header('location: ../cravings_pages/login.php');
}


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Cravings - Notifications</title>
    <link rel="stylesheet" href= "../styles/user_account.css" />
    <script src="https://kit.fontawesome.com/3cc4c2d931.js" crossorigin="anonymous"></script>
</head>
<body class="homePage">
    <header>
        <div class="cravingsLogo"> 
           <a href="user_homepage.php"><img src="../img/logos/cravings1.png" alt="Cravings Logo"/></a>
        </div>
      <div class = "input-group">
            <div class="search">
                <span class = "input-group-text"></span>
                <i class="fas fa-search"></i>
                <input type="text" name="searchBar" id="searchBar" placeholder="Find your favourite tastes">
            </div>
            <ul class = "list-group" id= "list"></ul>
        </div>
        <div class="savedRecipesLinkHome">
            <a href=""><i class="fas fa-bookmark"></i> Saved Recipe's</a>
        </div>
        <div class="notificationsLinkHome">
            <a href=""><i class="fas fa-bell"></i> Notifications</a>
        </div>
        <div class="profileLinkHome">
            <a href=""><p>Your Name </p><img src="../img/vector/default_propic.png" alt="Profile picture" id="homeProfilePic"/></a>
        </div>
    </header>
    <div class="homePageContainer"> 
        <div class="navContainer1">
            <nav id="nav1">
                <a href="user_account_settings.php"><i class="fas fa-cog"></i> Account Settings</a>
                <a href="../cravings_pages/help_and_support.php"><i class="fas fa-question"></i> Help and Support</a>
                <a href="user_notifications.php?logout='1'"><i class="fas fa-sign-out-alt"></i> Log Out</a>
            </nav>
        </div>

        <main>
            <!--PUT ALL CODE HERE-->
        </main>

        <div class="navContainer2">
            <nav id="nav1">
            <a href="user_create_recipe.php" class="bold create"><i class="fas fa-pen"></i> CREATE A RECIPE</a>
            </nav>
        </div>
    </div>
</body>
</html>
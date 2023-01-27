
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
    <title>Cravings - Save and Post Recipe</title>
    <link rel="stylesheet" href= "../styles/user_account.css" />
    <script src="https://kit.fontawesome.com/3cc4c2d931.js" crossorigin="anonymous"></script>
    <script defer src="../scripts/create_recipe.js"></script>
</head>
<body class="homePage">
    <header>
        <div class="cravingsLogo"> 
          <a href="user_homepage.php"><img src="../img/logos/cravings1.png" alt="Cravings Logo" class="crvLogo"/></a>
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
            <a href="user_saved_recipe_list.php"><i class="fas fa-bookmark"></i> Saved Recipe's</a>
        </div>
        <div class="notificationsLinkHome">
            <div class="icon" onclick="toggleNotifi()">
			 <h4><i class="fas fa-bell"></i> Notifications</h4>
            </div>     
            <div class="notifi-box" id="box" style="height: 850px; width: 350px; opacity: 1;">		
                    <div class="notifi-item">
                        <a href="user_notifications.php">
                        <img src="../img/profile/avatar1.png" alt="img">
                        <div class="text">
                        <h4>Ayaan</h4>
                        <p>@lorem ipsum dolor sit amet</p></a>
                        </div> 
                    </div>

                    <div class="notifi-item">
                        <a href="user_notifications.php">
                        <img src="../img/profile/avatar2.png" alt="img">
                        <div class="text">
                        <h4>Khaled</h4>
                        <p>@lorem ipsum dolor sit amet</p></a>
                        </div> 
                    </div>

                    <div class="notifi-item">
                        <a href="user_notifications.php">
                        <img src="../img/profile/avatar1.png" alt="img">
                        <div class="text">
                        <h4>Om</h4>
                        <p>@lorem ipsum dolor sit amet</p></a>
                        </div> 
                    </div>

                    <div class="notifi-item">
                        <a href="user_notifications.php">
                        <img src="../img/profile/avatar4.png" alt="img">
                        <div class="text">
                        <h4>Mithara</h4>
                        <p>@lorem ipsum dolor sit amet</p></a>
                        </div> 
                    </div>
            </div>
        </div>
        <div class="profileLinkHome">
            <a href="user_profile.php"><p><?php echo $_SESSION['username'] ?></p><img src="../img/vector/default_propic.png" alt="Profile picture" id="homeProfilePic"/></a>
        </div>
    </header>
    <div class="homePageContainer"> 
        <div class="navContainer1">
            <nav id="nav1">
                <a href="user_account_settings.php"><i class="fas fa-cog"></i> Account Settings</a>
                <a href="../cravings_pages/help_and_support.php"><i class="fas fa-question"></i> Help and Support</a>
                <a href="user_saveandpost_recipe.php?logout='1'"><i class="fas fa-sign-out-alt"></i> Log Out</a>
            </nav>
        </div>

        <main>
            <div class="readRecipe">
                <h2 id="readRecipeName"> Recipe Name </h2>
                <p id="readRecipePrepTime"><i class="far fa-clock"></i>x minutes</p>
                <ul id="readIngList">
                    <li></li>
                    <li></li>
                </ul>
                <p class="readRecipeInstructions">Recipe Instructions </p>
                <p>Post is visible to: </p>
                <p>Post can be shared and saved by others: </p>
                <p>Post can be edited by others: </p>
                <button id="postRecipe">Post recipe</button>
            </div>
        </main>

        <div class="navContainer2">
            <nav id="nav1">
            <a href="user_create_recipe.php" class="bold create"><i class="fas fa-pen"></i> CREATE A RECIPE</a>
            </nav>
        </div>
    </div>
</body>
</html>
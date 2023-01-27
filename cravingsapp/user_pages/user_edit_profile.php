<?php

//Connect database
include "../incudes/db_conn.php"; 
$pdo = connectDB();

//Session code reference: https://www.geeksforgeeks.org/how-to-display-logged-in-user-information-in-php/
//Start session
session_start();

$username = ""; 

//If username is not set, head to login page
if (!isset($_SESSION['username'])) {
    header('location: ../cravings_pages/login.php');
}
else{
    //Get session variable username
    $username = $_SESSION['username']; 
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
    <title>Cravings - Edit Profile</title>
    <link rel="stylesheet" href= "../styles/user_account.css" />
    <script src="https://kit.fontawesome.com/3cc4c2d931.js" crossorigin="anonymous"></script>
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
            <a href=""><i class="fas fa-bell"></i> Notifications</a>
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
                <a href="user_edit_profile.php?logout='1'"><i class="fas fa-sign-out-alt"></i> Log Out</a>
            </nav>
        </div>

        <main>
        <div class="settingsDiv">
                <h2 class="greenHeading">Select Your Preferences</h2>
                <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">
                    <fieldset>
                        <div class="error" id="shareError"></div>
                        <legend>Do you want your posts to be share-able?</legend>

                        <div>
                            <input type="radio" name="share" id="shareRadio">
                            <label for="share">Yes</label>
                        </div>
                        <div>
                            <input type="radio" name="share" id="noShareRadio">
                            <label for="share">No</label>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="error" id="editError"></div>
                        <legend>Do you want others to be able to edit your posts?</legend>
                        <div>
                            <input type="radio" name="edit" id="editRadio">
                            <label for="edit">Yes</label>
                        </div>
                        <div>
                            <input type="radio" name="edit" id="noEditRadio">
                            <label for="edit">No</label>
                        </div>
                    </fieldset>
                    <input type="submit" name="submit" value="Save" class="settingsSubmit"/>
                </form>
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


<?php

if (isset($_POST['submit'])) {

    $share = $_POST['share'] ?? ""; 
    $edit = $_POST['edit'] ?? ""; 


    $query = "INSERT INTO 'cois3420_cravings_users' ('can share posts', 'can edit posts') VALUES(?,?) WHERE 'username' = ?"; 
    $stmt=$pdo->prepare($query) ->execute([$share, $edit, $username]); 
}

?>
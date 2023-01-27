<?php
//Session code reference: https://www.geeksforgeeks.org/how-to-display-logged-in-user-information-in-php/

//Start session
session_start();
//If username is not set, head to login page
if (!isset($_SESSION['username'])) {
    header('location: ../cravings_pages/login.php');
}
else{
    //Get session variables
    $username = $_SESSION['username'];


    //Connect database
    include "../incudes/db_conn.php"; 
    $pdo = connectDB();

    //Query database for account details
    $statement = $pdo->prepare("SELECT * FROM `cois3420_cravings_users` WHERE `username` = ?");
    $statement->execute([$username]);

    //Enter query results into variables
    foreach($statement as $row){
        $name = $row['name'] ?? ""; 
        $email = $row['email'] ?? ""; 
        $canShare = $row['can share posts'] ?? "";  
        $canEdit = $row['can edit posts'] ?? ""; 
    }
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
    <title>Cravings - Account Settings</title>
    <link rel="stylesheet" href= "../styles/user_account.css" />
    <script src="https://kit.fontawesome.com/3cc4c2d931.js" crossorigin="anonymous"></script>
    <script defer src="../scripts/account_settings.js"></script>
</head>
<body class="homePage">
    <header>
        <div class="cravingsLogo"> 
         <a href="user_homepage.php"><img src="../img/logos/cravings1.png" alt="Cravings Logo" class="crvLogo"/></a>
        </div>
        <div id = "searchUsers" class="instant-search">
            <div class="search">
                <i class="fas fa-search"></i>
                <input type="text" name="searchBar" id="searchBar" class="instant-search__input" placeholder="Find your favourite tastes">
            </div>
        </div>
        <div class="savedRecipesLinkHome">
            <a href="user_saved_recipe_list.php"><i class="fas fa-bookmark"></i> Saved Recipe's</a>
        </div>
        <div class="notificationsLinkHome">
            <a href="user_notifications.php"><i class="fas fa-bell"></i> Notifications</a>
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
                <a href="user_account_settings.php?logout='1'"><i class="fas fa-sign-out-alt"></i> Log Out</a>
            </nav>
        </div>

        <main>
            <div class = "settingsDiv settingsTableDiv">
                <h2 class="greenHeading">Account Settings</h2>
                <table id="settingsTable">
                    <tbody>
                        <tr>
                            <td class="settd1">Name</td>
                            <td><?php echo $name ?></td>
                            <td class="settd2"><button id="editName" class="edit">Edit</button></td>
                        </tr>
                        <tr>
                            <td class="settd1">Username</td>
                            <td><?php echo $_SESSION['username']; ?></td>
                            <td class="settd2"><button id="editUsername" class="edit">Edit</button></td>
                        </tr>
                        <tr>
                            <td class="settd1">Email</td>
                            <td><?php echo $email ?></td>
                            <td class="settd2"><button id="editEmail" class="edit">Edit</button></td>
                        </tr>
                        <tr>
                            <td class="settd1">Password</td>
                            <td>-----</td>
                            <td class="settd2"><button id="editPassword" class="edit">Edit</button></td>
                        </tr>
                        <tr>
                            <td class="settd1">Allow others to share your posts</td>
                            <td><?php echo $canShare ?></td>
                            <td class="settd2"><button id="editShare" class="edit">Edit</button></td>
                        </tr>
                        <tr>
                            <td class="settd1">Allow others to edit your posts</td>
                            <td><?php echo $canEdit ?></td>
                            <td class="settd2"><button id="editEdit" class="edit">Edit</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div id="editNameDiv" class = "settingsDiv hidden">
                <h2 class="greenHeading">Edit Name</h2>
                <form action="" method="post" id="editNameForm">
                    <div class="error" id="newNameError"></div>
                    <label for="name">Enter A New Username</label>
                    <input id="newName" name="name" type="text"/>
                    <input type="submit" name="submit1" id="submitNewName" value="Save" class="settingsSubmit"/>
                    <button type="reset" class="cancelBtn" id="cancelEditName">Cancel</button>
                </form>
            </div>

            <div id="editUsernameDiv" class = "settingsDiv hidden">
                <h2 class="greenHeading">Edit Username</h2>
                <form action="" method="post" id="editUsernameForm">
                    <div class="error" id="newUsernameError"></div>
                    <label for="username">Enter A New Username</label>
                    <input id="newUsername" name="username" type="text" placeholder="JohnS24"/>
                    <input type="submit" name="submit2" id="submitNewUsername" value="Save" class="settingsSubmit"/>
                    <button type="reset" class="cancelBtn" id="cancelEditUsername">Cancel</button>
                </form>
            </div>

            <div id="editEmailDiv" class = "settingsDiv hidden">
                <h2 class="greenHeading">Edit Email</h2>
                <form action="" method="post" id="editEmailForm">
                    <div class="error" id="newEmailError"></div>
                    <label for="password">Please re-enter Password</label>
                    <input type="password" name="password" id="reEnterPass1"></input>
                    <label for="email">Enter A New Email</label>
                    <input type="text" name="email" id="newEmail"></input>
                    <input type="submit" name="submit3" id="submitNewEmail" value="Save" class="settingsSubmit"/>
                    <button type="reset" class="cancelBtn" id="cancelEditEmail">Cancel</button>
                </form>
            </div>

            <div id="editPasswordDiv" class = "settingsDiv hidden">
                <h2 class="greenHeading">Edit Password</h2>
                <form action="" method="post" id="editPasswordForm">
                    <div class="error" id="newPassError"></div>
                    <label for="password1">Please re-enter your current Password</label>
                    <input type="password" name="password1" id="reEnterPass2"></input>
                    <label for="password2">Please enter your new Password</label>
                    <input type="password" name="password2" id="newPass"></input>
                    <label for="password3">Please confirm your new Password</label>
                    <input type="password" name="password3" id="confirmNewPass"></input>
                    <input type="submit" name="submit4" id="submitNewPass" value="Save" class="settingsSubmit"/>
                    <button type="reset" class="cancelBtn" id="cancelEditPass">Cancel</button>
                </form>
            </div>

            <div class="settingsDiv hidden" id="editShareDiv">
                <h2 class="greenHeading">Set Post Sharing Settings</h2>
                <form action="" method="post" id="editShareForm">
                    <fieldset>
                        <div class="error" id="shareError"></div>
                        <legend>Do you want your posts to be share-able?</legend>

                        <div>
                            <input type="radio" name="share" id="shareRadio" value="Yes">
                            <label for="share">Yes</label>
                        </div>
                        <div>
                            <input type="radio" name="share" id="noShareRadio" value="No">
                            <label for="share">No</label>
                        </div>
                        <input type="submit" name="submit5" id="submitVis" value="Save" class="settingsSubmit"/>
                        <button type="reset" class="cancelBtn" id="cancelEditShare">Cancel</button>
                    </fieldset>
                </form>
            </div>

            <div class="settingsDiv hidden" id="editEditDiv">
                <h2 class="greenHeading">Set Post Edit Settings</h2>
                <form action="" method="post" id="editEditForm">
                    <fieldset>
                        <div class="error" id="editError"></div>
                        <legend>Do you want others to be able to edit your posts?</legend>
                        <div>
                            <input type="radio" name="edit" id="editRadio" value="Yes">
                            <label for="edit">Yes</label>
                        </div>
                        <div>
                            <input type="radio" name="edit" id="noEditRadio" value="No">
                            <label for="edit">No</label>
                        </div>
                        <input type="submit" name="submit6" id="submitVis" value="Save" class="settingsSubmit"/>
                        <button type="reset" class="cancelBtn" id="cancelEditEdit">Cancel</button>
                    </fieldset>
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

if (isset($_POST['submit1'])) {

    $name = $_POST['name'] ?? ""; 

    $query = "UPDATE `cois3420_cravings_users` SET `name`=? WHERE `username`=?"; 
    $stmt=$pdo->prepare($query) ->execute([$name, $username]);

    $_SESSION['name'] = $name; 
}

if (isset($_POST['submit2'])) {

    $newUsername = $_POST['username'] ?? ""; 

    $query = "UPDATE `cois3420_cravings_users` SET `username`=? WHERE `username`=?"; 
    $stmt=$pdo->prepare($query) ->execute([$newUsername, $username]);

    $query = "UPDATE `cois3420_cravings_saved` SET `username`=? WHERE `name`=?"; 
    $stmt=$pdo->prepare($query) ->execute([$newUsername, $_SESSION['name']]);

    $_SESSION['username'] = $newUsername; 

}

if (isset($_POST['submit3'])) {

    $email = $_POST['email'] ?? ""; 

    $query = "UPDATE `cois3420_cravings_users` SET `email`=? WHERE `username`=?"; 
    $stmt=$pdo->prepare($query) ->execute([$email, $username]);

    $_SESSION['email'] = $email; 
}

if (isset($_POST['submit4'])) {

    $pass = $_POST['password2'] ?? "";
    
    $password = password_hash($pass, PASSWORD_DEFAULT);

    $query = "UPDATE `cois3420_cravings_users` SET `password`=? WHERE `username`=?"; 
    $stmt=$pdo->prepare($query) ->execute([$password, $username]);

}

if (isset($_POST['submit5'])) {

    $share = $_POST['share'] ?? ""; 

    $query = "UPDATE `cois3420_cravings_users` SET `can share posts`=? WHERE `username`=?"; 
    $stmt=$pdo->prepare($query) ->execute([$share, $username]);

    $_SESSION['share'] = $share; 
}

if (isset($_POST['submit6'])) {

    $edit = $_POST['edit'] ?? ""; 

    $query = "UPDATE `cois3420_cravings_users` SET `can edit posts`=? WHERE `username`=?"; 
    $stmt=$pdo->prepare($query) ->execute([$edit, $username]);

    $_SESSION['edit'] = $edit; 
}


?>
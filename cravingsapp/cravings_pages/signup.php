<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title> Join The Community </title>
    <link rel="stylesheet" href="../styles/getting_started.css" />
    <script defer src="../scripts/register.js"></script>
</head>

<body class="registrationPage">

        <div class="regCon1">
        <img src="../img/logos/cravings2.png" alt="logo" id="regPageLogo"/>
        <h1 id="registrationH1">Join our <span class="green">vibrant</span> community.</h1>
        <div class="passReqList">
        <p>*Password guidelines: Your password should</p>
        <ul>
            <li>Be between 8 and 15 characters in length</li>
            <li>Contain at least one (1) character from each of the following categories:
                <ul>
                <li>Uppercase letter (A-Z)</li>
                <li>Lowercase letter (a-z)</li>
                <li>Digit (0-9)</li>
                <li>Special character (~`!@#$%^&*()+=_-{}[]\|:;”’?/<>,.)</li>
            </ul>
            </li>
        </ul>
       </div>
        </div>
        <div class="regCon2">

        <form action="" method="post" id="registrationForm" enctype="multipart/form-data">
            
            <div>
                <label for="name">Name:</label>
                <input id="name" type="text" name="name" placeholder="Name">
                <div id="nameError" class="error"></div>
            </div>


            <div>
                <label for="email">Email:</label>
                <input id="email" name="email" type="email" placeholder="john@email.com"required />
                <div id="emailError" class="error"></div>
            </div>


            <div>
                <label for="username">Choose a username:</label>
                <input id="username" type="text" name="uname" placeholder="User Name">
                <div id="usernameError" class="error"></div>
            </div>

            <div>
                <div id="passError" class="error"></div>
                <label for="password">Create a password:</label>
                <input id = "pass1" class="password" name="password" type="password"/>
            </div>
            <div>
                <label for="password">Re-enter password:</label>
                <input id = "pass2" class="password" name="re_password" type="password"/>
            </div>
            <div>
                <input type="submit" name="submit" id="submitReg" value="Submit"/>
            </div>
            <div>
            <a href="login.php" class="ca">Already have an account?</a>
            </div>
        </form>

        </div>
        <div class="regCon3">
            <img src="../img/promo/grandma.jpg" alt="woman cooking chicken" id="grandma"/>
        </div>


</body>
</html>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Login - Cravings.com</title>
    <link rel="stylesheet" href="../styles/getting_started.css" />
    <script src="https://kit.fontawesome.com/3cc4c2d931.js" crossorigin="anonymous"></script>
    <script defer src="../scripts/login.js"></script>
</head>

<body class="loginPage">

    <div class="loginCon1">
        <img src="../img/logos/cravings2.png" alt="logo" id="loginPageLogo"/>
    </div>

    <div class="loginCon2">
        <h2 id="loginH2">Login</h2>

        <form action=" " method="post" id="loginForm" enctype="multipart/form-data">
            <div>
                <div class="error" id="usernameError"></div>
                <label for="username">username:</label>
                <input id="username" name="username" type="text" placeholder="John Smith"/>
            </div>

            <div>
                <div class="error" id="passwordError"></div>
                <label for="password">password:</label>
                <input class="password" name="password" type="password" placeholder="password" id="password"/>
            </div>

            <div>
                <input type="submit" name="submit" id="submitLog" value="Submit"/>
            </div>

            <a href="signup.php"> Create an account</a>

        </form>


    </div>
    <div class="loginCon3">
    <div>
        <i class="fas fa-quote-left"></i>
        <h1 id="loginH1">The next best thing to eating food, is talking about it.</h1>
        </div>
    </div>
</body>
</html>


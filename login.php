<?php

session_start();

$errorMsg = "";

if ( isset($_SESSION["user"]) ) {
    header("location: chat.php");
}

if ( (isset($_GET["action"])) && ($_GET["action"]=="signout") ) {
    if (isset($_COOKIE[session_name()])) {
        setcookie(session_name(),'',time()-3600,'/');
    }
    session_unset();
    session_destroy();
    header("location: login.php");
}

if ( isset($_POST["type"]) ) {
    $db_conn = mysqli_connect("mydb", "dummy", "YOUR_PASSWORD_HERE", "db3322")
        or die("Connection Error!".mysqli_connect_error());
    
    if ( $_POST["type"] == "login" ) {
        $userPHP = $_POST["user"];
        $query = "SELECT * FROM account WHERE useremail = '$userPHP'";
        $result = mysqli_query($db_conn, $query)
            or die("Query Error!".mysqli_error($db_conn));
        $row = mysqli_fetch_array($result);
        if ( mysqli_num_rows($result) == 0 ) {
            $errorMsg = "Failed to login. Unknown User!!";
        } elseif ( $row["password"] != $_POST["password"] ) {
            $errorMsg = "Failed to login. Incorrect password!!";
        } else {
            $_SESSION["user"] = strstr($userPHP, '@connect.hku.hk', true);
            $_SESSION["loginTime"] = time();
            mysqli_free_result($result);
            mysqli_close($db_conn);
            header("location: chat.php");
        }
        mysqli_free_result($result);
    }

    if ( $_POST["type"] == "register" ) {
        $userPHP = $_POST["user"];
        $passwordPHP = $_POST["password"];
        $emailPattern = "/^\S+@connect.hku.hk$/";
        if ( preg_match($emailPattern, $userPHP) ) {
            $query = "SELECT * FROM account WHERE useremail = '$userPHP'";
            $result = mysqli_query($db_conn, $query)
                or die("Query Error!".mysqli_error($db_conn));
            if ( mysqli_num_rows($result) > 0 ) {
                $errorMsg = "Failed to register. Already registered before!!";
            } else {
                $insert = "INSERT INTO account (useremail, password) VALUES ('$userPHP', '$passwordPHP')";
                if ( mysqli_query($db_conn, $insert) ) {
                    $_SESSION["user"] = strstr($userPHP, '@connect.hku.hk', true);
                    $_SESSION["loginTime"] = time();
                    mysqli_free_result($result);
                    mysqli_close($db_conn);
                    header("location: chat.php");
                } else {
                    echo "Error insert!".mysqli_error($db_conn);
                }
            }
            mysqli_free_result($result);
        } else {
            $errorMsg = "Please enter a valid HKU @connect email address";
        }
    }

    mysqli_close($db_conn);

}
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>2023-24 COMP3322 Assignment 3</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" media="screen and (max-width: 999px)" href="login.css">
        <link rel="stylesheet" media="screen and (min-width: 1000px)" href="login.css">
        <script src='login.js'></script>
    </head>
    <body>
        <h1>A Simple Chatroom Service</h1>
        <div id="login">
            <h2>Login to Clatroom</h2>
            <form id="loginForm" action="login.php" method="post">
                <h3>Login</h3>
                <input type="hidden" id="loginType" name="type" value="login" />
                <p>
                    <label for="loginUser">Email: </label>
                    <input type="text" class="inputField loginField" id="loginUser" name="user" maxlength="60" required>
                </p>
                <p>
                    <label for="loginPassword">Password: </label>
                    <input type="password" class="inputField loginField" id="loginPassword" name="password" maxlength="50" required>
                </p>
                <input type="button" id="loginBttn" value="Login">
            </form>
            <p>Click <a href="javascript:void(0);" id="switchReg">here</a> to register an account</p>
        </div>
        <div id="register">
            <h2>Register an Account</h2>
            <form id="registerForm" action="login.php" method="post">
                <h3>Registration</h3>
                <input type="hidden" id="regType" name="type" value="register" />
                <p>
                    <label for="regUser">Email: </label>
                    <input type="text" class="inputField regField" id="regUser" name="user" maxlength="60" required>
                </p>
                <p>
                    <label for="regPassword">Password: </label>
                    <input type="password" class="inputField regField" id="regPassword" name="password" maxlength="50" required>
                </p>
                <p>
                    <label for="confirm">Confirm: </label>
                    <input type="password" class="inputField regField" id="confirm" name="confirm" maxlength="50" required>
                </p>
                <input type="button" id="regBttn" value="Register">
            </form>
            <p>Click <a href="javascript:void(0);" id="switchLogin">here</a> for login</p>
        </div>
        <p id="errorMsg"><?php
            echo "$errorMsg"
        ?></p>
    </body>
</html>
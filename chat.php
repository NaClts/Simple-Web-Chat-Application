<?php

session_start();

if ( !isset($_SESSION["user"]) ) {
    http_response_code(401);
    header("location: login.php");
} else {
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>2023-24 COMP3322 Assignment 3</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" media="screen and (max-width: 999px)" href="chat.css">
        <link rel="stylesheet" media="screen and (min-width: 1000px)" href="chat.css">
        <script src='chat.js'></script>
    </head>
    <body>
        <div id="rootFlex">
            <div id='user'><?php echo $_SESSION['user'] ?></div>
            <h1>A Simple Chatroom Service</h1>
            <div id="chatboxBorder">
                <form id="logoutForm" action="login.php" method="get">
                    <input type="hidden" name="action" value="signout" />
                    <input type="submit" id="logout" value="Logout">
                </form>
                <div id="chatbox"></div>
                <div id="inputFieldBorder">
                    <textarea id="inputField" maxlength="250"></textarea>
                    <button id="send">SEND</button>
                </div>
            </div>
        </div>
    </body>
</html>

<?php
}
?>
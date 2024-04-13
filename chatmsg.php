<?php

session_start();

if ( !isset($_SESSION["user"]) ) {
    http_response_code(401);
} else if ( $_SESSION["loginTime"] < (time()-120) ) {
    if (isset($_COOKIE[session_name()])) {
        setcookie(session_name(),'',time()-3600,'/');
    }
    session_unset();
    session_destroy();
    http_response_code(401);
} else {
    if ( isset($_POST["message"]) ) {
        try  {
            $db_conn = mysqli_connect("mydb", "dummy", "YOUR_PASSWORD_HERE", "db3322");
            $message = $_POST["message"];
            $user = $_SESSION["user"];
            $currentTime = time();
            $query = "INSERT INTO `message` (`time`,`message`,`person`) VALUES ($currentTime,'$message','$user')";
            $dummyResult = mysqli_query($db_conn, $query);
            $_SESSION["loginTime"] = time();
            mysqli_free_result($dummyResult);
            mysqli_close($db_conn);
        } catch (mysqli_sql_exception $e) {
            http_response_code(503);
        }
    } else {
        try  {
            $db_conn = mysqli_connect("mydb", "dummy", "YOUR_PASSWORD_HERE", "db3322");
            if ( isset($_GET["msgidAfter"]) ) {
                $msgidAfter = $_GET["msgidAfter"];
                $query = "SELECT * FROM `message` WHERE `msgid` > $msgidAfter";
            } else {
                $timeAfter = time()-3600;
                $query = "SELECT * FROM `message` WHERE `time` >= $timeAfter";
            }
            $result = mysqli_query($db_conn, $query);
            $rawJSON = mysqli_fetch_all($result);
            echo json_encode($rawJSON);
            mysqli_free_result($result);
            mysqli_close($db_conn);
        } catch (mysqli_sql_exception $e) {
            http_response_code(503);
        }
    }
}

?>
<?php

if (isset($_GET["email"])) {
    try  {
        $db_conn = mysqli_connect("mydb", "dummy", "YOUR_PASSWORD_HERE", "db3322");
        $email = $_GET["email"];
        $query = "SELECT useremail FROM account WHERE useremail = '$email'";
        $result = mysqli_query($db_conn, $query);
        if (mysqli_num_rows($result)>0) {
            echo json_encode(TRUE);
        } else {
            echo json_encode(FALSE);
        }
        mysqli_free_result($result);
        mysqli_close($db_conn);
    } catch (mysqli_sql_exception $e) {
        http_response_code(503);
    }
} else {
    http_response_code(400);
}

?>
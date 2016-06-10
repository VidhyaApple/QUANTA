<?php
session_start();
if(isset($_SESSION["name"]) AND isset($_SESSION["email"])){
unset($_SESSION["name"]);
unset($_SESSION["email"]);
echo "logged_out";
}else{
	echo "no_sessions";
}

?>
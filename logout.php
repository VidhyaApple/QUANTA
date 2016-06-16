<?php
session_start();
$session_array=array("name","email","user_id");
if(isset($_SESSION["user_id"])){
	for($i=0;$i<count($session_array);$i++){
	 	if(isset($_SESSION[$session_array[$i]])){	
     			unset($_SESSION[$session_array[$i]]);}
		}
		
	echo "logged_out";
}else{
	echo "no_sessions";
}

?>
<?php
session_start();
if(isset($_SESSION["user_id"])){
	   if($_SESSION["name"]==="ADMIN"){
	   	  echo "admin_session,".$_SESSION["user_id"];
	   }else{
	   	  echo "user_session,".$_SESSION["user_id"];
	   }
}else{
	echo "no_session,no";
}
	

?>
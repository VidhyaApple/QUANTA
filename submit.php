<?php
session_start();
require_once("db.php");

/**
* crud operations ->construct -> one parameter- mysql table name
* functions:
* 1. test_input->one parameter
* 2.ht_insert->four parameter
*/
class ht_crud
{  
	public $new_conn;
	
	function __construct($table)
	{   
		
		$name=$email=$password=$login_email=$login_password="";
		if ($_SERVER["REQUEST_METHOD"] == "POST") {
			$this->new_conn=new Db_con();
			  			
  			if(count($_POST)===2){
  				$login_email = $this->test_input($_POST["email_login"]);
  				$login_password = $this->test_input($_POST["pwd_login"]);
  				$this->ht_read($table,$login_email,$login_password);

  			}else{
  				$name = $this->test_input($_POST["fullname"]);
				$email = $this->test_input($_POST["email"]);
	  			$password = $this->test_input($_POST["pwd"]);
	  			$this->ht_insert($table,$name,$email,$password);
  		   }
		}else{
			echo "No POST";
		}
	}

	public function test_input($data) {
		  $data = trim($data);
		  $data = stripslashes($data);
		  $data = htmlspecialchars($data);
		  return $data;
	}

	public function ht_insert($table,$name,$email,$pwd){

		     if($this->ht_check_read($table,$email)){
		    
             $insert="INSERT INTO `$table` (`Name`,`Email`,`Password`) VALUES ('$name','$email','$pwd')";
             if($this->new_conn->conn->query($insert)===true){
             	$_SESSION["email"]=$email;
             	$_SESSION["name"]=$name;
             	echo "inserted";
             }else {
               echo "error";
	         }
	         $this->new_conn->conn->close();
	     }else{
	     	echo "email_exists";
	     }
	}

	public function ht_check_read($table,$email){
		    $check_read_sql="SELECT `Email` FROM `$table` where `Email`='$email'";
		    $check_read=$this->new_conn->conn->query($check_read_sql);   
		    if ($check_read->num_rows > 0) {
            return false;
		    }else{
            return true;
		    }	
    }		    

	public function ht_read($table,$email,$pwd){
		    $read_sql="SELECT `Name` FROM `$table` where `Email`='$email' AND `Password` ='$pwd' ";
		    $read=$this->new_conn->conn->query($read_sql);   
		    if ($read->num_rows > 0) {
		    	$row = $read->fetch_assoc();
             	$_SESSION["email"]=$email;
             	$_SESSION["name"]=$row["Name"];

	         echo "loggedin";
			}else{
				echo "loggedin_dont_match";
			}
			$this->new_conn->conn->close();

	}
}
$crud=new ht_crud("ht_users");

?>
<?php
session_start();
require_once("db.php");
error_reporting(E_ALL & ~E_NOTICE);
/**
* crud operations ->construct -> one parameter- mysql table name
* functions:
* 1. test_input->one parameter
* 2.ht_insert->four parameter
*/
class ht_crud
{  
	public $new_conn;
	
	function __construct($table_user,$table_record)
	{   
		
		$name=$email=$password=$login_email=$login_password="";
		if ($_SERVER["REQUEST_METHOD"] == "POST") {
			$this->new_conn=new Db_con();
			  			
  			if(count($_POST)===2){
  				$login_email = $this->test_input($_POST["email_login"]);
  				$login_password = $this->test_input($_POST["pwd_login"]);
  				$this->ht_read($table_user,$login_email,$login_password);

  			}elseif(count($_POST)===3){
  				$name = $this->test_input($_POST["fullname"]);
				$email = $this->test_input($_POST["email"]);
	  			$password = $this->test_input($_POST["pwd"]);
	  			$this->ht_insert($table_user,$name,$email,$password);

	  		}elseif(count($_POST)>3){
  				$from_time = $this->test_input($_POST["from_time"]);
				$to_time = $this->test_input($_POST["to_time"]);
	  			$journal_id = $this->test_input($_POST["journal_id"]);
				
				$pro_pages = $this->test_input($_POST["pro_pages"]);

				$qc_pages = $this->test_input($_POST["qc_pages"]);

	  			$this->ht_insert_record($table_record,$from_time,$to_time,$journal_id,$pro_pages,$qc_pages);	
  		   
			}else{
				echo "No POST";
			}
		}
	}

	public function test_input($data) {
		  $data = trim($data);
		  $data = stripslashes($data);
		  $data = htmlspecialchars($data);
		  return $data;
	}

	public function ht_insert($table_user,$name,$email,$pwd){

		     if($this->ht_check_email_date($table_user,$email,true)){
		    
             $insert="INSERT INTO `$table_user` (`Name`,`Email`,`Password`) VALUES ('$name','$email','$pwd')";
             if($this->new_conn->conn->query($insert)===true){
             	$_SESSION["email"]=$email;
             	$_SESSION["name"]=$name;
             	$_SESSION["user_id"]=$this->new_conn->conn->insert_id;
             	echo "inserted";
             }else {
               echo "error";
	         }
	         $this->new_conn->conn->close();
	     }else{
	     	echo "email_exists";
	     }
	}

	public function ht_insert_record($table_record,$from_time,$to_time,$journal_id,$pro_pages,$qc_pages){
		    $date=date('d-m-Y, l');
            $time=$from_time." - ".$to_time;
			$user_id=$_SESSION["user_id"];	     
		    if($this->ht_check_email_date($table_record,$date,false)){

		             $insert="INSERT INTO `$table_record` (`date`,`user_id`,`journal_id`,`time`,`pro_pages`,`qc_pages`) VALUES ('$date','$user_id','$journal_id','$time','$pro_pages','$qc_pages')";
		             if($this->new_conn->conn->query($insert)===true){		             	
		             	echo "record_inserted";
		             }else {
		               echo "error";
			         }
			}else{
                 $update="UPDATE `$table_record` SET `journal_id`=CONCAT(`journal_id`,' ; $journal_id'),`time`=CONCAT(`time`,' ; $time'),`pro_pages`=CONCAT(`pro_pages`,' ; $pro_pages'),`qc_pages`=CONCAT(`qc_pages`,' ; $qc_pages');";
                 if($this->new_conn->conn->query($update)===true){		             	
		             	echo "record_inserted";
		             }else {
		               echo "error";
			         }

			}         
	         $this->new_conn->conn->close();
	     
	}

	public function ht_check_email_date($table,$str,$email_val){
		   if($email_val){
		    $check_read_sql="SELECT `Email` FROM `$table` where `Email`='$str'";
		   }else{
		   	$check_read_sql="SELECT `date` FROM `$table` where `date`='$str'";
		   }
		    $check_read=$this->new_conn->conn->query($check_read_sql);   
		    if ($check_read->num_rows > 0) {
            return false;
		    }else{
            return true;
		    }	
    }		    

	public function ht_read($table_user,$email,$pwd){
		    $read_sql="SELECT `Name` FROM `$table_user` where `Email`='$email' AND `Password` ='$pwd' ";
		    $read=$this->new_conn->conn->query($read_sql);   
		    if ($read->num_rows > 0) {
		    	$row = $read->fetch_assoc();
             	$_SESSION["email"]=$email;
             	$_SESSION["name"]=$row["Name"];
             	$_SESSION["user_id"]=$row["user_id"];

	         echo "loggedin";
			}else{
				echo "loggedin_dont_match";
			}
			$this->new_conn->conn->close();

	}
}
$crud=new ht_crud("ht_users","ht_record");

?>
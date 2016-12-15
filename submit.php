<?php
session_start();
require_once("db.php");
error_reporting(E_ALL & ~E_NOTICE);
/**
* crud operations ->construct -> two parameter- mysql table user , mysql table record
* functions:
* 1. test_input->one parameter
* 2.ht_insert->four parameter
*/
class ht_crud
{  
	public $new_conn;
	public $result;
	public $table_user;
	public $table_record;
	function __construct($table_user,$table_record)
	{   
		
		$name=$email=$password=$login_email=$login_password="";
		
		$this->table_user=$table_user;
		$this->table_record=$table_record;
		if ($_SERVER["REQUEST_METHOD"] == "POST") {	
			$this->new_conn=new Db_con();  			
  			if(count($_POST)===2){
  				$login_email = $this->test_input($_POST["email_login"]);
  				$login_password = $this->test_input($_POST["pwd_login"]);

  				// FOR ADMIN LOGIN
  				// 
  				// 
  				if($login_email==="quads_admin"){
  					if($login_email===$login_password){  						
  						$_SESSION["email"]="admin";
             			$_SESSION["name"]="ADMIN";
             			$_SESSION["user_id"]="admin";
             			$this->result="admin_loggedin";
  					}else{
  						$this->result="loggedin_dont_match";
  					}  				
  				//ADMIN LOGIN -END	
  				//
  				//
  				}else{
  					$this->result=$this->ht_read($login_email,$login_password);
  				}

  			}elseif(count($_POST)===3){
  				$name = $this->test_input($_POST["fullname"]);
				$email = $this->test_input($_POST["email"]);
	  			$password = $this->test_input($_POST["pwd"]);
	  			$this->result=$this->ht_insert($name,$email,$password);

	  		}elseif(count($_POST)>3){
  				$from_time = $this->test_input($_POST["from_time"]);
				$to_time = $this->test_input($_POST["to_time"]);
	  			$journal_id = $this->test_input($_POST["journal_id"]);
				
				$pro_pages = $this->test_input($_POST["pro_pages"]);
				$pro_pages=$this->check_empty($pro_pages);

				$qc_pages = $this->test_input($_POST["qc_pages"]);
				$qc_pages=$this->check_empty($qc_pages);

	  			$this->result=$this->ht_insert_record($from_time,$to_time,$journal_id,$pro_pages,$qc_pages);	
  		   
			}else{
				$this->result= "No POST";
			}		
		
		$this->new_conn->conn->close();
	  }
	}
	public function crud_result(){
		return $this->result;
	}

	public function test_input($data) {
		  $data = trim($data);
		  $data = stripslashes($data);
		  $data = htmlspecialchars($data);
		  return $data;
	}

	public function ht_insert($name,$email,$pwd){

		     if($this->ht_check_email_date($email,true)){
		    
             $insert="INSERT INTO `$this->table_user` (`Name`,`Email`,`Password`) VALUES ('$name','$email','$pwd')";
             if($this->new_conn->conn->query($insert)){
             	$_SESSION["email"]=$email;
             	$_SESSION["name"]=$name;
             	$_SESSION["user_id"]=$this->new_conn->conn->insert_id;
             	return "inserted";
             }else {
               return "error";
	         }
	         
	     }else{
	     	return "email_exists";
	     }
	}

	public function ht_insert_record($from_time,$to_time,$journal_id,$pro_pages,$qc_pages){

		    $date=date('d-m-Y l');
            $time=$from_time." - ".$to_time;
			$user_id=$_SESSION["user_id"];	

		    if($this->ht_check_email_date($date,false)){

		             $insert_str="INSERT INTO `$this->table_record` (`date`,`user_id`,`journal_id`,`time`,`pro_pages`,`qc_pages`) VALUES ('$date','$user_id','$journal_id','$time','$pro_pages','$qc_pages')";            	
		             
			}else{
                 $insert_str="UPDATE `$this->table_record` SET `journal_id`=CONCAT(`journal_id`,' ; $journal_id'),`time`=CONCAT(`time`,' ; $time'),`pro_pages`=CONCAT(`pro_pages`,' ; $pro_pages'),`qc_pages`=CONCAT(`qc_pages`,' ; $qc_pages') where `user_id`=$user_id AND `date`='$date'";
  			}         
  			 return $this->new_conn->conn->query($insert_str) ? "record_inserted" : "error";
	         
	     
	}

	public function ht_check_email_date($str,$email_val){
		   if($email_val){
		    $check_read_sql="SELECT `Email` FROM `$this->table_user` where `Email`='$str'";
		   }else{
		   	$user_id=$_SESSION["user_id"];
		   	$check_read_sql="SELECT `date` FROM `$this->table_record` where `date`='$str' AND `user_id`='$user_id'";
		   }
		    $check_read=$this->new_conn->conn->query($check_read_sql);   
		    return $check_read->num_rows > 0 ? false : true ;
    }		    

	public function ht_read($email,$pwd){
		    $read_sql="SELECT `Name`,`user_id` FROM `$this->table_user` where `Email`='$email' AND `Password` ='$pwd' ";
		    $read=$this->new_conn->conn->query($read_sql);   
		    if ($read->num_rows > 0) {
		    	$row = $read->fetch_assoc();
             	$_SESSION["email"]=$email;
             	$_SESSION["name"]=$row["Name"];
             	$_SESSION["user_id"]=$row["user_id"];

	         return "loggedin";
			}else{
				return "loggedin_dont_match";
			}
			
	}

	// public function ht_read_name_id(){
		
	// 	$read_sql="SELECT `user_id`,`Name` FROM `$this->table_user`";
	// 	$read=$this->new_conn->conn->query($read_sql); 
	// 	if ($read->num_rows > 0) {
	// 	    	$row=$read->fetch_all(MYSQLI_ASSOC);		    	
	// 	    	return $row;
	// 	}else{
	// 		return "NO EMPLOYEES";
	// 	} 
		
	// }

	public function check_empty($str){
		return $str==="" ? "-" : $str;
		
	}
}

?>
<?php
require_once('/home/quotequadsco/config.php');

/**
* database connection
*/

class Db_con
{
 public $conn;
 public function __construct()
 {
  // Create connection
  		$this->conn = new mysqli(DBHOST,DBUSER,DBPASS,DBNAME);
		if ($this->conn->connect_error) {
		    die("Connection failed: " . $this->conn->connect_error);
		} 
		

 }

}

?>
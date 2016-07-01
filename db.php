<?php
define('DB_SERVER','localhost');
define('DB_USER','root');
define('DB_PASSWORD','');
define('DB_NAME','mysql');
/**
* database connection
*/
class Db_con
{
 public $conn;
 public function __construct()
 {
  // Create connection
  		$this->conn = new mysqli(DB_SERVER,DB_USER,DB_PASSWORD,DB_NAME);
		if ($this->conn->connect_error) {
		    die("Connection failed: " . $this->conn->connect_error);
		} 
		
 }
}
?>
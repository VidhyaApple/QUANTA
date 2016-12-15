<?php
<<<<<<< HEAD
require_once('/home/quotequadsco/config.php');

/**
* database connection
*/

=======
define('DB_SERVER','localhost');
define('DB_USER','root');
define('DB_PASSWORD','');
define('DB_NAME','mysql');
/**
* database connection
*/
>>>>>>> 1f397fa5567a5202a063583f9e10324a794d0503
class Db_con
{
 public $conn;
 public function __construct()
 {
  // Create connection
<<<<<<< HEAD
  		$this->conn = new mysqli(DBHOST,DBUSER,DBPASS,DBNAME);
=======
  		$this->conn = new mysqli(DB_SERVER,DB_USER,DB_PASSWORD,DB_NAME);
>>>>>>> 1f397fa5567a5202a063583f9e10324a794d0503
		if ($this->conn->connect_error) {
		    die("Connection failed: " . $this->conn->connect_error);
		} 
		
<<<<<<< HEAD

 }

}

=======
 }
}
>>>>>>> 1f397fa5567a5202a063583f9e10324a794d0503
?>
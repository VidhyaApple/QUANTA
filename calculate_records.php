<?php
session_start();
require_once("db.php");
error_reporting(E_ALL & ~E_NOTICE);

class Record_read
{  
	public $new_conn;
	public $result;
	public $table;
	public $user_id;
	function __construct($table)
	{   
      $this->new_conn=new Db_con();
      $this->table=$table;
      $this->user_id=$_SESSION["user_id"];
      
	}
	public function getData(){
		$query="SELECT * FROM `$this->table` where `user_id`='$this->user_id' ";
		 $read=$this->new_conn->conn->query($query);   
		 return $read->num_rows > 0 ? $read->fetch_all(MYSQLI_ASSOC) : NULL ;
		}
}		

$record_read=new Record_read("ht_record");
echo json_encode($record_read->getData(), JSON_PRETTY_PRINT);

?>
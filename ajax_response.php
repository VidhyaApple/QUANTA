<?php
error_reporting(E_ALL & ~E_NOTICE);
if ($_SERVER["REQUEST_METHOD"] == "POST"){
	require_once("submit.php");
	$crud=new ht_crud("ht_users","ht_record");
	if(gettype($crud->crud_result())==="array"){
		echo json_encode($crud->crud_result());
	}else{
		echo $crud->crud_result();
	}
	
}else{
	require_once("calculate_records.php");
	$record=new Record_Read();
	if(isset($_GET["user"])){
		echo json_encode($record->getData($_GET["user"],$_GET["month"],$_GET["year"])) ;
	}
	if(isset($_GET["todaydata"])){
		echo json_encode($record->getTodayData($_GET["todaydata"],"month","year")) ;
	}
}
?>
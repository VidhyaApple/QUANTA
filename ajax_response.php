<?php
error_reporting(E_ALL & ~E_NOTICE);
if (($_SERVER["REQUEST_METHOD"] == "POST") OR (isset($_GET["emp_dropdown"]))){
	require_once("submit.php");
	$crud=new ht_crud("ht_users","ht_record");
	if(isset($_GET["emp_dropdown"])){
		echo json_encode($crud->ht_read_name_id());
	}else{
		echo $crud->crud_result();
	}
}else{
	require_once("calculate_records.php");
	$record=new Record_Read();
	if(isset($_GET["fulldata"])){
		echo json_encode($record->getData($_GET["fulldata"])) ;
	}
	if(isset($_GET["todaydata"])){
		echo json_encode($record->getTodayData($_GET["todaydata"])) ;
	}
}
?>
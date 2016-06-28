<?php
error_reporting(E_ALL & ~E_NOTICE);
require_once("calculate_records.php");

$record=new Record_Read();

if(isset($_GET["fulldata"])){
	echo json_encode($record->getData($_GET["fulldata"])) ;
}
if(isset($_GET["todaydata"])){
	echo json_encode($record->getTodayData($_GET["todaydata"])) ;
}

?>
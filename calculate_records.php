<?php
session_start();
require_once("db.php");
error_reporting(E_ALL & ~E_NOTICE);

class Record_Read
{  
	public $new_conn;
	public $table="ht_record";
	public $user_id;
	public $who;

	function __construct()
	{   
      $this->new_conn=new Db_con();
       $this->user_id=$_SESSION["user_id"];
      
	}
	
   public function getTodayData($who){
   	     $todayData=$this->getData($who);
   	     return array($todayData[0][total_pages],$todayData[0][total_time]);
   }	
   public function getData($who){
 		$this->who=$who;
 		$todayDate=date("d-m-Y l");
	    $query= $this->who ==="user" ? "SELECT * FROM `$this->table` where `user_id`='$this->user_id' " : "SELECT * FROM `$this->table` where `date`= '$todayDate' and `user_id`='$this->user_id'";		
		 $read=$this->new_conn->conn->query($query);
		 
		 if($read->num_rows > 0){
		     	$raw_output = [];
		        while ($row = $read->fetch_assoc()) {
    			$raw_output[] = $row;}
		
		 }else{
		 $raw_output=NULL;
		 }
		 return $this->processData($raw_output);
		}
	

  public function processData($data){
		$returnUserData=array();
        $qc_explodedData="";
        for ($totalRecord=0; $totalRecord < count($data); $totalRecord++) {         	
		   
		        foreach ($data[$totalRecord] as $key => $value) {

		        	if($key!=="date"){
		        		$explodedData=explode(" ; ",$value);
		        	}
		        	//date
		        	if($key==="date"){
		        		list($date,$day)=explode(" ",$value);
		        		$returnUserData[$totalRecord]["date"]=$date;
		        		$returnUserData[$totalRecord]["day"]=substr($day,0,3);
		        	}	            
		        	
		             elseif($key==="journal_id"){			            
			            $returnUserData[$totalRecord]["journal_id"]=$explodedData;
			         }   	

            	 	elseif($key==="time"){
            	 		$timeData=array();
            	 		for ($singleTime=0; $singleTime < count($explodedData); $singleTime++) { 
            	 			list($from,$to)=explode(" - ",$explodedData[$singleTime]);
            	 			$timeData[$singleTime]["from"]=$from;
            	 			$timeData[$singleTime]["to"]=$to;
            	 			$timeData[$singleTime]["single_time_total"]=$this->diffTime(array($explodedData[$singleTime]));
            	 		}
            	 		$returnUserData[$totalRecord]["time"]=$timeData;
            	 		$total_time=$this->diffTime($explodedData);
            	 		$returnUserData[$totalRecord]["total_time"]=$total_time;
            	 		$total_time=0;
            	 	}	

            	 	elseif($key==="pro_pages"){
	            	 	$pro_explodedData=$explodedData;
	            	 	$pro_pages=$this->sumUpPages($explodedData);}

            	 	else{
            	 		if($key==="qc_pages"){
	            	 		$qc_explodedData=$explodedData;
	            	 		$qc_pages=$this->sumUpPages($explodedData);
	            	 		$total_pages=$pro_pages+$qc_pages;
	            	 		$returnUserData[$totalRecord]["total_pages"]=$total_pages;
	            	 	    $pro_pages=$qc_pages=$total_pages=0;
            	 	}}
          			if($qc_explodedData!==""){
          				$pagesData=array();
          				for($i=0;$i<count($qc_explodedData);$i++){
          					$pagesData[$i]["pro"]=$pro_explodedData[$i];
            	 			$pagesData[$i]["qc"]=$qc_explodedData[$i];
            	 			$pro=is_numeric($pro_explodedData[$i]) ? $pro_explodedData[$i] : 0;
            	 			$qc=is_numeric($qc_explodedData[$i]) ? $qc_explodedData[$i] : 0;
            	 			$pagesData[$i]["single_pages_total"]=$pro+$qc;
          				}
		             $returnUserData[$totalRecord]["pages"]=$pagesData;
		             $qc_explodedData==="";
		        	}
          	}
		 }      

        return $returnUserData;      	
    }
        

	public function sumUpPages($arr){
       		$sumup=0;
       		for ($i=0; $i < count($arr) ; $i++) { 
				if(is_numeric($arr[$i])){$sumup += $arr[$i];}		 
			}
			return $sumup;     	
	}	

	public function diffTime($time){
		$times=array();
		
			for ($i=0; $i < count($time) ; $i++) { 
				list($from,$to)=explode(" - ",$time[$i]);
            	$datetime1 = new DateTime($from);
				$datetime2 = new DateTime($to);
				if((strpos($from,"PM")!==false) AND (strpos($to,"AM")!==false)){
					$datetime2->modify("+1 day");
				}
				$interval = $datetime1->diff($datetime2);
				$times[]=$interval->format('%H:%I'); // 2:30				
				}

			return $this->sumUpTime($times);		

	}
	public function sumUpTime($times){
		
		$total_time=0;
		foreach ($times as $time) {
			    $time=str_replace(" hrs","",$time);
				list($hour, $minute) = explode(':', $time);
		        $minutes += $hour * 60;
		        $minutes += $minute;
		    }

		    $hours = floor($minutes / 60);
		    $minutes -= $hours * 60;

		    // returns the time already formatted
		    $total_time=sprintf('%02d:%02d', $hours, $minutes)." hrs";
		    return $total_time;
	}


}		


?>
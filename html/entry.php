<?php
session_start();
?>
<div class='alert alert-success col-md-6 col-lg-6 centering hidden' id="alert_fadeout"></div>
<div class="well centering">

  <div class="row">
    <div class="col-xs-12">
      <span class="text-center text-primary"><?php echo $_SESSION["name"];?></span>
     </div>
   </div>

   <div class="row">     
      
        <div class="col-xs-6">
             <button class="btn btn-primary btn-lg no-click" id="today_record_pages">TODAY: 3 Pages<br><span class="badge"  id="today_record_hrs">6 hrs</span></button> 
        </div> 
          <div class="col-xs-6">
              <button class="btn btn-primary btn-lg no-click"  id="total_record_pages">TOTAL: 3 Pages<br><span class="badge"  id="total_record_hrs">6 hrs</span></button>
           </div>       
     
  </div>

</div>

<?php
session_start();
?>

<div class="well centering" id="well_entry">

  <div class="row">
    <div class="col-xs-12">
      <span class="text-center"><h3><?php echo $_SESSION["name"];?></h3></span>
     </div>
   </div>

   <div class="row">        
       
             <button class="col-xs-6 btn btn-primary btn-lg no-click transparent-input" id="today_record_pages">TODAY: 3 Pages<br><span class="badge"  id="today_record_hrs">6 hrs</span></button>        
          
              <button class="col-xs-6 btn btn-primary btn-lg no-click transparent-input"  id="total_record_pages">TOTAL: 3 Pages<br><span class="badge"  id="total_record_hrs">6 hrs</span></button>
                
     
  </div>
<br>
  
      <div class="text-center"><h4><?php echo date('d-m-Y l') ;?></h4></div>
    <form class="form-horizontal form_entry" role="form" >
     <div class="row">                 
              <div class='col-xs-6'>
                  <div class="form-group">
                      <div class="input-group clockpicker" data-placement="bottom" data-align="left" data-autoclose="true" id="from_time">

                          <input type='text' id="from_time_input" class="form-control input-lg transparent-input" name="from_time" placeholder="FROM TIME" readonly="true" required> 
                          <span class="input-group-addon" id="from_time_span">
                              <span class="glyphicon glyphicon-time"></span>
                          </span>
                      </div>
                  </div>
            </div>
                     
             <div class='col-xs-6'>         
                <div class="form-group">            
                     <div class="input-group clockpicker" data-placement="bottom" data-align="left" data-autoclose="true" id="to_time">

                          <input type='text' id="to_time_input" class="form-control input-lg transparent-input" name="to_time" placeholder="TO TIME" readonly="true" required> 
                          <span class="input-group-addon" id="to_time_span">
                              <span class="glyphicon glyphicon-time"></span>
                          </span>
                      </div>      
                </div>
            </div>
</div>

<div class="row">
                        
                  <div class="col-xs-12">
                      <div class="form-group">  
                      <input type="text" class="form-control input-lg transparent-input" name="journal_id" placeholder="JOURNAL/BOOK ID" required>                    
                  </div>
               </div>   
   </div>

   <div class="row">

                  <div class="text-center"><h4>Number of Pages</h4></div>
                      
                  <div class="col-xs-6">
                      <div class="form-group">     
                        <input type="text" class="form-control input-lg transparent-input" name="pro_pages" placeholder="PRODUCTION">                    
                  </div>
               </div>   

               <div class="col-xs-6">
                      <div class="form-group">     
                        <input type="text" class="form-control input-lg transparent-input" name="qc_pages" placeholder="QC">                    
                  </div>
               </div>  
     </div>           
              
      <div class="row">
        
                    <div class="col-xs-6">
                        <div class="form-group">
                             <button type="submit" class="btn btn-info btn-block btn-lg transparent-input">Submit</button>
                        </div> 

                     </div> 

                    <div class="col-xs-6">
                      <div class="form-group">
                          <button type="reset" class="btn btn-info btn-block btn-lg transparent-input" onclick="reset();"><span class="glyphicon glyphicon-refresh"></span> Reset</button>
                      </div> 
                    </div>                               
            </div>  
  </form> 

</div>

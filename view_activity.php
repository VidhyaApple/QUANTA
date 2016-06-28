<div id="toolbar" class="btn-group">
       <div class="btn-group">
            <button class="btn btn-primary dropdown-toggle" data-toggle="dropdown" id="month_name">MONTH <span class="caret"></span></button>            
            <ul class="dropdown-menu" id="month_filter_li"></ul>
      </div> 
      <div class="btn-group">           
            <button class="btn btn-primary dropdown-toggle" data-toggle="dropdown" id="year_name" >YEAR <span class="caret"></span></button>
            <ul class="dropdown-menu" id="year_filter_li"></ul>   
      </div>
      <div class="btn-group">           
            <button class="btn btn-primary" id="clear_filter" >CLEAR</button>             
      </div>
  </div>
  <div class="well to_show_summary">    
    <p style="text-align:center" class="month_year"></p>    
      <p class="month_total_time"></p>
      <p class="month_total_pages"></p>    
  </div>
    <table id="activity_table"    
           data-classes="table table-hover customtable"
           data-show-refresh="true"
           data-show-toggle="true"
           data-show-columns="true"
           data-sortable="false"           
           data-pagination="false"
           data-pagination-v-align="top"
           data-pagination-h-align="left"
           data-show-pagination-switch="true"
           data-toolbar="#toolbar"
           data-toolbar-align="left"
           data-buttons-align="right">
    </table>


      <!-- Modal -->
<div class="modal fade" id="details_table_modal" role="dialog">
    <div class="modal-dialog">
    
        <!-- Modal content-->
        <div class="modal-content">
           <!-- header -->
          <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
               <h4 class="modal-title text-center" id="date_day"></h4>
          </div>

           <!-- body -->
          <div class="modal-body">
            <table id="details_table"
                   data-classes="table table-hover customtable"
                   data-show-refresh="true"
                   data-show-toggle="true"
                   data-show-columns="true">                  
            </table>
          </div>  
          <!-- footer -->
          <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>

      </div>    <!-- model-content-ends-->
      
    </div> <!--modal-dialog-ends-->
</div> <!--modal ends-->
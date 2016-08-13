<!-- <div class="well well-sm to_show_summary text-center"> 
<h5>ADMIN</h5>
</div> -->
<div id="toolbar" class="btn-group">
       <div class="btn-group">
            <button class="btn btn-primary dropdown-toggle month_name" data-toggle="dropdown" ></button>            
            <ul class="dropdown-menu month_filter_li"></ul>
      </div> 
      <div class="btn-group">           
            <button class="btn btn-primary dropdown-toggle year_name" data-toggle="dropdown" ></button>
            <ul class="dropdown-menu year_filter_li"></ul>   
      </div>
      <div class="btn-group" id="emp">           
            <button class="btn btn-primary dropdown-toggle emp_name" data-toggle="dropdown" ></button>
            <ul class="dropdown-menu emp_filter_li"></ul>   
      </div>
  </div>

    <table id="activity_table"    
           data-classes="table table-hover customtable"
           data-show-refresh="true"
           data-show-toggle="true"           
           data-show-columns="true"
           data-sortable="true"
           data-fixed-columns="true"
           data-fixed-number=1
           data-height=200
           data-show-footer="true"
           data-pagination="false"
           data-pagination-v-align="top"
           data-pagination-h-align="left"
           data-show-pagination-switch="true"
           data-toolbar="#toolbar"
           data-show-export="true"
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
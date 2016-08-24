
<div id="toolbar_admin" class="btn-group">
       <div class="btn-group">
            <button class="btn btn-primary dropdown-toggle month_name" title="MONTH FILTER" data-toggle="dropdown" ></button>            
            <ul class="dropdown-menu month_filter_li"></ul>
      </div> 
      <div class="btn-group">           
            <button class="btn btn-primary dropdown-toggle year_name" title="YEAR FILTER" data-toggle="dropdown" ></button>
            <ul class="dropdown-menu year_filter_li"></ul>   
      </div> 

<div class="export btn-group"><button class="btn dropdown-toggle" title="EXPORT DATA" data-toggle="dropdown" type="button"><i class="glyphicon glyphicon-export icon-share"></i> <span class="caret"></span></button><ul class="dropdown-menu" role="menu"><li data-type="json"><a href="javascript:void(0)">JSON</a></li><li data-type="xml"><a href="javascript:void(0)">XML</a></li><li data-type="csv"><a href="javascript:void(0)">CSV</a></li><li data-type="txt"><a href="javascript:void(0)">TXT</a></li><li data-type="sql"><a href="javascript:void(0)">SQL</a></li><li data-type="excel"><a href="javascript:void(0)">MS-Excel</a></li></ul></div>



  
   </div>     
        <table id="table_admin"
           data-toolbar="#toolbar_admin"                  
           data-fixed-columns="true"
           data-fixed-number=1
           data-classes="table customtable2"                         
           data-pagination="true"          
           data-page-list="[10, 25, 50, 100, ALL]"
           data-page-size="20" 
           data-toolbar-align="left"
           >       
    </table>
 
       <!-- Modal -->
<div class="modal fade" id="details_table_admin_modal" role="dialog">
    <div class="modal-dialog">
    
        <!-- Modal content-->
        <div class="modal-content">
           <!-- header -->
          <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
               <h4 class="modal-title text-center" id="date_day_name"></h4>
          </div>

           <!-- body -->
          <div class="modal-body">
            <table id="details_table_admin"              
                   data-classes="table table-hover customtable"
                   data-show-refresh="true"
                   data-show-toggle="true"
                   data-show-columns="true">

             <thead>
                   <tr>
                      <th colspan="3" data-align="center">TIME</th>
                      <th colspan="3" data-align="center">PAGES</th>
                      <th rowspan="2" data-align="center" data-field="journal_id" data-title-tooltip="NAME OR ID OF JOURNAL / BOOK">JOURNAL/BOOK ID</th>
                       
                   </tr>
                   <tr>
                      <th data-field="from" data-align="center" data-title-tooltip="FROM TIME WHEN WORK IS STARTED">FROM</th>
                      <th data-field="to" data-align="center" data-title-tooltip="TO TIME WHEN WORK IS OVER">TO</th>
                      <th data-field="single_time_total" data-align="center" data-title-tooltip="TOTAL HOURS FOR THAT SESSION">TOTAL</th>
                      <th data-field="pro" data-align="center" data-title-tooltip="PRODUCTION PAGES">PRO</th>
                      <th data-field="qc" data-align="center" data-title-tooltip="QUALITY CONTROL PAGES">QC</th>
                      <th data-field="single_pages_total" data-align="center" data-title-tooltip="TOTAL PAGES FOR THAT SESSION">TOTAL</th>   
                   </tr>
             </thead>                    
            </table>
          </div>  
          <!-- footer -->
          <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>

      </div>    <!-- model-content-ends-->
      
    </div> <!--modal-dialog-ends-->
</div> <!--modal ends-->   

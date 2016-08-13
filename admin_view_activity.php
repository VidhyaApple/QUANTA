<div id="toolbar_admin" class="btn-group">
       <div class="btn-group">
            <button class="btn btn-primary dropdown-toggle month_name" data-toggle="dropdown" ></button>            
            <ul class="dropdown-menu month_filter_li"></ul>
      </div> 
      <div class="btn-group">           
            <button class="btn btn-primary dropdown-toggle year_name" data-toggle="dropdown" ></button>
            <ul class="dropdown-menu year_filter_li"></ul>   
      </div>
     
 </div> 
        
        <table id="table_admin"
           data-toolbar="#toolbar_admin"                     
           data-fixed-columns="true"
           data-fixed-number=1
           data-classes="table customtable2"
           data-show-refresh="true"
           data-show-toggle="true"           
           data-show-columns="true"
           data-sortable="true"
           data-fixed-columns="true"
           data-fixed-number=1           
           data-pagination="true"
           data-show-pagination-switch="true"          
           data-show-export="true"
           data-page-list="[10, 25, 50, 100, ALL]"
           data-page-size="20"           
           >
            <!-- <thead>
             <tr>
                <th data-field="date" data-title-tooltip="DATE">DATE</th>
                <th data-field="day" data-title-tooltip="DAY">DAY</th>
                <th data-field="total_pages" data-title-tooltip="TOTAL PAGES PER DAY">PAGES</th>
                <th data-field="total_time" data-title-tooltip="TOTAL HOURS PER DAY">HOURS</th>   
             </tr>
             </thead>
             <tbody>
                     <tr>
                           <td>1</td>
                             <td>2</td>
                             <td>3</td>
                             <td>4</td>                            
                     </tr>
                     <tr>
                             <td>1</td>
                             <td>2</td>
                             <td>3</td>
                             <td>4</td>
                             
                     </tr>
                     <tr>
                             <td>1</td>
                             <td>2</td>
                             <td>3</td>
                             <td>4</td>                             
                     </tr>
                     <tr>
                             <td>1</td>
                             <td>2</td>
                             <td>3</td>
                             <td>4</td>                             
                     </tr>
                    
             </tbody> -->
    </table>
    

<script>
   //ADMIN TABLE 
//
//
function getDaysInMonth(admonth, adyear) {
     var date = new Date(adyear, admonth, 1);
     var days = [];
     while (date.getMonth() === admonth) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
     }
     return days;
}

function fillColumnsByDate(admonth,adyear){
    var calendar=getDaysInMonth(admonth, adyear);
    var to_fill_column=[];
    
    for(var i=0;i<calendar.length;i++){
        var oneday=calendar[i].toString().split(" ");
        // to_fill_column.push(
        //         {
        //         title:oneday[2],
        //         field:oneday[2]
        //         }
        //         );
        
    }   

    
   
}  
 
//fillColumnsByDate(4,2016);


        function getHeight() {
        return $(window).height() - $("#toolbar_admin").outerHeight(true)-100;
        }
        $(window).resize(function () {
            $('#table_admin').bootstrapTable('resetView', {
                height: getHeight()
            });
        });
   

$("#table_admin td").attr({"title":"DOUBLE CLICK TO SEE DETAILS","data-container":"body","data-toggle":"tooltip","data-placement":"bottom"});
$(function(){
    $('body').tooltip({ selector: '[data-toggle="tooltip"]' });
  });
</script>

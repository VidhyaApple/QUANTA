$(document).ready(function(){

//VARIABLE INITIALISATION FOR TIME PICKER AND STORING DATAS AND METHODS
//
//  
var session_data;
var currentTime = new Date();
var currentYear=currentTime.getFullYear();
var currentDate=currentTime.getDate();
var currentMonth=getCurrentMonth_in_number();
var month="";
var year="";
var todayDate=currentMonth+"-"+currentDate+"-"+currentYear;
var monthNames = {"JAN": "01","FEB": "02","MAR": "03","APR": "04","MAY": "05","JUN": "06","JUL": "07","AUG": "08","SEP": "09","OCT": "10","NOV": "11","DEC": "12"};  

//METHODS
//CURRENT TIME
function getTime() {
   
  var h = (currentTime.getHours() % 12) || 12; // show midnight & noon as 12
  return (
    ( h < 10 ? '0' : '') + h +
    ( currentTime.getMinutes() < 10 ? ':0' : ':') + currentTime.getMinutes() +
                // optional seconds display
    // (currentTime.getSeconds() < 10 ? ':0' : ':') + currentTime.getSeconds() + 
    ( currentTime.getHours() < 12 ? ' AM' : ' PM' )
  );
//CURRENT MONTH  
}
function getCurrentMonth_in_number(){  
  var mon = currentTime.getMonth() + 1;   
  return (mon!==11 && mon !==12 && mon !==10) ?  ""+0+mon : mon ;
}

//INITIAL SETTINGS TO BE DONE
//
//
//
var outputs=[];  //stores userid of that session
function showPaddingBottomMobileView(){
    if($('nav.navbar-fixed-bottom').is(':visible')){
           $("body").css("padding-bottom","50px"); 
         }else{$("body").css("padding-bottom","0px"); }
} 
showPaddingBottomMobileView();

//HIDE FOOTER WHEN INPUT BOX IS ON FOCUS
$(document).on('focus', 'input', function() {
     $("nav.navbar-fixed-bottom").removeClass("visible-xs").addClass("hidden");
    showPaddingBottomMobileView();
    
});

//SHOW FOOTER WHEN INPUT IS NOT ON FOCUS
$(document).on('blur', 'input', function() {     
    $("nav.navbar-fixed-bottom").removeClass("hidden").addClass("visible-xs");
    showPaddingBottomMobileView();   
 
});

//if admin logged in then hide view activity menu
function hideMenu(){
  if(outputs[1]==="admin"){
        $("nav.navbar-fixed-bottom").removeClass("visible-xs").addClass("hidden");
        showPaddingBottomMobileView();
       $(".tohide").hide();
    }else{
        $("nav.navbar-fixed-bottom").removeClass("hidden").addClass("visible-xs");
        showPaddingBottomMobileView();     
       $(".tohide").show();      
    }
}

//SHOW LOADING IMAGE ON AJAX REQUEST
var $loading = $('#img-load').hide();
$(document)
  .ajaxStart(function () {
    $loading.show();
  })
  .ajaxComplete(function () {
    $loading.fadeOut();
  });

//INITIAL SETTINGS TO BE DONE  - END
//
//
//
//COMMON FUNCTIONS TO BE CALLED
//
//
//
function checkSession(handleData){  
      $.ajax({url:"session_check.php",success:function(data){
        handleData(data);
      }
    }); 

 }

function loadFile(file){    
    $.get(file, function(contentdata){ 

      $(".content-area").empty().html(contentdata).fadeIn();
      if(file==="entry.php")showTodayData();
      if((file==="admin_view_activity.php") || (file==="view_activity.php"))filterTable();
      
   });
 
 }

checkSession(function(output){ 
      outputs=output.split(",");    
      hideMenu();
  if(outputs[0]==="user_session"){
      loadFile("entry.php");
  }else if(outputs[0]==="admin_session"){
      $("nav.navbar-fixed-bottom").removeClass("visible-xs").addClass("hidden");
      showPaddingBottomMobileView();     
      loadFile("admin_view_activity.php");

  }else{
    loadFile("form.html");
  }
});  
             

function fade_alert_loadfile(alert_val,filename){
  $("<div class='alert fade in alert-fixed'>"+alert_val+"</div>").appendTo(".content-area").delay(1000).fadeOut("slow",function(){ 
     loadFile(filename);});         
}

function fade_alert(alert_val){
  $("<div class='alert fade in alert-fixed'>"+alert_val+"</div>").appendTo(".content-area").delay(1000).fadeOut("slow");         
}

$(function(){
    $('body').tooltip({ selector: '[data-toggle="tooltip"]' });
  });

//COMMON FUNCTIONS TO BE CALLED - END
//
//
//FIXED NAVIGATION
//
//
$(".home_nav").on("click",function(){        
              if(outputs[0]==="user_session"){
                  loadFile("entry.php");
              }else if(outputs[0]==="admin_session"){
                 loadFile("admin_view_activity.php");
              }else{
                loadFile("form.html");
              }
      
}); 

$(".viewactivity_nav").on("click",function(){
        
        if(outputs[0]==="user_session"){          
          loadFile("view_activity.php");   
        }else if(outputs[0]==="admin_session"){             
          loadFile("admin_view_activity.php");                     
        }else{
          fade_alert("PLEASE LOG IN TO VIEW ACTIVITY!");
        }     
  });

 $(".logout_nav").on("click",function(){
    var logout_alert="";
    if(outputs.length>0) outputs[0]=outputs[1]="";
   
    $.ajax({url: 'logout.php', success: function(data){
        if(data==="logged_out"){
          logout_alert="Logged out successfully!";
        }else if(data==="no_sessions"){
          logout_alert="You haven't logged in yet!";
        }else{
          logout_alert="Some error in logging out!";
        }
        fade_alert_loadfile(logout_alert,"form.html");
      }
       });
  });
//FIXED NAVIGATION - END
//
//
//PAGE 1
//
//
      //LOGIN/SIGNUP FORM
      //
      //
 
$(document).on('submit', '.form_login_signup', function(){

    if(!($("#em_pwd_error").hasClass("hide"))){
        $("#em_pwd_error").addClass("hide");
    }
    
    $.post('ajax_response.php', $(this).serialize())
    .done(function(data){
      
            if(data=="inserted"){ 
                  checkSession(function(output){ 
                      outputs=output.split(",");    
                      hideMenu();
                  });
                $(".panel-group").fadeOut('slow', function(){   
                fade_alert_loadfile('Signed up Successfully!',"entry.php"); });        

            }else if(data=="email_exists"){
                $("#em_error").removeClass("hide");

            }else if(data=="loggedin"){
                checkSession(function(output){ 
                    outputs=output.split(",");    
                    hideMenu();
                 });   
                $(".panel-group").fadeOut('slow', function(){
                fade_alert_loadfile("Logged in successfully","entry.php"); });           

            }else if(data=="loggedin_dont_match"){
                $("#em_pwd_error").removeClass("hide");

            }else if(data=="admin_loggedin"){
                checkSession(function(output){ 
                    outputs=output.split(",");    
                    hideMenu();
                 });  
                $(".panel-group").fadeOut('slow', function(){    
                //location.reload();                             
                fade_alert_loadfile("Logged in successfully","admin_view_activity.php"); 
                
                }); 
                
            }else{
              
                fade_alert("FAILED TO SUBMIT DATA!");
            }

    }).fail(function(){

          fade_alert('FAILED TO SUBMIT THE DATA. DATABASE ISSUE!'); });
    
    return false;
}); 

//RECORD ENTRY FORM
$(document).on('submit', '.form_entry', function(){
        
     if(($("input[name='pro_pages']").val()!=="") || ($("input[name='qc_pages']").val()!=="")){

          $.post('ajax_response.php', $(this).serialize())
              .done(function(data){            
                    if(data=="record_inserted"){  
                          fade_alert_loadfile("Saved successfully","entry.php");
                    }else{                       
                          fade_alert("ERROR IN SUBMITTING RECORDS!");
                    }

              })
              .fail(function(){
                  fade_alert('FAILED TO SUBMIT THE DATA. DATABASE ISSUE!');
              });

      }else{fadealert("PLEASE ENTER NO. OF PAGES!");} 

  return false;
   
}); 


var typingTimer;                //TIMER IDENTIFIER
var doneTypingInterval = 700;  //TIME IN MS, 5 SECOND FOR EXAMPLE
var $input = $('#pwd2');

//ON KEYUP, START THE COUNTDOWN
$(document).on('keyup',$input, function () {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

//ON KEYDOWN, CLEAR THE COUNTDOWN 
$(document).on('keydown',$input, function () {
  clearTimeout(typingTimer);
});

//USER IS "FINISHED TYPING," DO SOMETHING
function doneTyping () {
  if($("#pwd2").val()!==""){  
    if($("#pwd").val()===$("#pwd2").val()){
          feedback_success("#confirm_password");
           $("button#form_submit").removeAttr("disabled");
           $("button#form_submit").css("color","white");
     }else{
           feedback_error("#confirm_password");             
           $("button#form_submit").prop("disabled","true");
           $("button#form_submit").css("color","black");

       }
    }    
}
      
function feedback_success(putfeedback){
    $(putfeedback).removeClass("has-error").addClass("has-success");
    $(putfeedback+" span").removeClass("glyphicon-remove").addClass("glyphicon-ok");               
}   

function feedback_error(putfeedback){
    $(putfeedback).removeClass("has-success").addClass("has-error");               
    $(putfeedback+" span").removeClass("glyphicon-ok").addClass("glyphicon-remove");
}  
//LOGIN/SIGNUP FORM - END
//PAGE 1 END
//
//
//PAGE 3 VIEW ACTIVITY 
//
//
    // FILTER TABLE BUTTONS

$(document).on("click",".month_filter_li li a",function(){
       
        $('.month_name').html($(this).text()+ " <span class='caret'></span>");
        month= monthNames[$(this).text()];       
        filterTable();
               
});
//year filter
$(document).on("click",".year_filter_li li a",function(){      
     
         $('.year_name').html($(this).text()+ " <span class='caret'></span>");
         year=$(this).text();
         
         filterTable();     
      
});

 //filter method
function filterTable(){         
      
      if(month ==="") month=currentMonth;
      if(year ==="") year=currentYear;
      fillDropdown(month,year);
      if(outputs[1]!=="admin"){

            $.getJSON('ajax_response.php',{user:"user",month:month,year:year}).done(function(data){               
                    $('#activity_table').bootstrapTable("destroy").bootstrapTable({data:data,height:getHeight()});
                    $("#activity_table tr").attr({"title":"CLICK TO SEE DETAILS","data-container":"body","data-toggle":"tooltip","data-placement":"bottom"});
            }).fail(function(){                  
                  fade_alert("ERROR IN LOADING EMPLOYEES RECORDS");
            });          
         

       }else{
            if(outputs[1]==="admin"){                
                $.getJSON('ajax_response.php',{user:"admin",month:month,year:year}).done(function(data){             
                      $('#table_admin').bootstrapTable("destroy").bootstrapTable({
                        data:adminDataProcess(data),
                        columns:fillColumnsByDate(month,year),
                        height:getHeight()
                      });
                      $("#table_admin td").attr({"title":"DOUBLE CLICK TO SEE DETAILS","data-container":"body","data-toggle":"tooltip","data-placement":"bottom"});
                      $("#table_admin td:nth-child(8n+1),td:last-child").css("background-color","#E17149");
                }).fail(function(){                  
                  fade_alert("ERROR IN LOADING EMPLOYEES RECORDS");
                });


            }
       }
       
  } 

function showTodayData(){
  $.getJSON('ajax_response.php',{todaydata:"today"}).done(function(data){
          var data_pages= data[0]===null ? 0 : data[0];
          var data_hrs=data[1]===null ? "0 hrs" : data[1];

           $("#today_record").html("TODAY: "+data_pages+" PAGES     <span class='badge label-as-badge'>"+data_hrs+"</span>");
           
          }).fail(function(){ 
           
            fade_alert("ERROR IN LOADING TODAY'S ACTIVITY");
          });
}


  $(document).on('click-row.bs.table',"#activity_table", function (e, row, $element) {          
          $("#details_table_modal").modal();
          $("#date_day").html(row.date+"  "+row.day);
          $('#details_table').bootstrapTable("destroy").bootstrapTable({data:createDetailsData(row)});
           
  });

  function createDetailsData(row){
          var details_data=[];
          for (var i = 0; i < row.time.length; i++) {
              details_data.push({
                from:row.time[i].from,          
                to:row.time[i].to,
                single_time_total:row.time[i].single_time_total,
                pro:row.pages[i].pro,
                qc:row.pages[i].qc,
                single_pages_total:row.pages[i].single_pages_total,
                journal_id:row.journal_id[i]
            }); 

          } 
      return details_data;           
  }

  function fillDropdown(month,year){
      var monthname_in_dropdown= month!=="" ? month : currentMonth;

       $.each(monthNames, function (k, v) {
            if (v === monthname_in_dropdown)  $('.month_name').html(k + " <span class='caret'></span>"); 
        });

       var year_in_dropdown= year!=="" ? year : currentYear;        
      $('.year_name').html(year_in_dropdown+" <span class='caret'></span>");      
        
       //month
         var li_month="";
         $.each(monthNames, function (k, v) {
             li_month += "<li><a href='#'>"+ k +"</a></li>";
         });
        //year
       var start = 2015;
       var end = new Date().getFullYear();
       var li_year = "";
       for(var year_for = start ; year_for <=end; year_for++){
           li_year += "<li><a href='#'>"+ year_for +"</a></li>";
       }
       $(".month_filter_li").html(li_month);
       $(".year_filter_li").html(li_year); 
}
//ACTIVITY TABLE ENDS
//
//
//////ADMIN TABLE 
//
//

function adminDataProcess(data){
 var date;
 var ProcessedData=[];
 var ChangingData=_.groupBy(data,"user_id");
  $.each(ChangingData, function (k, v) {
  var concat=[];     
      ChangingData[k]=_.map(v, function(vk) {
        date=(vk.date).split("-");
        vk["pgs_hrs_"+date[0]]=vk.total_pages+" -- "+(vk.total_time).slice(0,-4);        
        vk["date_"+date[0]] =vk.date;
        vk["day_"+date[0]] =vk.day;
        vk["pages_"+date[0]] =vk.pages;
        vk["time_"+date[0]] =vk.time;
        vk["journal_id_"+date[0]] =vk.journal_id;        
        vk=  _.omit(vk, ['total_time','total_pages','date','day','pages','time','journal_id']);
        Object.assign(concat,vk);
        
      });
          
         var week_1=0;
         var week_2=0; 
         var week_3=0; 
         var week_4=0;
         var month_pages=0;
         var week_1_array=[];
         var week_2_array=[];
         var week_3_array=[];
         var week_4_array=[];
         var month_pages_array=[];
           
      for(var key in concat){             
        if((key.indexOf("pgs_hrs_"))!==-1){
              var date=key.split("_");              
              var pg_hr=concat[key].split(" -- ");
              var page=parseInt(pg_hr[0]);
                if(date[2]<=07){
                  week_1=parseInt(week_1)+page;
                  week_1_array.push(pg_hr[1]);
                }else if(date[2]<=14){          
                  week_2=parseInt(week_2)+page;
                  week_2_array.push(pg_hr[1]);
                }else if(date[2]<=21){          
                  week_3=parseInt(week_3)+page;
                  week_3_array.push(pg_hr[1]);
                }else if(date[2]<=28){          
                  week_4=parseInt(week_4)+page;
                  week_4_array.push(pg_hr[1]);         
                }
              //month 
              month_pages=parseInt(month_pages)+page;
              month_pages_array.push(pg_hr[1]); 
          }
         }  
        concat.week_1=week_1+" -- "+sumUpTime(week_1_array);
        concat.week_2=week_2+" -- "+sumUpTime(week_2_array);
        concat.week_3=week_3+" -- "+sumUpTime(week_3_array); 
        concat.week_4=week_4+" -- "+sumUpTime(week_4_array);
        concat.month_total=month_pages+" -- "+sumUpTime(month_pages_array);                        
      
      ChangingData[k]=concat;      
      ProcessedData.push(_.extend({}, ChangingData[k]));
  });  
  return ProcessedData;
}

function sumUpTime(times){
  
  var minutes=0;
  for (var i = 0; i < times.length; i++) {
    //var time=times[i].replace(" hrs","");
    var time=times[i];
    var splitted=time.split(":");
    minutes =minutes + Number(splitted[0] * 60) + Number(splitted[1]);    
  }  
  
  var hours = Math.floor(minutes/60);
  minutes -= hours * 60; 
  hours=hours.toString().length >=2 ? hours : "0"+hours;
  minutes=minutes.toString().length===2 ? minutes : "0"+minutes;
  return hours+":"+minutes;
}
$(document).on('page-change.bs.table',"#table_admin", function (data) {
$("#table_admin td").attr({"title":"DOUBLE CLICK TO SEE DETAILS","data-container":"body","data-toggle":"tooltip","data-placement":"bottom"});
                      $("#table_admin td:nth-child(8n+1),td:last-child").css("background-color","#E17149");
});

 $(document).on('dbl-click-cell.bs.table',"#table_admin", function (field, value, row, element) {
           $(".success").removeClass("success");          
           $("[aria-describedby^='tooltip']").addClass("success");
           
           if(row===undefined){
                alert("No record!");
           }else if(((value.indexOf("week_"))!==-1) || ((value.indexOf("month_"))!==-1)){
               alert("Please see the details of daily progress!");                 
           }else{         
               $("#details_table_admin_modal").modal();
               var id=value.split("_");
                id=id[(id.length)-1];            
               $("#date_day_name").html(element["date_"+id]+"  ("+element["day_"+id]+")<br><b>"+element.Name+"</b>");
               $('#details_table_admin').bootstrapTable("destroy").bootstrapTable(
                {data:createDetailsData_admin(element,id),
                  columns:fillColumn_detailsdata_admin(id)
                });   
           }        
  }); 

  function createDetailsData_admin(element,id){
          var details_data=[];
          
          for (var i = 0; i < element["time_"+id].length; i++) {
              details_data.push({
                from:element["time_"+id][i].from,          
                to:element["time_"+id][i].to,
                single_time_total:element["time_"+id][i].single_time_total,
                pro:element["pages_"+id][i].pro,
                qc:element["pages_"+id][i].qc,
                single_pages_total:element["pages_"+id][i].single_pages_total,
                journal_id:element["journal_id_"+id][i]
            }); 

          } 
      return details_data;           
  }
  function getDaysInMonth(admonth, adyear) {
  
     admonth=(parseInt(admonth-1, 10));
    
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
    var week=0;
    var oneday;
    var to_fill_column=[[{
                          "title":"EMPLOYEES",
                          "field":"Name",
                          "rowspan":2                           
                        }],[]];
   
    for(var i=0;i<calendar.length;i++){
        oneday=calendar[i].toString().split(" ");       
        if(((i+1)%7)===0){
            week=week+1;
            to_fill_column[0].push(                     
                        {
                          "title":oneday[2]+"-"+oneday[1]+"<br>"+oneday[0],                          
                           "rowspan":1,                                                                
                           "align":"center"                         
                        },
                        {
                          "title":"WEEK- "+week+"<br>TOTAL",                          
                          "rowspan":1,
                          "align":"center"                                              
                        });                          
                
        to_fill_column[1].push(                     
                        {
                          "title":"PGS -- HRS",
                          "field":"pgs_hrs_"+oneday[2]         
                        },
                        {
                          "title":"PGS -- HRS",
                          "field":"week_"+week
                        });                         

        }
        else{  
        to_fill_column[0].push(                     
                        {
                          "title":oneday[2]+"-"+oneday[1]+"<br>"+oneday[0],                          
                          "rowspan":1,                                                                 
                          "align":"center"                         
                        });                        
                
        to_fill_column[1].push(                     
                        {
                          "title":"PGS -- HRS",
                          "field":"pgs_hrs_"+oneday[2]
                        });      

        }

    }
    
    to_fill_column[0].push(                     
                        {
                          "title":oneday[1]+"<br>MONTH TOTAL",                         
                          "rowspan":1,
                          "align":"center"
                        });  
    to_fill_column[1].push(                     
                        {
                          "title":"PGS -- HRS",
                          "field":"month_total"
                        });                                   
   return to_fill_column;
       
}

  function fillColumn_detailsdata_admin(id){    
    var col=[[
              {
                title:"TIME",
                align:"center",
                colspan:3
              },{
                title:"PAGES",
                align:"center",
                colspan:3
              },{
                title:"JOURNAL/BOOK ID",
                align:"center",
                rowspan:2,
                field:"journal_id_"+id
              }

              ],[
              {
                field:"from",
                align:"center"
              },{field:"to",
                align:"center"
              },{field:"single_time_total",
                align:"center"
              },{field:"pro",
                align:"center"
              },{field:"qc",
                align:"center"
              },{field:"single_pages_total",
                align:"center"}
              ]];
  }

//basic functions for admin table

function getHeight() {
return $('nav.navbar-fixed-bottom').is(':visible')?$(window).height() - $(".content-area").outerHeight(true)-150 :$(window).height() - $(".content-area").outerHeight(true)-60;
}

$(window).resize(function () {
        $('#activity_table').bootstrapTable('resetView');
        $('#details_table').bootstrapTable('resetView');
        $('#table_admin').bootstrapTable('resetView');
        $('#details_table_admin').bootstrapTable('resetView');
        
    });


//TIMEPICKER
//
$(document).on("keydown",".readonly",function(e){
        e.preventDefault();
});

var isHidden1 = true;
var isHidden2 = true;
var confirm_empty_timepicker1=false;
var confirm_empty_timepicker2=false;
var pickerTime1;
var pickerTime2;
$(document).on("click","#timepicker1",function(){
  $(this).timepicker({      
      minuteStep:5,
      disableFocus :true
  }).on('changeTime.timepicker', function(e) { 
        var h= e.time.hours;
        var m= e.time.minutes;
        var mer= e.time.meridian;
        pickerTime1=h+":"+m+" "+mer;
        var compare1=new Date(todayDate+" "+pickerTime1);
        var compare2=new Date(todayDate+" "+getTime());
        confirm_empty_timepicker1  = compare1 > compare2 ? true :false;         
     });  
    
                
  if(!isHidden1) {
     $(this).timepicker('hideWidget'); 
    isHidden1=true;
  } else {
    $(this).timepicker('showWidget');
    isHidden1 = false;
  }
});


$(document).on("click","#timepicker2",function(){
  $(this).timepicker({
      
      minuteStep:5,
      disableFocus :true
  }).on('changeTime.timepicker', function(e) { 
        var h= e.time.hours;
        var m= e.time.minutes;
        var mer= e.time.meridian;
        pickerTime2=h+":"+m+" "+mer;
        var compare1=new Date(todayDate+" "+pickerTime2);
        var compare2=new Date(todayDate+" "+getTime());
        confirm_empty_timepicker2  = compare1 > compare2 ? true :false;
        
     });     
    
  if(!isHidden2) {
     $(this).timepicker('hideWidget'); 
    isHidden2=true;
  } else {
    $(this).timepicker('showWidget');
    isHidden2 = false;
  }
});

$(document).on("keydown","input[name='journal_id']",function(){
  if(confirm_empty_timepicker1===true){
         $("#timepicker1").val("");
         confirm_empty_timepicker1=false;
         fade_alert("Selected From time is beyond current time!");         
       } 
       if(confirm_empty_timepicker2===true){
         $("#timepicker2").val("");
         confirm_empty_timepicker2=false;
         fade_alert("Selected To time is beyond current time!");         
       } 

});
//TIME PICKER ENDS


});  //end of main document.ready function

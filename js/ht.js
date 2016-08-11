$(document).ready(function(){

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
     $("nav.navbar-fixed-bottom").removeClass("visible-xs").addClass("hidden-xs hidden-md hidden-lg");
    showPaddingBottomMobileView();
    
});

//SHOW FOOTER WHEN INPUT IS NOT ON FOCUS
$(document).on('blur', 'input', function() {     
    $("nav.navbar-fixed-bottom").removeClass("hidden-xs hidden-md hidden-lg").addClass("visible-xs");
    showPaddingBottomMobileView();   
 
});

//if admin logged in then hide view activity menu
function hideMenu(){
  if(outputs[1]==="admin"){
       $(".tohide").hide();
    }else{     
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
    if(file==="entry.php"){
      showTodayData();
    }
    if(file==="admin_view_activity.php"){
         if(emp_user_id !==""){
            fillTable(emp_user_id,"admin_view_activity.php"); 
          }else{
            fillDropdown();
          }             
    }

  });
  
  month="";
  year="";
  toSearch="";

}


checkSession(function(output){ 
      outputs=output.split(",");    
      hideMenu();
  if(outputs[0]==="user_session"){
      loadFile("entry.php");
  }else if(outputs[0]==="admin_session"){
      $("nav.navbar-fixed-bottom").removeClass("visible-xs").addClass("hidden-xs hidden-md hidden-lg");
      showPaddingBottomMobileView();     
      loadFile("admin_view_activity.php");

  }else{
    loadFile("form.html");
  }
});  
             

function fade_alert_loadfile(alert_val,filename){
  $("<div class='alert alert-danger col-xs-offset-2 col-xs-8 col-md-offset-2 col-md-6 fade in alert-fixed'>"+alert_val+"</div>").appendTo(".content-area").delay(1000).fadeOut("slow",function(){ 
     loadFile(filename);});         
}

function fade_alert(alert_val){
  $("<div class='alert alert-danger col-xs-offset-2 col-xs-8 col-md-offset-2 col-md-6 fade in alert-fixed'>"+alert_val+"</div>").appendTo(".content-area").delay(1000).fadeOut("slow");         
}
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
//
//VARIABLE INITIALISATION FOR TIME PICKER AND STORING DATAS
//
//  
var session_data;
var activity_table_temp;
var tableData;
var month_total_pages;
var month_total_hrs;
var month="";
var year="";
var emp_user_id="";
var emp_name="";  
var toSearch="";
var currentTime = new Date();
var currentYear=currentTime.getFullYear();
var currentDate=currentTime.getDate();
var currentMonth=getCurrentMonth();
var todayDate=currentMonth+"-"+currentDate+"-"+currentYear;
var monthNames = {"JAN": "01","FEB": "02","MAR": "03","APR": "04","MAY": "05","JUN": "06","JUL": "07","AUG": "08","SEP": "09","OCT": "10","NOV": "11","DEC": "12"};

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
function getCurrentMonth(){  
  var mon = currentTime.getMonth() + 1;   
  return (mon!==11 && mon !==12 && mon !==10) ?  ""+0+mon : mon ;
}

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
  
var activity_columns=[
  {
    "field": "date",
    "title": "DATE"},
  {
    "field": "day",
    "title": "DAY"},
  {
    "field": "total_pages",
    "title": "PAGES"},
  {
    "field": "total_time",
    "title": "HOURS"}];

var details_columns = [
  [{
    "title": "TIME",
    "colspan": 3,
    "rowspan": 1,
    "align":"center"
  }, {
    "title": "PAGES",
    "colspan": 3,
    "rowspan": 1,
    "align":"center"
  },{
    "field": "journal_id",
    "title": "JOURNAL/BOOK ID",
    "colspan": 1,
    "rowspan": 2,
    "align":"center"
  }], 

  [{
    "field": "from",
    "title": "FROM",
    "colspan": 1,
    "rowspan": 1
  }, {
    "field": "to",
    "title": "TO",
    "colspan": 1,
    "rowspan": 1
  }, {
    "field": "single_time_total",
    "title": "TOTAL",
    "colspan": 1,
    "rowspan": 1
  }, {
    "field": "pro",
    "title": "PRO",
    "colspan": 1,
    "rowspan": 1
  }, {
    "field": "qc",
    "title": "QC",
    "colspan": 1,
    "rowspan": 1
  }, {
    "field": "single_pages_total",
    "title": "TOTAL",
    "colspan": 1,
    "rowspan": 1
  }]
];

// FILTER TABLE BUTTONS
// 
//month filter 
//
// $(document).on("click",".month_filter_li li a",function(){
//   $(".month_filter_li").css("z-index","9999");
// });

$(document).on("click",".month_filter_li li a",function(){
      if(($("#emp").is(':visible')) && (emp_user_id==="")){
          alert("Please select employee first!");
      }else{        
        $('.month_name').html($(this).text()+ " <span class='caret'></span>");
        month= monthNames[$(this).text()];       
        filterTable();
      }         
});
//year filter
$(document).on("click",".year_filter_li li a",function(){      
      if(($("#emp").is(':visible')) && (emp_user_id==="")){
          alert("Please select employee first!");
      }else{ 
         $('.year_name').html($(this).text()+ " <span class='caret'></span>");
         year=$(this).text();
         filterTable();     
      }
});

//employee filter
$(document).on("click",".emp_filter_li li a",function(){

       $('.emp_name').html($(this).text()+ " <span class='caret'></span>");
       emp_user_id=$(this).attr("data-id");
       emp_name=$(this).text();
       fillTable(emp_user_id,"admin_view_activity.php");            
       filterTable();
});
//filter clear
$(document).on("click",".clear_filter",function(){
        $.each(monthNames, function (k, v) {
            if (v === currentMonth)  $('.month_name').html(k + " <span class='caret'></span>"); 
        });
        $('.year_name').html(currentYear+" <span class='caret'></span>");
          
        month="";
        year="";
        toSearch="";
        filterTable();

 });
function clear_dropdown(){
       var monthname_in_dropdown= month!=="" ? month : currentMonth;

       $.each(monthNames, function (k, v) {
            if (v === monthname_in_dropdown)  $('.month_name').html(k + " <span class='caret'></span>"); 
        });
        if(year!==""){
            $('.year_name').html(year+" <span class='caret'></span>");
        }else{
            $('.year_name').html(currentYear+" <span class='caret'></span>");
        } 

        if($("#emp").is(':visible')){
              if(emp_user_id!==""){
                 $('.emp_name').html(emp_name+" <span class='caret'></span>");
              }else{
                  $('.emp_name').html("EMPLOYEES <span class='caret'></span>");
              }
        } 
      
}

 //filter method
function filterTable(){ 
        month_total_pages=0;
        month_total_hrs=0;
        month_total_hrs_array=[];
       
      if(month ==="") month=currentMonth;
      if(year ==="") year=currentYear;      
      toSearch="-"+month+"-"+year;      
      $('#activity_table').bootstrapTable('load', $.grep(tableData, function (row) {
              if(row.date.indexOf(toSearch) !== -1){                
                month_total_pages +=row.total_pages;         
                month_total_hrs_array.push(row.total_time);
                return true;
              }             
      }));    

       if(outputs[1]!=="admin"){
           month_total_hrs=sumUpMonthTime(month_total_hrs_array);
           for(var key in monthNames){
              if(monthNames[key]===month) $(".month_year").html("<b>"+key+"  -  "+year+"</b>");
           }       
           $(".month_total_time").html("<b>TOTAL HOURS: </b>"+month_total_hrs);
           $(".month_total_pages").html("<b>TOTAL PAGES: </b>"+month_total_pages);
       }
  } 

function sumUpMonthTime(times){
  
  var minutes=0;
  for (var i = 0; i < times.length; i++) {
    var time=times[i].replace(" hrs","");   
    var splitted=time.split(":");
    minutes =minutes + Number(splitted[0] * 60) + Number(splitted[1]);    
  }  
  
  var hours = Math.floor(minutes/60);
  minutes -= hours * 60; 
  hours=hours.toString().length >=2 ? hours : "0"+hours;
  minutes=minutes.toString().length===2 ? minutes : "0"+minutes;
  return hours+":"+minutes+" hrs";
}
 
$(".viewactivity_nav").on("click",function(){
        
        if(outputs[0]==="user_session"){          
          fillTable("user","view_activity.php");
        }else if(outputs[0]==="admin_session"){          
              if(emp_user_id !==""){
                fillTable(emp_user_id,"admin_view_activity.php"); 
              }else{
                fillDropdown();
              }                      
        }else{
          fade_alert("PLEASE LOG IN TO VIEW ACTIVITY!");
        }   
    
  });

function fillTable(get_name,file_name){
  $.getJSON('ajax_response.php',{fulldata:get_name}).done(function(data){
                 
                $.get(file_name, function(contentdata){     
                  $(".content-area").empty().html(contentdata);
                  tableData=data;
                  fillDropdown();                  
                  $("#activity_table").bootstrapTable({
                              columns:activity_columns 
                           });
                        filterTable();
                        $('#details_table').bootstrapTable({
                              columns:details_columns                
                        });    
                         
                });           
                
                }).fail(function(){                  
                  fade_alert("ERROR IN LOADING ACTIVITY");
                });
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
          var details_data=createDetailsData(row); 
          $("#details_table_modal").modal();
          $("#date_day").html(row.date+"  "+row.day);
          $('#details_table').bootstrapTable("load",details_data);   
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

  function fillDropdown(){

      clear_dropdown();
       //month
       var monthNames_dropdown = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        
          var li_month="";
         for (var mon = 0 ; mon < monthNames_dropdown.length; mon++){
             li_month += "<li><a href='#'>"+ monthNames_dropdown[mon] +"</a></li>";
         }
        //year
       var start = 2015;
       var end = new Date().getFullYear();
       var li_year = "";
       for(var year = start ; year <=end; year++){
           li_year += "<li><a href='#'>"+ year +"</a></li>";
       }
       $(".month_filter_li").html(li_month);
       $(".year_filter_li").html(li_year);

       if($("#emp").is(':visible')){
          var emp_name_li="";
          $.getJSON('ajax_response.php',{emp_dropdown:"emp"}).done(function(data){
              if(data==="No Employees"){
                  emp_name_li = "<li><a href='#'>"+data+"</a></li>";
              }else{
                  $.each(data, function (key, val) {                    
                    emp_name_li += "<li><a href='#' data-id='"+val.user_id+"'>"+ val.Name +"</a></li>";
                  });
              }  
              $(".emp_filter_li").html(emp_name_li);
              
          });  
       } 
 
}



//ACTIVITY TABLE ENDS



   
});  //end of main document.ready function

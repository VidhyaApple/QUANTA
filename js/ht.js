$(document).ready(function(){

function showPaddingBottomMobileView(){
    if($('nav.navbar-fixed-bottom').is(':visible')){
           $("body").css("padding-bottom","50px"); 
         }else{$("body").css("padding-bottom","0px"); }
} 
showPaddingBottomMobileView();
var session_data;

// //ACITIVTIY TABLE
var activity_table_temp;
var tableData;
var month_total_pages;
var month_total_hrs;
var month="";
var year="";
var toSearch="";
var currentTime = new Date();
var currentYear=currentTime.getFullYear();
var currentDate=currentTime.getDate();
var currentMonth=getCurrentMonth();
var todayDate=currentMonth+"-"+currentDate+"-"+currentYear;
var monthNames = {"JAN": "01","FEB": "02","MAR": "03","APR": "04","MAY": "05","JUN": "06","JUL": "07","AUG": "08","SEP": "09","OCT": "10","NOV": "11","DEC": "12"};

//CURRENT TIME
function getTime( ) {
   
  var h = (currentTime.getHours() % 12) || 12; // show midnight & noon as 12
  return (
    ( h < 10 ? '0' : '') + h +
    ( currentTime.getMinutes() < 10 ? ':0' : ':') + currentTime.getMinutes() +
                // optional seconds display
    // (currentTime.getSeconds() < 10 ? ':0' : ':') + currentTime.getSeconds() + 
    ( currentTime.getHours() < 12 ? ' AM' : ' PM' )
  );
  
}
function getCurrentMonth(){  
  var mon = currentTime.getMonth() + 1;   
  return (mon!==11 && mon !==12 && mon !==10) ?  ""+0+mon : mon ;
}


//hide footer when input box is on focus
$(document).on('focus', 'input', function() {
//alert("hide");
    $("nav.navbar-fixed-bottom").removeClass("visible-xs").addClass("hidden-xs hidden-md hidden-lg");
    showPaddingBottomMobileView();
    
});

//show footer when input is NOT on focus
$(document).on('blur', 'input', function() {     
    $("nav.navbar-fixed-bottom").removeClass("hidden-xs hidden-md hidden-lg").addClass("visible-xs");
    showPaddingBottomMobileView();   
 
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
      minuteStep:1,
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
      
      minuteStep:1,
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
  
function checkSession(handleData){  
      $.ajax({url:"session_check.php",success:function(data){
        handleData(data);
      }
    }); 

 }

// function loadFile(file){
//   $('#img-load').show();
//   $(".content-area").hide();
//   $.get(file, function(contentdata){ 

//     $(".content-area").delay(5000).empty().html(contentdata).promise().done(function(){
//       $('#img-load').hide();
//       $(".content-area").show();
//     });
//   });
//   if(file==="entry.php"){
//     showTodayData();}
//   month="";
//     year="";
//     toSearch="";
// }
function loadFile(file){
  //$('#img-load').show();
  //$(".content-area").hide();
  $.get(file, function(contentdata){ 

    $(".content-area").empty().html(contentdata);
  });
  if(file==="entry.php"){
    showTodayData();}
  month="";
    year="";
    toSearch="";
}

checkSession(function(output){  
  if(output==="set"){
    loadFile("entry.php");
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
$(".home_nav").on("click",function(){
         checkSession(function(output){  
            if(output==="set"){
                loadFile("entry.php");     
             }else{
                loadFile("form.html");
              }
     });         
}); 

 $(".logout_nav").on("click",function(){
    var logout_alert="";
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
$(document).on("click","#month_filter_li li a",function(){
  $("#month_filter_li").css("z-index","9999");
});
$(document).on("click","#month_filter_li li a",function(){
        $('#month_name').html($(this).text()+ " <span class='caret'></span>");
        month= monthNames[$(this).text()];       
        filterTable();       
});
//year filter
$(document).on("click","#year_filter_li li a",function(){
       $('#year_name').html($(this).text()+ " <span class='caret'></span>");
       year=$(this).text();
       filterTable();
});
//filter clear
$(document).on("click","#clear_filter",function(){
        $('#month_name').html("MONTH <span class='caret'></span>");  
        $('#year_name').html("YEAR <span class='caret'></span>");
        
        month="";
        year="";
        toSearch="";
        filterTable();

 });
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
       
       month_total_hrs=sumUpMonthTime(month_total_hrs_array);
       for(var key in monthNames){
          if(monthNames[key]===month) $(".month_year").html("<b>"+key+"  -  "+year+"</b>");
       }       
       $(".month_total_time").html("<b>TOTAL HOURS: </b>"+month_total_hrs);
       $(".month_total_pages").html("<b>TOTAL PAGES: </b>"+month_total_pages);
       
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
  checkSession(function(output){  
        if(output!=="set"){
          fade_alert("PLEASE LOG IN TO VIEW ACTIVITY!");}
        else{        
              $.getJSON('ajax_response.php',{fulldata:"user"}).done(function(data){
                 
                $.get("view_activity.php", function(contentdata){     
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
     });
  });

function showTodayData(){
  $.getJSON('ajax_response.php',{todaydata:"not_user"}).done(function(data){
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
       $("#month_filter_li").html(li_month);
       $("#year_filter_li").html(li_year);
 
}



//ACTIVITY TABLE ENDS

    //log in/sign up form
    $(document).on('submit', '.form_login_signup', function(){
     if(!($("#em_pwd_error").hasClass("hide"))){
        $("#em_pwd_error").addClass("hide");
     }
   $.post('submit.php', $(this).serialize()).done(function(data){
        
      if(data=="inserted"){ 
        $(".panel-group").fadeOut('slow', function(){   
        fade_alert_loadfile('Signed up Successfully!',"entry.php");});        

    }else if(data=="email_exists"){
            $("#em_error").removeClass("hide");

     }else if(data=="loggedin"){
      $(".panel-group").fadeOut('slow', function(){
         fade_alert_loadfile("Logged in successfully","entry.php");
      });   
       
     }else if(data=="loggedin_dont_match"){
              $("#em_pwd_error").removeClass("hide");

     }else{
       fade_alert("FAILED TO SUBMIT DATA!");
     }
    }).fail(function(){
      fade_alert('FAILED TO SUBMIT THE DATA. DATABASE ISSUE!');

      });
  return false;
   }); 

   

$(document).on('submit', '.form_entry', function(){

        
     if(($("input[name='pro_pages']").val()!=="") || ($("input[name='qc_pages']").val()!=="")){

   $.post('submit.php', $(this).serialize()).done(function(data){
        
      if(data=="record_inserted"){  
                fade_alert_loadfile("Saved successfully","entry.php");
       }else{       
        fade_alert("ERROR IN SUBMITTING RECORDS!");
       }

    }).fail(function(){
      fade_alert('FAILED TO SUBMIT THE DATA. DATABASE ISSUE!');

      });

   }else{fade_alert("PLEASE ENTER NO. OF PAGES!");} 

  return false;
   
   }); 



       //setup before functions
var typingTimer;                //timer identifier
var doneTypingInterval = 700;  //time in ms, 5 second for example
var $input = $('#pwd2');

//on keyup, start the countdown
$(document).on('keyup',$input, function () {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

//on keydown, clear the countdown 
$(document).on('keydown',$input, function () {
  clearTimeout(typingTimer);
});

//user is "finished typing," do something
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

   
  });
  

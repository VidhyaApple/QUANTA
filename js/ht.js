$(document).ready(function(){

$(document).on("click", "#from_time_span", function () {
    		$("#from_time").clockpicker({
    			twelvehour:true
    		});
            });

$(document).on("click", "#to_time_span", function () {
    		$("#to_time").clockpicker({
    			twelvehour:true
    		});
            });
               

function fade_alert(alert_val,filename){
	$("<div class='alert alert-success col-md-6 col-lg-6 centering fade in'>"+alert_val+"</div>").prependTo(".content-area").delay(1000).fadeOut("slow",function(){ 
		 $(".content-area").load(filename);});
		 	   
}
 $("#logout_nav").on("click",function(){
 		var logout_alert="";
 		$.ajax({url: 'logout.php', success: function(data){
		 		if(data==="logged_out"){
		 			logout_alert="Logged out successfully!";
		 		}else if(data==="no_sessions"){
		 			logout_alert="You haven't logged in yet!";
		 		}else{
		 			logout_alert="Some error in logging out!";
		 		}
		 		fade_alert(logout_alert,"form.html");
		 	}
 	     });
 	});

 $("#viewactivity_nav").on("click",function(){
 		
 		$.getJSON('calculate_records.php', function(data) { 
           alert(data);
           $obj=$.parseJSON(data);
          $(".content-area").html($obj[date]);
 		}).done(function(){
			alert("success");
 		}).fail(function(){
 			alert("error");
 		});
 	});

    //log in/sign up form
    $(document).on('submit', '.form_login_signup', function(){
		 
	 $.post('submit.php', $(this).serialize()).done(function(data){
    		
	 	  if(data=="inserted"){	
		 	  $(".panel-group").fadeOut('slow', function(){	  
			 	fade_alert('Signed up Successfully!',"entry.php");});		    

		}else if(data=="email_exists"){
            $("#em_error").removeClass("hide");

		 }else if(data=="loggedin"){
		 	$(".panel-group").fadeOut('slow', function(){
		 	   fade_alert("Logged in successfully","entry.php");
		 	});  	
		 	 
		 }else if(data=="loggedin_dont_match"){
              $("#em_pwd_error").removeClass("hide");

		 }else{
		 	alert(data);
             alert("Failed to submit the data   !");
		 }
	  }).fail(function(){
		  alert('Failed to submit the data! Database issue');

		  });
	return false;
	 }); 

$(document).on('submit', '.form_entry', function(){
	
     if(($("input[name='pro_pages']").val()!=="") || ($("input[name='qc_pages']").val()!=="")){

	 $.post('submit.php', $(this).serialize()).done(function(data){
    		
	 	  if(data=="record_inserted"){	
                fade_alert("Saved successfully","entry.php");
	 	   }else{	 	   	
	 	   	alert("Error in submitting records!");
	 	   }

	 	}).fail(function(){
		  alert('Failed to submit the data! Database issue');

		  });

	 }else{alert("Please enter number of pages!");}	

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
  
   

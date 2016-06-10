$(document).ready(function(){
 $("#home_nav").on("click",function(){
 	alert("This is a home nav");
 });
    //log in/sign up form
    $(document).on('submit', '.form_login_signup', function(){
	
	 
	 $.post('submit.php', $(this).serialize()).done(function(data){
    
	 	  if(data=="inserted"){	
	 	 $(".form_login_signup")[0].reset();
		 $(".form_login_signup").fadeOut('slow', function(){		   
		 	$(".content-area").fadeIn('slow', function(){
		 	   $(".content-area").load("html/entry.php",function(){
		 	   	   $("#alert_fadeout").html('Signed up Successfully!');
		 	   	   $("#alert_fadeout").removeClass("hidden");
		 	   		$("#alert_fadeout").delay(3000).fadeOut(2000);
		 	   });
		     });
		  });

		}else if(data=="email_exists"){

            $("#em_error").removeClass("hide");

		 }else if(data=="loggedin"){
		 	$(".form_login_signup")[1].reset();
		 	$(".form_login_signup").fadeOut('slow', function(){		   
		 	$(".content-area").fadeIn('slow', function(){
		 	   $(".content-area").load("html/entry.php",function(){
		 	   $("#alert_fadeout").html('Logged in Successfully!');
		 	    $("#alert_fadeout").removeClass("hidden");
		 	   	$("#alert_fadeout").delay(3000).fadeOut(2000);
		 	   });
		     });
		  });
		 }
		 else if(data=="loggedin_dont_match"){
              $("#em_pwd_error").removeClass("hide");
		 }

		 else{
             alert("Failed to submit the data!");
		 }
	  }).fail(function(){
		  alert('Failed to submit the data! Database issue');

		  });
	
	  return false;
		 }); 


       //setup before functions
var typingTimer;                //timer identifier
var doneTypingInterval = 700;  //time in ms, 5 second for example
var $input = $('#pwd2');

//on keyup, start the countdown
$input.on('keyup', function () {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

//on keydown, clear the countdown 
$input.on('keydown', function () {
  clearTimeout(typingTimer);
});

//user is "finished typing," do something
function doneTyping () {
       
  if($("#pwd").val()===$("#pwd2").val()){
        feedback_success("#confirm_password");
         $("button#form_submit").removeAttr("disabled");
   }else{
         feedback_error("#confirm_password");           	
         $("button#form_submit").prop("disabled","true");
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

   $("#logout_nav").on("click",function(){
 	alert("This is a logout nav");
 	$.ajax({type: "GET", url: "logout.php", success: function(data){
 		alert(data);
 	});
 });
   //   	$.ajax({
	  // 		url: 'logout.php',
	  // 		success: function(data) {
	  // 			alert("clicked2");
	  // 			if(data==="logged_out"){
	  //   			$(".content-area").load("form.php");
	  // 			}else if(data==="no_sessions"){
	  // 				$(".content-area").load("form.php");
	  // 			}else{
	  // 				alert("Error during logging out!");
	  // 			}
			// });
   //   	});
     
   // });
         
    
   });
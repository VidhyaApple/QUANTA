<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>Hours Tracker</title>
     <!-- bootstrap min css -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">

    
     <link rel="stylesheet" href="clockpicker/jquery-clockpicker.min.css"> 


    <link rel="stylesheet" type="text/css" href="css/ht.css">
    
</head>
<body>
<nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header ">
                <a class="navbar-brand" href="#">QuADS</a>
                <button class="navbar-toggle" data-toggle="collapse" data-target="#navbar_collapse">
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
            </div>
            <div class="collapse navbar-collapse" id="navbar_collapse" >
                <ul class="nav navbar-nav navbar-right">
                    <li data-toggle="collapse" data-target="#navbar_collapse"><a href="#" id="home_nav"><span class="glyphicon glyphicon-home"></span> Home</a></li>
                    <li data-toggle="collapse" data-target="#navbar_collapse"><a href="#" id="activity_nav"><span class="glyphicon glyphicon-eye-open"></span> View Activity</a></li>
                    <li data-toggle="collapse" data-target="#navbar_collapse" id="logout"><a href="#" id="logout_nav"><span class="glyphicon glyphicon-log-out"></span> Log out</a></li>
                </ul>
            </div>
        </div>
      </nav>


<div class="container">

<div class="content-area">
</div><!-- div-content area -end -->

</div>  <!-- div-container-end -->

<!-- SCRIPTS JS -->

<!-- jquery min js -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>


<!-- bootstrap min js -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>


<script src="clockpicker/jquery-clockpicker.min.js"></script>

<?php
if(isset($_SESSION["name"]) AND isset($_SESSION["email"])){?>
<script>
$(document).ready(function(){
$(".content-area").load("entry.php");
});
</script>
<?php }else{?>
<script>
$(document).ready(function(){
$(".content-area").load("form.html");
 
});
</script>
<?php } ?>
<!-- own js -->
<script type="text/javascript" src="js/ht.js"></script>
</body>
</html>
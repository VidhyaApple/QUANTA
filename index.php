<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>QuANTA</title>
     <!-- bootstrap min css -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.10.1/bootstrap-table.min.css">
    <link rel="stylesheet" href="css/rawgit_fixed_column.css">
    <link rel="stylesheet" type="text/css" href="css/bootstrap-timepicker.min.css">

    <link rel="stylesheet" type="text/css" href="css/ht.css">
    <style></style>
</head>
<body>
<nav class="navbar navbar-inverse navbar-fixed-top">
       
            <div class="navbar-header ">
                <a class="navbar-brand" href="#">QuANTA</a>
                <button class="navbar-toggle" data-toggle="collapse" data-target="#navbar_collapse">
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
            </div>  

            <div>
                <ul class="nav navbar-nav navbar-right visible-md visible-lg">
                    <li><a href="#" class="home_nav"><span class="glyphicon glyphicon-home"></span> Home</a></li>
                    <li class="tohide"><a href="#" class="viewactivity_nav"><span class="glyphicon glyphicon-eye-open"></span> View Activity</a></li>
                    <li><a href="#" class="logout_nav"><span class="glyphicon glyphicon-log-out"></span> Log out</a></li>
                </ul>
            </div>

            <div class="collapse navbar-collapse" id="navbar_collapse" >
                <ul class="nav navbar-nav navbar-right visible-xs visible-sm">
                    <li data-toggle="collapse" data-target="#navbar_collapse"><a href="#" class="home_nav" style="font-size:1.4em"><span class="glyphicon glyphicon-home"></span> Home</a></li>
                    <li data-toggle="collapse" data-target="#navbar_collapse" class="tohide"><a href="#" class="viewactivity_nav" style="font-size:1.4em"><span class="glyphicon glyphicon-eye-open"></span> View Activity</a></li>
                    <li data-toggle="collapse" data-target="#navbar_collapse"><a href="#" class="logout_nav" style="font-size:1.4em"><span class="glyphicon glyphicon-log-out"></span> Log out</a></li>
                </ul>           
        </div>
      </nav>

<div class="container scrollable">
<!-- <marquee class="text-danger visible-xs visible-sm" style="padding:1px;font-size:1.2em;font-weight:bold">QuANTA 1.2 is released. Go to "http://quotequads.co.in/quanta/download" to install. Ignore if updated.</marquee> -->
<div class="content-area">

</div><!-- div-content area -end -->

<div id="img-load" class="absolute-centering">
    <img class="load-img" src="images/clock.gif" />
    <p class="load-text"></p>
    
</div>


</div>  <!-- div-container-end -->
<nav class="visible-xs navbar navbar-inverse navbar-fixed-bottom">
              
                <ul class="nav navbar-nav navbar-right">
                    <li class="col-xs-4"><a href="#" class="home_nav" style="font-size:1.6em"><span class="glyphicon glyphicon-refresh"></span></a></li>
                    <li class="col-xs-4"><a href="#" class="viewactivity_nav" style="font-size:1.6em"><span class="glyphicon glyphicon-eye-open"></span></a></li>
                    <li class="col-xs-4"><a href="#" class="logout_nav" style="font-size:1.6em"><span class="glyphicon glyphicon-log-out"></span></a></li>
                </ul>
           
</nav>


<!-- SCRIPTS JS -->

<!-- jquery min js -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>

<!-- bootstrap min js -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

<!-- bootstrap table -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.10.1/bootstrap-table.min.js"></script>
<script type="text/javascript" src="js/fixed_column_table.js"></script>
<script type="text/javascript" src="js/export_table.js"></script>
<script type="text/javascript" src="js/plugin_export_table.js"></script>    

<!-- bootstrap timepicker -->
<script type="text/javascript" src="js/bootstrap-timepicker.min.js"></script>

<!-- own js -->
<script type="text/javascript" src="js/ht.js"></script>
</body>
</html>
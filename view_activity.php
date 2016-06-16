<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>Hours Tracker</title>
     <!-- bootstrap min css -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">    
     <link rel="stylesheet" href="css/tabulator.css"> 
    <link rel="stylesheet" type="text/css" href="css/ht.css">
    <style>
		/*Theme the table*/
		#example-table{
			background-color:#ccc;
			border: 1px solid #333;
		}

		/*Theme the header*/
		#example-table .tabulator-header {
			background-color:#333;
			color:#fff;
		}

		/*Theme the rows*/
		#example-table .tabulator-tableHolder .tabulator-table .tabulator-row{
			color:#fff;
			background-color: #666;
		}

		#example-table .tabulator-tableHolder .tabulator-table .tabulator-row:nth-child(even) {
			background-color: #444;
		}

	</style>
</head>
<body>
<div class="container">
<div id="example-table">
	
</div>
</div>

<!-- jquery min js -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
<!-- bootstrap min js -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script src="js/tabulator.js"></script>

<script type="text/javascript">
$(document).ready(function(){
	//create Tabulator on DOM element with id "example-table"
	$("#example-table").tabulator({
	    //height:"320px", // set height of table (optional)
	    fitColumns:true, //fit columns to width of table (optional)
	    columns:[ //Define Table COlumns
	        {title:"Name", field:"name", sorter:"string", width:150},
	        {title:"Age", field:"age", sorter:"number", align:"left", formatter:"progress"},
	        {title:"Favourite Color", field:"col", sorter:"string", sortable:false},
	        {title:"Date Of Birth", field:"dob", sorter:"date", align:"center"},
	    ],
	    rowClick:function(e, id, data, row){ //trigger an alert message when the row is clicked
	        alert("Row " + id + " Clicked!!!!");
	    },

	});

	var tabledata = [
    {id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
    {id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
    {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
    {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
    {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
	];

	//load sample data into the table
	$("#example-table").tabulator("setData", tabledata);
	$(window).resize(function(){
			$("#example-table").tabulator("redraw");
		});

});
</script>
</body>
</html>
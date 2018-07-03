<?php
//approve php page

$nid = $_POST['nid'];
$deleteNum = $_POST['deleteNum'];
console.log($deleteNum);

$connection=mysql_connect("localhost","4104a","4104a")
or print "connect failed because ".mysql_error();  

mysql_select_db("4104a",$connection)
or print "select failed because ".mysql_error();

	$myquery="SELECT ucfhunt FROM users WHERE nid='$nid'";
	$result=mysql_query($myquery,$connection) 
		 or print "Showlist query '$myquery' failed because ".mysql_error();
		 
	$row=mysql_fetch_array($result,MYSQL_ASSOC);
	$images=$row['ucfhunt'];
	
	$explodedBoard = explode(",",$images);
	
	$explodedBoard[$deleteNum]=0;
	$implodedBoard = implode(",",$explodedBoard);


	$myquery="UPDATE users SET ucfhunt='$implodedBoard' WHERE nid='$nid'";
	$result=mysql_query($myquery,$connection) 
		 or print "Showlist query '$myquery' failed because ".mysql_error();
		
?>
<?php
//deny php page

$nid = $_POST['nid'];
console.log($nid);

$notes = $_POST['notes'];
console.log($notes);

$connection=mysql_connect("localhost","4104a","4104a")
or print "connect failed because ".mysql_error();  

mysql_select_db("4104a",$connection)
or print "select failed because ".mysql_error();


	$myquery="UPDATE users SET progress=0 WHERE nid='$nid'";
	$result=mysql_query($myquery,$connection) 
		 or print "Showlist query '$myquery' failed because ".mysql_error();

	$myquery="UPDATE users SET completion=2 WHERE nid='$nid'";
	$result=mysql_query($myquery,$connection) 
		 or print "Showlist query '$myquery' failed because ".mysql_error();
		 
	$myquery="UPDATE users SET notes='$notes' WHERE nid='$nid'";
	$result=mysql_query($myquery,$connection) 
		 or print "Showlist query '$myquery' failed because ".mysql_error();
		 
		 
	//remake the selector with only names that have not been reviewed
	
	echo "<p>Select User: <select name=\"selectUser\" id=\"selectUser\">";
	
	$myquery="SELECT nid FROM users WHERE progress=1";
	$result=mysql_query($myquery,$connection) 
		 or print "Showlist query '$myquery' failed because ".mysql_error();

	while ($row=mysql_fetch_array($result,MYSQL_ASSOC))
	{ 
		$nid=$row['nid']; 
		echo "<option value=\"$nid\">$nid</option>";
	}		

	echo "</select></p><p><input type=\"button\" id=\"nid\" value=\"Display Board\" onclick=\"displayBoard()\" /></p>";

?>
<?php
//approved php page

$connection=mysql_connect("localhost","4104a","4104a")
or print "connect failed because ".mysql_error();  

mysql_select_db("4104a",$connection)
or print "select failed because ".mysql_error();

	$myquery="SELECT nid FROM users WHERE completion=1";
	$result=mysql_query($myquery,$connection) 
		 or print "Showlist query '$myquery' failed because ".mysql_error();
		 
	echo "<h3>Approved List</h3>";

	while ($row=mysql_fetch_array($result,MYSQL_ASSOC))
		{ 
			$nid=$row['nid']; 
			echo "<p>".$nid."</p>";
		}	

?>
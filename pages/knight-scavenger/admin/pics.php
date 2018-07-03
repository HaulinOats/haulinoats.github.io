<?php
//approved php page

$nid = $_POST['nid'];

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
	//print_r($explodedBoard);
	
	for ($i=0; $i<16; $i++) {
		$realNum = $i+1;
		echo "<div><p>Question ".$realNum."</p><img src=\"".$explodedBoard[$i]."\" alt=\"img".$realNum."\" /></div>";
		echo "<p><input type=\"checkbox\" id=\"deleteBox".$i."\" name=\"delete\" value=\"delete".$i."\" />Delete Above Photo?</p>";
	}

	echo "<div><form>Notes: <input type=\"text\" name=\"notes\" id=\"notes\" /></form></div>";
	echo "<p><input type=\"button\" id=\"approveButton\" value=\"Approve User\" onclick=\"approve()\" /></p>";
	echo "<p><input type=\"button\" id=\"denyButton\" value=\"Deny User\" onclick=\"deny()\" /></p>";

?>
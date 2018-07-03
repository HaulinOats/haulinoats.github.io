<?php

//EMAIL TIME!!!!!!!!!!!
$nid = $_POST['nid'];

$connection=mysql_connect("localhost","4104a","4104a")
or print "connect failed because ".mysql_error();  

mysql_select_db("4104a",$connection)
or print "select failed because ".mysql_error();

$myquery="SELECT email FROM users WHERE nid='$nid'";
	$result=mysql_query($myquery,$connection) 
		 or print "Showlist query '$myquery' failed because ".mysql_error();
		 
	$row=mysql_fetch_array($result,MYSQL_ASSOC);
	$email=$row['email'];


// The message
$message = "Your Knight Scavenger Board has been approved!\n\nPlease do not reply to this message";

// In case any of our lines are larger than 70 characters, we should use wordwrap()
$message = wordwrap($message, 70);
$headers = 'From: knightscavenger@knightscavenger.com';

// Send
mail($email, 'Knight Scavenger Board Approved', $message, $headers);
//echo "<p>$email</p>";

?>
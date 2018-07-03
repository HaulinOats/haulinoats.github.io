<?php

//EMAIL TIME!!!!!!!!!!!
$nid = $_POST['nid'];

$connection=mysql_connect("localhost","4104a","4104a")
or print "connect failed because ".mysql_error();  

mysql_select_db("4104a",$connection)
or print "select failed because ".mysql_error();

$myquery="SELECT * FROM users WHERE nid='$nid'";
	$result=mysql_query($myquery,$connection) 
		 or print "Showlist query '$myquery' failed because ".mysql_error();
		 
	$row=mysql_fetch_array($result,MYSQL_ASSOC);
	$email=$row['email'];
	$notes=$row['notes'];


// The message
$message = "Your Knight Scavenger Board has been denied\nThe reason your board was denied was because: ".$notes."\nThe pictures that were incorrect were deleted and you may log back in to your account and re-upload the pictures that were not approved and removed.\nPlease do not reply to this message";

// In case any of our lines are larger than 70 characters, we should use wordwrap()
$message = wordwrap($message, 70);
$headers = 'From: knightscavenger@knightscavenger.com';

// Send
mail($email, 'Knight Scavenger Board Denied', $message, $headers);
//echo "<p>$email</p>";

?>
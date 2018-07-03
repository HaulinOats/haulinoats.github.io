<?php
	$mysqli = new mysqli('localhost','4104a','4104a','4104a');

	if($mysqli->error) {
		print "error";
	} else {
		print "working";
	}

	$result = $mysqli->query("select * from test limit 1");
	$row = $result->fetch_object();
	print $row->a;
?>

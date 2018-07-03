<?php
ob_start();
session_start();
include 'inc/dbconnect.php';
$nid=$_SESSION['nid'];
$id=$_GET['id'];
if(!$_SESSION['nid']){
			header('Location: http://brettdavidconnolly.com/apps/knight-scavenger/index.html');
		}
//Get board completion variable
$ucfhunt=mysql_query("SELECT ucfhunt FROM users WHERE nid='$nid'")or die('fail');
$board_completion = mysql_fetch_row($ucfhunt); 
$board_completion = $board_completion[0];

echo"<!DOCTYPE html>
<html>
<head>
	<meta content='IE=Edge;chrome=1' http-equiv='X-UA-Compatible'>
	<meta charset='utf-8'>
	<meta content='width=device-width, initial-scale=1.0' 	name='viewport'>
	<title>Upload - Knight Scavenger</title>
	<link media='screen' rel='stylesheet' href='css/columnal.css' />
	<link media='screen' rel='stylesheet' href='css/styles.css' />
</head>
<script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js'></script>

<body>
	<div class='row'>
		<div class='pre_1 col_11 omega'>
			<img src='img/possumtitle.png' alt='KNIGHT SCAVENGER' />
		</div>
	</div>
	<div class='row'>
		<div class='pre_2 col_5 omega'>";	
echo "<div class='upload_info'>";
if ((($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/png")
|| ($_FILES["file"]["type"] == "image/pjpeg"))
&& ($_FILES["file"]["size"] < 1048576))
  {
  if ($_FILES["file"]["error"] > 0)
    {
    echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
    }
  else
    {
	//Get image type to append onto file name
	$type=split('/',$_FILES["file"]["type"]);
	$img_type=".".$type[1];
      move_uploaded_file($_FILES["file"]["tmp_name"],
      "/home6/brettdav/public_html/apps/knight-scavenger/ucfhunt/$nid/".$id.$img_type);
      echo "<p class='upload_msg'>File Uploaded Successfully</p></br>";
	  $explodedBoard = explode(',',$board_completion);
	  $explodedBoard[$id]="http://www.brettdavidconnolly.com/apps/knight-scavenger/ucfhunt/$nid/".$id.$img_type;
	  $board_completion = implode(',',$explodedBoard);
	  mysql_query("UPDATE users SET ucfhunt='$board_completion' WHERE nid='$nid'")or die('db fail');
	  header('Location:http://www.brettdavidconnolly.com/apps/knight-scavenger/myboard.php');
	  
    }
  }
else
  {
  echo "<p class='upload_msg'>Invalid file</p></br>";
  echo "<a class='buttonWhite padding_5' id='board_link' href='myboard.php'>My Board</a>";
  }
echo "</div></div></div></body></html>";
ob_flush();
?> 
 

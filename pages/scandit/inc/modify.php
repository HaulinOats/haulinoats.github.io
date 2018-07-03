<?php
session_start();
include 'dbconnect.php';
$list=$_POST['list'];
$list=implode('|',$list);
$username=$_POST['username'];
$sql = mysql_query("UPDATE users SET list_1='$list' WHERE username='$username'") or die('Update list query fail'); 
?>
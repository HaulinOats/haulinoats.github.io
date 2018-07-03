<?php
session_start();
include "dbconnect.php";
$username=$_SESSION['username'];
$sku=$_POST['sku'];
$sql = mysql_query("SELECT list_1 FROM users WHERE username='$username'") or die(mysql_error()); 
$numrows = mysql_fetch_row($sql);
$list=$numrows[0];
$split_list=explode("|",$list);
$arr = array_diff($split_list, array($sku));
$list=implode("|",$arr);
echo $list;
$query="UPDATE users SET list_1='$list' WHERE username='$username'";
$sql = mysql_query($query) or die(mysql_error());
?>
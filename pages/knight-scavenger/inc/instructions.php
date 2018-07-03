<?
session_start();
include 'dbconnect.php';
$nid=$_SESSION['nid'];
mysql_query("UPDATE users SET instructions='1' WHERE nid='$nid'")or die('db fail');
?>
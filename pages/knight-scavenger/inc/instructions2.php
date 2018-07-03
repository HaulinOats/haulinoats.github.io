<?
session_start();
include 'dbconnect.php';
$nid=$_SESSION['nid'];
mysql_query("UPDATE users SET instructions='0' WHERE nid='$nid'")or die('db fail');
?>
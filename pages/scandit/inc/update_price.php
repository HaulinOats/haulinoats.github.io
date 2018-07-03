<?php
session_start();
include "dbconnect.php";
$price=$_POST['new_price'];
$id=$_POST['id'];
$store=$_SESSION['store'];
echo $price.' '.$id.' '.$store;
$query="UPDATE products SET ".$store."_p=".$price." WHERE sku=".$id;
$sql = mysql_query($query) or die(mysql_error());
?>
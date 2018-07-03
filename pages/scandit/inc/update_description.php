<?php
session_start();
include "dbconnect.php";
$description=$_POST['description'];
$id=$_POST['id'];
echo $id.' '.$description;
$query="UPDATE products SET name='".$description."' WHERE sku=".$id;
$sql = mysql_query($query) or die(mysql_error());
?>
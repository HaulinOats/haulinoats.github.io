<?php
session_start();
include 'dbconnect.php';
$upc=$_POST['upc'];
$item2=$_POST['scan_item'];
$item=str_replace("'","",$item2);
$img=$_POST['scan_img'];
$price=$_POST['scan_price'];
$store=$_SESSION['store'];
$username=$_SESSION['username'];
if($store="walmart"){
	$sql = mysql_query("INSERT INTO `products`(`sku`, `name`, `img_url`, `walmart_p`, `target_p`, `publix_p`, `winndixie_p`) VALUES ('".(string)$upc."','$item','$img','$price','','','')");
}
else if($store="target"){
	$sql = mysql_query("INSERT INTO `products`(`sku`, `name`, `img_url`, `walmart_p`, `target_p`, `publix_p`, `winndixie_p`) VALUES ('".(string)$upc."','$item','$img','','$price','','')");
}
else if($store="publix"){
	$sql = mysql_query("INSERT INTO `products`(`sku`, `name`, `img_url`, `walmart_p`, `target_p`, `publix_p`, `winndixie_p`) VALUES ('".(string)$upc."','$item','$img','','','$price','')");
}
else if($store="winndixie"){
	$sql = mysql_query("INSERT INTO `products`(`sku`, `name`, `img_url`, `walmart_p`, `target_p`, `publix_p`, `winndixie_p`) VALUES ('".(string)$upc."','$item','$img','','','','$price')");
}
$sql = mysql_query("SELECT list_1 FROM users WHERE username='$username'") or die(mysql_error()); 
$numrows = mysql_fetch_row($sql);
$list=$numrows[0];
$split_list=explode("|",$list);
if(in_array($upc,$split_list)){
	echo "in array";
}
else
{
	if($list!=''){
		array_push($split_list,$upc);
		$list=implode("|",$split_list);
	}else{
		$list=$upc;
	}
	$sql = mysql_query("UPDATE users SET list_1='$list' WHERE username='$username'") or die(mysql_error());	
}
?>
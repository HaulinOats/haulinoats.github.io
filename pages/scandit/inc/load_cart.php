<?php
session_start();
$username=$_SESSION['username'];
$store=$_POST['store'];
$_SESSION['store']=$store;
if($store=="walmart"){$arraykey=3;}elseif($store=="target"){$arraykey=4;}elseif($store=="publix"){$arraykey=5;}elseif($store=="winndixie"){$arraykey=6;}
include 'dbconnect.php';
$result = mysql_query("SELECT list_1 FROM users WHERE username='$username'") or die('List select query fail');
$list_item = mysql_fetch_row($result);
$list_item = $list_item[0];
$split_list=explode('|',$list_item);
$count=count($split_list);
$xml = new SimpleXMLElement("<cart></cart>");
foreach($split_list as $value){
	$result = mysql_query("SELECT * FROM products WHERE sku='$value'") or die('List select query 2 fail');
	$list_product = mysql_fetch_row($result);
	$product = $xml->addChild('product');
	$product->addChild('sku',$value);
	$product->addChild('name',$list_product[1]);
	$product->addChild('description',$list_product[2]);
	$product->addChild('price',$list_product[$arraykey]);
}
$xml->addChild('cart_contents',$list_item);
Header('Content-type: text/xml');
echo $xml->asXML();
?>
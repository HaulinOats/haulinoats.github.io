<?php 
$location=$_POST['location'];
$name=$_POST['name'];

$url="api.eventful.com/rest/events/search";
$url.="?app_key=Cfxsx2VQK5Cp2bGc";
$url.="&keywords=".$_POST['name'];
$url.="&location=".$_POST['location'];
$url.="&date=Future";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$contents = curl_exec ($ch);
curl_close ($ch);

$xmlObject=simplexml_load_string($contents);
header('Content-Type: text/xml');	     
print $xmlObject->asXML();


?>
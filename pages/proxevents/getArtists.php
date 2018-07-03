<?php 
$username=$_POST['username'];
$url="http://ws.audioscrobbler.com/2.0/?method=user.gettopartists";
$url.="&user=".$username;
$url.="&api_key=e16677780c2f53ecdd98c13e8684136b";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$contents = curl_exec ($ch);
curl_close ($ch);

$xmlObject=simplexml_load_string($contents);
header('Content-Type: text/xml');	     
print $xmlObject->asXML();

?>

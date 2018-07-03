<?php
$upc=$_POST['upc'];
$url='http://www.searchupc.com/handlers/upcsearch.ashx?request_type=3&access_token=5F2409DF-303A-4537-A5B2-98B7366E7EA6&upc='.$upc;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$contents = curl_exec ($ch);
curl_close ($ch);

print($contents);
?>
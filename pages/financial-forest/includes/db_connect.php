<?
$dbname='brettdav_financial_forest';
$dbusername="brettdav_admin";
$dbpw="lisa84";
/*$dbname="financial_forest";
$dbusername="financialun";
$dbpw="financialpw";*/

	$mysqli = new mysqli('localhost', $dbusername , $dbpw, $dbname);
	if($mysqli->connect_error) {
		print "Error connecting! Message:".$mysqli->connect_error;
	}
?>
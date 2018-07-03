<?php
// askexchange ($getString)
//
// The parameter '$getString' must
// be formatted as login=xxx&password=yyy&action=zzz&www, where
//
// xxx is a user ID for the exchange system
// yyy is the password associated with that person
// zzz is one of the acceptable action commands (see documentation)
// www is any necessary information for that action command
//

/*=======================================================================
	askExchange() :: Main communication with bank exchange
		- returns XMLObject
  =======================================================================*/
function askExchange($getString)
{
	//use this URL during the testing of your Exchange front-end
	$targetURL = "https://regmaster3.com/sandbox/sandbox.php";
			
	// URL encode: keep blank spaces from screwing things up
    $combinedURL = "$targetURL?$getString";
    $ch = curl_init();
    // Set URL
    if (!curl_setopt($ch, CURLOPT_URL, $combinedURL)) { print "Failed to URL encode: $combinedurl"; }
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $outputobject = curl_exec($ch); 
	return $outputobject;
}



/*=======================================================================
	checkUser() :: User bank account validation
		- returns Boolean
  =======================================================================*/
function checkUser($u, $p) {
	// Set the user login and pass
	$user1="login=$u&password=$p";
	
	// Set the GET string using login info to make the call to validate
	$gs="$user1&action=validateperson";
	$XMLresponse=askExchange($gs);
	
	// Transform the XML into an object and view its properties.
	$object1=simplexml_load_string($XMLresponse);
	
	// Set object properties to separate variables
	$caption = $object1->caption;
	$responseCode = $object1->responsecode;
	
	// If responseCode is "ok", then return true
	if($responseCode == 'ok') {
		return true;
	}
	else {
		return false;
	}
}



/*=======================================================================
	getBalance() :: Retrieve user bank account balance
		- returns int
  =======================================================================*/
function getBalance($u, $p) {
	// Set the user login and pass
	$user1 = "login=$u&password=$p";
	
	// Set the GET string using login info to make the call for balances
	$gs = "$user1&action=balances";
	$XMLresponse = askExchange($gs);

	// Transform the XML into an object and view its properties.
	$object1 = simplexml_load_string($XMLresponse);
	
	// Set object properties to separate variables
	$caption = $object1->caption;
	$responseCode = $object1->responsecode;
	$balances = $object1->balances;
	
	// If responseCode is "ok", then return balance amount
	if($responseCode == 'ok') {
		return (int)$balances->balance->amount;
	}
	else {
		print "Error reading balance for $u";
		return 0;
	}
}



/*=======================================================================
	getTransactions() :: Retrieve user bank account transactions
		- returns SimpleXMLObject
  =======================================================================*/
function getTransactions($u, $p) {
	// Set the user login and pass
	$user1 = "login=$u&password=$p";
	
	// Set the GET string using login info to make the call for balances
	$gs="$user1&action=transactions";
	$XMLresponse = askExchange($gs);

	// Transform the XML into an object and view its properties.
	$object1 = simplexml_load_string($XMLresponse);
	
	// Set object properties to separate variables
	$caption = $object1->caption;
	$responseCode = $object1->responsecode;
	$tx = $object1->transactions;
	
	// If responseCode is "ok", then return balance amount
	if($responseCode == 'ok') {
		return $tx;
	}
	else {
		print "Error reading transactions for $u";
		return 0;
	}
}

?>

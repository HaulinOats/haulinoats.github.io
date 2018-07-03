<?php
session_start();
$username=$_POST['username'];
$password=$_POST['password'];

if($username&&$password){
include 'dbconnect.php';

$query=mysql_query("SELECT * FROM users WHERE username='$username'");
$numrows = mysql_num_rows($query);

	if($numrows!=0){
		while($row=mysql_fetch_assoc($query)){
			$dbusername=$row['username'];
			$dbpassword=$row['password'];
			$type=$row['type'];
		}
			
		if(strtoupper($username)==strtoupper($dbusername)&&md5($password)==$dbpassword){
			$_SESSION['username']=$username;
			if($_SESSION['username']=='admin'){
				print("<div id='admin'>$username</div>");
			}else{
				print("<div id='member'>$username</div>");
			}
			
		}else{
		echo "<p>Incorrect password</p>";
		}	
	}else{
	echo "<p>User not found</p>";
	}
}else{
echo "<p>Please enter username and password</p>";	
}

?>
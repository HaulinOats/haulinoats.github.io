<?php
session_start();
$nid=$_POST['nid'];
$password=$_POST['password'];

if($nid&&$password){
include 'dbconnect.php';

$query=mysql_query("SELECT * FROM users WHERE nid='$nid'");
$numrows = mysql_num_rows($query);

	if($numrows!=0){
		while($row=mysql_fetch_assoc($query)){
			$dbnid=$row['nid'];
			$dbpassword=$row['pass'];
			$type=$row['type'];
		}
			
		if(strtoupper($nid)==strtoupper($dbnid)&&md5($password)==$dbpassword){
			if(strtoupper($type)=='ADMIN'){
				echo "<center><a href='admin.php' class='buttonYellow'>Admin Page</a>";
				echo "<a class='buttonYellow' href='#' id='logout'>Logout</a></center>";
			}
			else{
				echo "<p>Welcome, ".$nid."</p>";
				echo "<center><a class='buttonYellow' href='./myboard.php'>My Board</a>";
				echo "<a class='buttonYellow' href='#' id='logout'>Logout</a></center>";
			}
			$_SESSION['nid']=$nid;
			
		}else{
		echo "<p>Incorrect password</p>";
		}	
	}else{
	echo "<p>User not found</p>";
	}
}else{
echo "<p>Please enter NID and password</p>";	
}

?>
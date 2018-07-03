<?php
$username=mysql_escape_string(strip_tags($_POST['r_username']));
$password=mysql_escape_string(strip_tags($_POST['password']));
$password2=mysql_escape_string(strip_tags($_POST['password2']));
$email=mysql_escape_string(strip_tags($_POST['email']));
if($username&&$password&&$password2&&$email){
	//see if passwords match
	if($password==$password2){
		//check Username length
		if(strlen($username)<4||strlen($username)>25){
			echo "<p class='regerror'>Username is too long/short!</p>";
		}
		else{
			//check password length
			if(strlen($password)>25||strlen($password)<5){
				echo "<p class='regerror'>Password is too long/short!</p>"; 
			}
			else if(!preg_match("/^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z][0-9a-zA-Z-]+\.)+[a-zA-Z]{2,6}$/i", $email)){  
				echo "<p class='regerror'>Incorrect Email Format!</p>";
			}
			else{  
			//register user	
			$password=md5($password);
			include("dbconnect.php");
			$registerquery=mysql_query("INSERT INTO `users`(`id`, `username`, `password`,`type`, `email`, `points`, `info`, `list_1`, `list_2`, `list_3`, `list_4`) VALUES ('','$username','$password','member','$email','','0','','','','')")or die("<p class='regerror'>Email/Username taken!</p>");
			
				echo "<p class='regerror'>You have been registered!</p>";
				echo "<p class='regerror'><a href='./home.php'>Back to Login</a></p>";
			}
		}
	}
	else{
		echo "<p class='regerror'>Passwords don't match!</p>";
	}
}
else{
//error message if fields not filled in
echo "<p class='regerror'>Please fill in all fields</p>";	
}
?>
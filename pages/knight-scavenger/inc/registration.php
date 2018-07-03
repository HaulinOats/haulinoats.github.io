<?php
$nid=mysql_escape_string(strip_tags($_POST['nid']));
$password=mysql_escape_string(strip_tags($_POST['password']));
$password2=mysql_escape_string(strip_tags($_POST['password2']));
$email=mysql_escape_string(strip_tags($_POST['email']));
if($nid&&$password&&$password2&&$email){
	//see if passwords match
	if($password==$password2){
		//check NID length
		if(strlen($nid)!=8){
			echo "<p class='regerror'>NID is too long/short!</p>";
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
			$date=date("m-d-Y G:i:s");
			$registerquery=mysql_query("INSERT INTO users VALUES('','member','$nid','$email','$password','$date','0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0','0','0','0','0')")or die("<p class='regerror'>Email/NID taken!</p>");
			
			if(mkdir("/home6/brettdav/public_html/apps/knight-scavenger/ucfhunt/$nid", 0777)){ 
   					echo "<p class='regerror'>Directory has been created successfully</p>"; 
			} 
			else { 
  				 echo "<p class='regerror'>Failed to create directory</p>"; 
			}
			
				echo "<p class='regerror'>You have been registered!</p>";
				echo "<p class='regerror'><a href='index.html'>Back to Login</a></p>";
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
<?  
include 'db_connect.php'; 
$username=mysql_escape_string(strip_tags($_POST['username']));
$password=mysql_escape_string(strip_tags($_POST['password']));
$password2=mysql_escape_string(strip_tags($_POST['password2']));
$email=mysql_escape_string(strip_tags($_POST['email']));
$firstname=mysql_escape_string(strip_tags($_POST['firstname']));
$lastname=mysql_escape_string(strip_tags($_POST['lastname']));
$phone=mysql_escape_string(strip_tags($_POST['phone']));
$carrier=mysql_escape_string(strip_tags($_POST['carrier']));
$device_id=$_POST['device_id'];
//print $username.'-'.$password.'-'.$password2.'-'.$email.'-'.$firstname.'-'.$lastname.'-'.$phone.'-'.$carrier;
if($username&&$password&&$password2&&$email&&$firstname&&$lastname&&$phone&&$carrier){
	//see if passwords match
	if($password==$password2){
		//check Username length
		if(strlen($username)<4||strlen($username)>25){
			echo "username-length";
		}
		else{
			//check password length
			if(strlen($password)>25||strlen($password)<5){
				echo "password-length"; 
			}
			else if(!preg_match("/^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z][0-9a-zA-Z-]+\.)+[a-zA-Z]{2,6}$/i", $email)){  
				echo "email";
			}
			/*else if(!preg_match("^([0-9\(\)\/\+ \-]*)$",$phone)){
				echo "phone";
			}*/
			else{  
			//register user	
			$password=md5($password);
			$registerquery=mysqli_query($mysqli,"INSERT INTO users(login, password, email, date_registered, first_name, last_name, account_type, cell_number, carrier, device_id, text_opt)VALUES('$username', '$password', '$email',NOW(),'$firstname','$lastname', 'savings' ,'$phone','$carrier','$device_id',1)")or die('db-fail');	
				echo "registered";
			}
		}
	}
	else{
		echo "pw-match";
	}
}
else{
//error message if fields not filled in
echo "fields";	
}
?>
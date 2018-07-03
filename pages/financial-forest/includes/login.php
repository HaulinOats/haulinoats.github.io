<?
$username=$_POST['username'];
$password=$_POST['password'];
if($username&&$password){
include 'db_connect.php';

$query=mysqli_query($mysqli,"SELECT * FROM users WHERE login='$username'") or die('fail');
$numrows = mysqli_num_rows($query);

	if($numrows!=0){
		while($row=mysqli_fetch_assoc($query)){
			$dbusername=$row['login'];
			$dbemail=$row['email'];
			$dbpassword=$row['password'];
			$dbuserid=$row['user_id'];
			$goal=$row['current_goal'];
			$firstname=$row['first_name'];
			$lastname=$row['last_name'];
			$cell=$row['cell_number'];
			$carrier=$row['carrier'];
			$instructions=$row['instructions'];
			$bank_name=$row['bank_name'];
			$bank_username=$row['bank_username'];
			$bank_token=$row['bank_token'];
			$account_type=$row['account_type'];
			$text_opt = $row['text_opt'];
		}
			
		if(strtoupper($username)==strtoupper($dbusername)&&md5($password)==$dbpassword){
				echo "success|".$dbusername."|".$dbuserid."|".$goal."|".$dbemail."|".$firstname."|".$lastname."|".$cell."|".$carrier."|".$instructions."|".$bank_username."|".$bank_token."|".$bank_name."|".$account_type."|".$text_opt;
		}else{
		echo "password";
		}	
	}else{
	echo "user";
	}
}else{
echo "fields";	
}
?>
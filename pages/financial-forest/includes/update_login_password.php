<?
$user_id=$_POST['user_id'];
$password=md5($_POST['password']);
include 'db_connect.php';
$goalupdate=mysqli_query($mysqli,"UPDATE users SET password='$password' WHERE user_id='$user_id'")or die('db-fail');
echo $user_id.":".$_POST['password'];
?>
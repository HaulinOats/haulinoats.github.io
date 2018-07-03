<?
$user_id=$_POST['user_id'];
include 'db_connect.php';

$instruction_update=mysqli_query($mysqli,"UPDATE users SET instructions='1' WHERE user_id='$user_id'")or die('db-fail');
echo $user_id;

?>
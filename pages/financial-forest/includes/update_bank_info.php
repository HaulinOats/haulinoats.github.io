<?php
$user_id=$_POST['user_id'];
$password=md5($_POST['password_1']);
$bank_name=$_POST['bank_name'];
$account_type=$_POST['account_type'];
$bank_username=$_POST['bank_username'];
include 'db_connect.php';
$goalupdate=mysqli_query($mysqli,"UPDATE users SET bank_password='$password',bank_name='$bank_name', account_type='$account_type', bank_username='$bank_username' WHERE user_id='$user_id'")or die('db-fail');
echo $user_id.":".$_POST['password_1'].":".$bank_name.":".$account_type.":".$bank_username;
?>
<?
include "db_connect.php";
$user_id=$_POST['user_id'];
$cushion_total=$_POST['cushion_total'];
$cushion_days=$_POST['cushion_days'];
echo $cushion_total.":".$cushion_days.":".$user_id;
$goalupdate=mysqli_query($mysqli,"UPDATE users SET savings_cushion='$cushion_total', deadline='$cushion_days' WHERE user_id='$user_id'")or die('update goal:db-fail');
?>
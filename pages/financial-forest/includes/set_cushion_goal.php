<?
$user_id=$_POST['user_id'];
$cushion_total=$_POST['cushion_total'];
$cushion_days=$_POST['cushion_days'];
$savings_balance=$_POST['savings_balance'];
$cushion_with_savings=$savings_balance+$cushion_total;
$cushion_daily_savings2=$cushion_total/$cushion_days;
$cushion_daily_savings=round($cushion_daily_savings2,2);
//$date=NOW();
echo $user_id.":".$cushion_total.":".$cushion_days.":".$cushion_with_savings.":".$cushion_daily_savings.":".$savings_balance;
include 'db_connect.php';
$registerquery=mysqli_query($mysqli,"INSERT INTO cushion_goals(user_id, cushion_total, cushion_date_set, cushion_days, cushion_daily_savings, cushion_with_savings, initial_savings_balance)VALUES('$user_id','$cushion_total',NOW(),'$cushion_days','$cushion_daily_savings','$cushion_with_savings','$savings_balance')")or die('db fail');	
echo $cushion_total.":".$cushion_days.":".$savings_balance.":".$cushion_with_savings.":".$cushion_daily_savings;
?>
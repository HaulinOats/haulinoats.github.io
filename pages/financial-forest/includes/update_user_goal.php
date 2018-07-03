<?
$goal_id=$_POST['goal_id'];
$user_id=$_POST['user_id'];
$savings_balance=$_POST['savings_balance'];
echo "fucking HEREHEHRHERHERHEHREH: ".$goal_id.":".$user_id.":".$savings_balance;
include 'db_connect.php';
$goalupdate=mysqli_query($mysqli,"UPDATE users SET current_goal='$goal_id',savings_balance='$savings_balance' WHERE user_id='$user_id'")or die('update goal:db-fail');
?>
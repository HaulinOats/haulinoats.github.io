<?php
$user_id=$_POST['user_id'];
include 'db_connect.php';
$query=mysqli_query($mysqli,"SELECT * FROM cushion_goals WHERE user_id='$user_id'") or die('fail');
$numrows = mysqli_num_rows($query);

	if($numrows!=0){
		while($row=mysqli_fetch_assoc($query)){
			$goal_id=$row['cushion_goal_id'];
			$cushion_total=$row['cushion_total'];
			$cushion_days=$row['cushion_days'];
			$cushion_date_set=$row['cushion_date_set'];
			$cushion_with_savings=$row['cushion_with_savings'];
			$cushion_daily_savings=$row['cushion_daily_savings'];
			$initial_savings_balance=$row['initial_savings_balance'];
		}
	}

echo $cushion_total."|".$cushion_days."|".$cushion_date_set."|".$cushion_with_savings."|".$cushion_daily_savings."|".$goal_id."|".$initial_savings_balance;
?>
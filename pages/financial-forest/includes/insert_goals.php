<?php
$user_id=$_POST['user_id'];
$goal_total=$_POST['goal_total'];
$goal_description=$_POST['goal_description'];
$goal_date=$_POST['goal_date'];
$goal_initial_balance="0";
include 'db_connect.php';
 $insert_query_goals = "INSERT INTO user_goals(user_id, goal_type, goal_total, goal_description, goal_date_set, goal_date, goal_initial_balance) VALUES ('$user_id','savings','$goal_total','$goal_description',NOW(),'$goal_date','$goal_initial_balance')";
	$insert_result_goals = $mysqli->query($insert_query_goals);
	if($mysqli->error) {
		print "Insert query failed: ".$mysqli->error;
	}
			
$query=mysqli_query($mysqli,"SELECT * FROM user_goals WHERE user_id='$user_id' AND completed='0'") or die('fail');
$numrows = mysqli_num_rows($query);
	if($numrows!=0){
		while($row=mysqli_fetch_assoc($query)){
			$goal_id=$row['goal_id'];
		}
	}		
$goalupdate=mysqli_query($mysqli,"UPDATE users SET current_goal='$goal_id' WHERE user_id='$user_id'")or die('db-fail');
echo $goal_id.":".$goal_total.":".$goal_description.":".$goal_date;
?>
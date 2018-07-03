<?php
include 'db_connect.php';
$user_id=$_POST['user_id'];
$query=mysqli_query($mysqli,"SELECT * FROM cushion_goals WHERE user_id='$user_id'") or die('fail');
$numrows = mysqli_num_rows($query);

	if($numrows!=0){
		while($row=mysqli_fetch_assoc($query)){
			$goal_id=$row['cushion_goal_id'];
		}
	}

$goalupdate=mysqli_query($mysqli,"UPDATE users SET goal_id='$goal_id' WHERE user_id='$user_id'")or die('db-fail');

echo $goal_id;

?>
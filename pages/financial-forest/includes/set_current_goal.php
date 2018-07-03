<?
$user_id=$_POST['user_id'];
include 'db_connect.php';
$query=mysqli_query($mysqli,"SELECT * FROM user_goals WHERE user_id='$user_id' AND status='0'") or die('fail');
$numrows = mysqli_num_rows($query);
	if($numrows!=0){
		while($row=mysqli_fetch_assoc($query)){
			$current_goal=$row['goal_id'];
			$current_goal=$row['goal_type'];
		}	
	}
$goal_update=mysqli_query($mysqli,"UPDATE users SET current_goal='$current_goal' WHERE user_id='$user_id'")or die('db-fail');
echo $current_goal;
?>
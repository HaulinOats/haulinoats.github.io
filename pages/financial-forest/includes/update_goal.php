<?php
$user_id=$_POST['user_id'];
$goal_total=$_POST['total'];
$goal_description=$_POST['description'];
$goal_id=$_POST['goal_id'];
$goal_date=$_POST['date'];
include 'db_connect.php';
if($goal_id=="0"){
	$registerquery=mysqli_query($mysqli,"INSERT INTO user_goals(user_id, goal_type, goal_total, goal_date_created, goal_description, goal_date, goal_initial_balance)VALUES('$user_id','$goal_total',NOW(),'$goal_description','$goal_date','$goal_initial_balance')")or die('db-fail');	
	
}
else{
	$goalupdate=mysqli_query($mysqli,"UPDATE user_goals SET goal_total='$goal_total',goal_description='$goal_description',goal_date='$goal_date',goal_date_set=NOW() WHERE status='0'")or die('db-fail');
/*$query=mysqli_query($mysqli,"SELECT goal_id FROM user_goals WHERE user_id='$user_id' AND status='0'") or die('fail');
$numrows = mysqli_num_rows($query);
	if($numrows!=0){
		while($row=mysqli_fetch_assoc($query)){
			$goal_id=$row['goal_id'];
		}
	}
	*/
}
echo $goal_total.":".$goal_description.":".$goal_date;

?>
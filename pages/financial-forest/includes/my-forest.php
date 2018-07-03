<?
$user_id=$_POST['user_id'];
//$user_id="1";
include 'db_connect.php';

$query=mysqli_query($mysqli,"SELECT * FROM user_goals WHERE user_id='$user_id' AND status=1") or die('fail');
$numrows = mysqli_num_rows($query);
	if($numrows!=0){
		while($row=mysqli_fetch_assoc($query)){
			echo $row['goal_total'].":".$row['goal_description'].":".$row['status'].":".$row['goal_date'].":".$row['final_balance'].":".$row['status']."<br>";
		}
	}
	
?>
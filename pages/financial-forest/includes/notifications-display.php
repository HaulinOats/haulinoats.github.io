<?php
$month=$_POST['month'];
$year=$_POST['year'];
$user_id=$_POST['user_id'];
$first_date=$year."-".$month."-01";
$month2=$month+1;
$last_date=$year."-".$month2."-01";
//echo "Month: ".$month." Year: ".$year."First Date: ".$first_date."Last Date: ".$last_date;
include 'db_connect.php';
$query=mysqli_query($mysqli,"SELECT * FROM notifications WHERE n_date BETWEEN '$first_date' AND '$last_date' AND user_id='$user_id'") or die('fail');
$numrows = mysqli_num_rows($query);

	if($numrows!=0){
		while($row=mysqli_fetch_assoc($query)){
			$message=$row['notification'];
			$date = $row['n_date'];
			$new_date = explode(" ",$date);
			echo $new_date[0]." : ".$message."|";
		}
	}
?>
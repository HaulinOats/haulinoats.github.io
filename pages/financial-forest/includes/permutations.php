<?php
$text=$_POST["text"];
$data=$_POST["data"];
require("db_connect.php");
$day=date('N', strtotime(date("Y-m-d")));
$query=mysqli_query($mysqli,"SELECT * FROM users WHERE text_opt='1'") or die('fail');
//$query=mysqli_query($mysqli,"SELECT * FROM users WHERE user_id='3'") or die('fail');
$numrows = mysqli_num_rows($query);
if($numrows!=0){
	while($row=mysqli_fetch_assoc($query)){
		$user_id=$row['user_id'];
		$cell=$row['cell_number'];
		$carrier=$row['carrier'];
		$savings_balance=$row['savings_balance'];
		$savings_cushion=$row['savings_cushion'];
		$deadline=$row['deadline'];
		$number_of_weeks=$deadline/7;
		$weekly_savings=$savings_cushion/$number_of_weeks;
		$daily_savings=$savings_cushion/$deadline;
		$months=$deadline/30;
		
		if($carrier=="sprint"){
			$carrier="messaging.sprintpcs.com";
		}
		else if($carrier=="t-mobile"){
			$carrier="tmomail.net";
		}
		else if($carrier=="verizon"){
			$carrier="vtext.com";
		}
		else if($carrier=="att"){
			$carrier="txt.att.net";
		}
		else if($carrier=="nextel"){
			$carrier="messaging.nextel.com";
		}
		$to = $cell."@".$carrier;
	    //$headers = "Financial Forest: ";//<financialforest@brettdavidconnolly.com> \r\n";
		if($data==1){
			$message="FF: Remember to deposit $".round($weekly_savings,2)." in your savings account today";
		}
		else{
			$message=$text;
		}
		mail($to, '', $message);
		echo $message;
	}
}
?>
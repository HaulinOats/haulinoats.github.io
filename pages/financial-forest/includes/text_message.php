<?php
	session_start();
	require("db_connect.php");
	$day=date('N', strtotime(date("Y-m-d")));
	//$query=mysqli_query($mysqli,"SELECT * FROM users WHERE text_opt='1'") or die('fail');
	$query=mysqli_query($mysqli,"SELECT * FROM users WHERE user_id='1'") or die('fail');
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
		    //$headers = "From: Financial Forest";//<financialforest@brettdavidconnolly.com> \r\n";
			if($day==3){
				//$message="Be faithful in small things because it is in them that your strength lies - Mother Theresa";
				$message="All great achievements require time - Maya Angelou";
				//$message="Today you are you! That is truer than true! There is no one alive who is you-er than you - Dr. Suess";
				//$message="If you are going to achieve excellence in big things, you develop the habit in little matters. Excellence is not an exception, it is a prevailing attitude - Colin Powell";
				//$message="By failing to prepare, you are preparing to fail - Benjamin Franklin ";
				//$message="What you get by achieving your goals is not as important as what you become by achieving your goals - Henry David Thoreau";
				//$message="The secret of getting ahead is getting started - Mark Twain";
				//$message="If you can dream it, you can do it - Walt Disney";
			}
			else if($day==5){
				$message="Remember to deposit $".round($weekly_savings,2)." in your savings account today";	
			}
			else if($day==6){
				$message="Stay on track. Remember to report your savings account balance in Financial Forest";
			}
			else{
				$message = "To save $".$savings_cushion." in ".$months." months, you need to save $".round($weekly_savings,2)." each week ($".round($daily_savings,2)." a day). Deposit $".round($weekly_savings,2)." every Friday.";	
			}
			mail($to, '', $message);//, $headers);
			//echo("To: ".$to."Headers: ".$headers."Message: ".$message."/n");
			$registerquery=mysqli_query($mysqli,"INSERT INTO notifications (user_id,n_date,notification)VALUES('$user_id',NOW(),'$message')")or die('insert notification: db-fail');
		}
	}

?>

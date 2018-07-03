<?php
	session_start();

	require("db_connect.php");
	include "logged_in_check.php";
		
	$to = $_SESSION['email'];
	$subject = 'Your Financial Forest Update';
	$headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
    $headers .= "From: <Financial_Forest@financialforest.com>";

    $username = $_SESSION['display_name'];
    $amount_saved = $_SESSION['current_balance'] - $_SESSION['initial_goal_balance'];
    $amount_left = $_SESSION['amount_left'];

	$message = '
	<!DOCTYPE html>
	<html lang="en-us">
		<head>
			<title>Financial Forest Update</title>

			<style type="text/css">
				body {
					background-color: #c5e2e2;
				}
				#email_logo {
					width:325px;
					height:118px;
				}
				#email_text_body {
					margin-left:20px;
					margin-top:30px;
					margin-bottom:0px;
				}
				#email_footer_bar {
					height:30px;
					background-repeat: repeat-x;
					background-color:#5d3612;
				}
				#email_header_bar {
					height:30px;
					background-repeat: repeat-x;
					background-color:#5d3612;
					margin-bottom:20px;
				}
				#bottom_trees {
					background-image: url("http://www.jaffyescarcha.com/portfolio_websites/financial_forest/img/background_email.png");
					background-repeat:repeat-x;
					height:285px;
				}
			}
			</style>
		</head>
		<body style="background-color:#c5e2e2;">
			<div id="email_header_bar"></div>
			<img src="http://www.jaffyescarcha.com/portfolio_websites/financial_forest/img/logo_image.png" alt="Financial Forest" id="email_logo" />
			<div id="email_text_body">
				<p>Hello '.$username.'!</p>

				<p>We have noticed that you saved $'.$amount_saved.'! Congratulations! You are on your way to making your goal a reality. You only need to save another $'.$amount_left.' to reach your goal. Keep up the great work and make your tree grow even bigger!</p>

				<p>Sincerely,<br />
					The Financial Forest Team <br />
					123 Fake St. Orlando FL, 32816
				</p>
			</div>

			<div id="bottom_trees"></div>
			<div id="email_footer_bar"></div>
		</body>
	</html>
	';

	mail($to, $subject, $message, $headers);
?>

<script type='text/javascript'> window.location = "main_page.php#spending_history" </script>



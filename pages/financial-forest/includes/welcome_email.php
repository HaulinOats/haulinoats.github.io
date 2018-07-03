<?php

	$to = $_SESSION['email'];
	$subject = 'Welcome to Financial Forest!';
	$headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
    $headers .= "From: <Financial_Forest@financialforest.com>";

    $username = $_SESSION['display_name'];

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

				<p>Welcome to Financial Forest! The best place for money management. We wish you well on your future endeavours to save your money. With Financial Forest no goal is unreachable.</p>

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



<?php
session_start();
include 'inc/dbconnect.php';
$nid=$_SESSION['nid'];
		if(!$_SESSION['nid']){
			header('Location: http://www.brettdavidconnolly.com/apps/knight-scavenger/index.html');
		}
?><!DOCTYPE html>
<html>
<head>
<meta content="IE=Edge;chrome=1" http-equiv="X-UA-Compatible">
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>Knight Scavenger</title>
<link media="screen" rel="stylesheet" href="css/columnal.css" />
<link media="screen" rel="stylesheet" href="css/styles.css" />
</head>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script type="text/javascript" src="js/board.js"></script>
<script type="text/javascript" src="js/cycle.js"></script>
<body>
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_GB/all.js#xfbml=1&appId=221459034640753";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>


<div id="overlay"></div>
<div class="row">
<div class="pre_2 col_8 omega">
    <a class="buttonWhite padding_5" href="index.html">Log Out</a>
    <a class="buttonWhite padding_5" id="instructions_link" href="#">Instructions</a>
    <a class="buttonWhite padding_5" id="ucf_map" href="#">UCF Map</a>
		<?php	
		//Finds which parts of game board haven't been filled in
		$ucfhunt=mysql_query("SELECT ucfhunt FROM users WHERE nid='$nid'")or die('fail');
		$board_completion = mysql_fetch_row($ucfhunt); 
		$board_completion = $board_completion[0];
		$exploded_board=explode(',',$board_completion);

		//table build
		print("<div class='board'>");
		for($i=0;$i<16;$i++){
		print("<div class='board_square'>");
				if($exploded_board[$i]=='0'){
					$icon_link=$i+1;
					//makes upload button if user hasn't already uploaded photo to that spot
					print("<div id='$i' class='board_button'><img src='http://www.brettdavidconnolly.com/apps/knight-scavenger/img/$icon_link.png' alt='$i'/></div>");
				}else{
					print("<div id='$i' class='board_button'><img src='$exploded_board[$i]' alt='$i'/></div>");
				}
		print("</div>");
		}
		print("</div>");
		//Provide board submission link if board is complete
		$complete=0;
		for($i=0;$i<16;$i++){
			if($exploded_board[$i]!='0'){
				$complete++;
			}
			if($complete=='16'){
				print("<form method='post'><input type='submit' name='submit' id='board_submit' value='Submit Board' /></form>");
				//set 'progress' database variable to '1' so board is submitted to admin
				if(isset($_POST['submit'])){
				mysql_query("UPDATE users SET progress='1' WHERE nid='$nid'")or die('db fail');	
				}
			}
		}
		
				
		$board_completion=implode(',',$exploded_board);
		$_SESSION['nid']=$nid;
		$_SESSION['board_completion']=$board_completion;
		?>
        
    <div id="success"></div>
    <div class="fb-like" data-send="true" data-width="450" data-show-faces="false"></div>
</div>
</div>

	<div class="footer">
		<div class="slideshow">
              	<h2>Orientation with campus is a must if you want to get anywhere on time</h2>
                     <h2 style="display:none">UCF has awarded over 200,000 degrees, with more than 170,000 alumni located around the world.</h2>
                     <h2 style="display:none">NFL players Matt Prater, Daunte Culpepper, Kevin Smith, Brandon Marshall, Asante Samuel, Atari Bigby, and Mike Sims-Walker all went to UCF</h2>
			<h2 style="display:none">One free raspberry scantron available daily at the SGA office in the Student Union (Rm 214).</h2>
			<h2 style="display:none">The university was known as Florida Technological University until 1978</h2>
			<h2 style="display:none">UCF currently has 58,698 students enrolled.</h2>
			<h2 style="display:none">Your PID password changes every 60 days</h2>
			<h2 style="display:none">UCF colors are Black and "Old Gold." As opposed to...."New Gold?"</h2>
			<h2 style="display:none">UCF will join the Big East Conference in 2013</h2>
			<h2 style="display:none"> On October 7, 1968, classes began with 1,948 students, 90 instructors and 150 staff members in the library.</h2>
			<h2 style="display:none">The school's first academic building was the library</h2>
			<h2 style="display:none">President Richard Nixon spoke at then FTU's 1973 graduation ceremony</h2>
			<h2 style="display:none">In one of the initial proposals, "Knightro" had a horse named "KnightMare."</h2>
			<h2 style="display:none">Knightro's foam suit weighs 30 pounds.</h2>
			<h2 style="display:none">Pegasus is actually a retired show horse from The "World Famous" Lipizzaner Stallions with an affinity for eating cake.</h2>
              </div>
	</div>
<? //Finds whether the user has uploaded a photo and will continue to 
		//display instructions until they do
		$instruct_query=mysql_query("SELECT instructions FROM users WHERE nid='$nid'") or die('fail');
		$instructions=mysql_fetch_row($instruct_query);
		$instructions=$instructions[0];
		if($instructions==0){
print("<div id='instructions'>
			<h2>Scavenger Hunt Instructions:</h2>
			<div class='pane'>
				<h3>Part One: Find locations</h3>
					<p>Find a location specified on your gameboard.  You can reference the UCF map by clicking on the 'UCF Map' link at the top of the gameboard page to get your bearings</p><input type='submit' value='NEXT STEP' class='buttonBlack' id='page1'/>
			</div>
	   </div>");
		}
?>
</body>
</html>
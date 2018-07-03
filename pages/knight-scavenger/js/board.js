$(document).ready(function(){
	$('.board_button').click(function(e){
		$(document.body).append('<div id="uploader"></div>');
		var id=$(this).attr('id');
		var img_src2=$(this).children().attr('src');
		$('#uploader').append('<form method="post" id="stuff" action="upload_file.php?id='+id+'" enctype="multipart/form-data"><span id="upload_window"><input type="file" id="file_choose" name="file"/><span class="button">CHOOSE A PHOTO</span></span><br /><input class="buttonBlack fileInput" type="SUBMIT" id="'+id+'" value="UPLOAD" class="file_submit" /></br><img src="'+img_src2+'" alt="'+id+'" /></form><input type="submit" value="CANCEL" id="cancel" />');
		$('#uploader').addClass('uploader_modal');
		$('#overlay').addClass('lean_overlay');	
		$('#cancel').click(function(e){
			$('#uploader').remove();
			$('#overlay').removeClass('lean_overlay');
		})
	})
	
	$('#logout').click(function(e){
		e.preventDefault();
		$.ajax({
			url: "http://www.brettdavidconnolly.com/apps/knight-scavenger/inc/logout.php",
			success: function(){
				window.location="http://www.brettdavidconnolly.com/apps/knight-scavenger/index.html";
			}
		})						
	})
	$('#board_submit').click(function(e){
		e.preventDefault();
		$('#success').html('');
		$('#success').append("<p>Your board has been submitted</p>");
	})
	
	$('#instructions_link').click(function(e){
		e.preventDefault();
		$.ajax({
			url:"inc/instructions2.php",
			success:function(){
				window.location = "myboard.php"
			}
		})
	})
	
	$('#ucf_map').click(function(e){
		e.preventDefault();
		$('#map').remove();	
		$(document.body).append('<div id="map" class="map"><iframe width="640" height="480" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps/ms?msa=0&amp;msid=217041556934489643832.0004c2513a21c944653a3&amp;ie=UTF8&amp;t=m&amp;ll=28.603136,-81.200294&amp;spn=0.018085,0.027466&amp;z=15&amp;output=embed"></iframe><br /><small>View <a href="https://maps.google.com/maps/ms?msa=0&amp;msid=217041556934489643832.0004c2513a21c944653a3&amp;ie=UTF8&amp;t=m&amp;ll=28.603136,-81.200294&amp;spn=0.018085,0.027466&amp;z=15&amp;source=embed" style="color:#0000FF;text-align:left">UCF Scavenger Hunt</a> in a larger map</small><input type="submit" value="CLOSE" class="buttonBlack" id="close2"/></div>');
		$('#close2').click(function(){
			$('#map').remove();					   
		})
	})
	
	$('#page1').click(function(){
		$('.pane').html('').append("<h3>Part Two: Take A Picture</h3><p>Once you arrive at the correct location, take a picture of it! (landscape shots preferred)</p><input type='submit' value='NEXT STEP' class='buttonBlack' id='page2'/>");
		$('#page2').click(function(){
			$('.pane').html('').append("<h3>Part Three: Upload Pictures</h3><p>When you are ready to upload pictures, plug your device into a computer and click whichever icon on the board corresponds to the picture(s) you have taken.  Click 'BROWSE' to find the photos on your computer or device and click 'UPLOAD' to submit them</p><input type='submit' value='NEXT STEP' class='buttonBlack' id='page3'/>");	
			$('#page3').click(function(){
				$('.pane').html('').append("<h3>Part Four: Submit Board</h3><p>Upon filling in every space on your gameboard, a 'Submit Board' link will appear.  When you are ready, click 'Submit Board' to send it to an administrator for verification. You may re-upload photos if you made a mistake by clicking on the corresponding board button</p><input type='submit' value='NEXT STEP' class='buttonBlack' id='page4'/>");	
				$('#page4').click(function(){
					$('.pane').html('').append("<h3>Part Five: Email Verification</h3><p>After the administrator has reviewed your board, you will recieve an email of approval or denial with additional information.  Happy hunting!</p><input type='submit' value='START HUNT' class='buttonBlack' id='close' />");
					$('#close').click(function(){
						$('.pane').html('');
						$('#instructions').append("<div class='pane'><h3>Part One: Find locations</h3><p>Find a location specified on your gameboard.  You can reference the UCF map by clicking on the 'UCF Map' link at the top of the gameboard page to get your bearings</p><input type='submit' value='NEXT STEP' class='buttonBlack' id='page1'/></div>").hide();
						$.ajax({
							url:"inc/instructions.php",
							success:function(){
							}
						})
					})
				})
			})
		})
	})
	
})



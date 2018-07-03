$(document).ready(function(){
$('#login_b').click(function(a){
	a.preventDefault();
	var nid=$('#nid').val();
	var password=$('#password').val();
	$.ajax({
		type: "post",
		data: {nid:nid,password:password},
		url: "inc/login.php",
		success: function(rsp) { 
			$('.loginmsg').html('');
			$('#registerpage').remove();
			$('.loginmsg').append(rsp);
				$('#logout').click(function(a){
					a.preventDefault();
					$('#registerpage').remove();
					$('#admin').remove();
					$.ajax({
						type:'post',
						url:'inc/logout.php',
						success: function(rsp){
							$('.loginmsg').html('');
						}
					});
				});
			
		}
	});
	
});

$('#join_link').click(function(a){
	a.preventDefault();
	$('.loginmsg').remove();
	$('#login_box').remove();
	$.ajax({
		type:'post',
		url:'inc/register.php',
		success: function(rsp){
			$('#loginDiv').append("<div id='registerpage'></div>");
			$('#registerpage').html('');
			$('#admin').remove();
			$('#registerpage').append(rsp);
			$('#registration').click(function(a){
				var email=$('#email').val();
				var nid=$('#rnid').val();
				var password=$('#rpassword').val();
				var password2=$('#password2').val();
				a.preventDefault();
				$.ajax({
					type:'post',
					url:'inc/registration.php',
					data:{email:email,nid:nid,password:password,password2:password2},
					success: function(rsp){
						$('#regerror').remove();
						$('#registerpage').append(rsp);					
					}
				});	
			});
		}
	});	
	
});

});
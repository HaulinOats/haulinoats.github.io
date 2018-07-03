$(document).ready(function(){
//Init Functions
sky_change();

//localStorage.clear();
//Set URL pathing variables
var url_prefix="http://";
//Comment or change url_domain to correct domain
//var url_domain="localhost:8888/financial-forest/";
var url_domain="www.brettdavidconnolly.com/financial-forest/";
var url=url_prefix+url_domain;

//LOGIN PAGE
//Login Click Function	
$('#login').click(function(){
	login_button();	
})
	
//REGISTRATION PAGE
//Checks if inputs in registration forms are empty and outputs errors
form_validation();

//Ajax call when registration form is submitted
$('#signup').click(function(){
	registration_form_submit();
});
	
//INSTRUCTIONS
$('#final-instructions').click(function(){
	set_cushion_goal();	
})
//SET INITIAL GOAL
$('#submit_goal').click(function(){
	goal_submit();
});

//MAINPAGE
drop_menu_check();
update_goal();
logout();
goal_complete()
	
//NOTIFICATON PAGE
notifications();

//ACCOUNT PAGE
edit_account();
edit_bank_info();
edit_login_password();

//FUNCTIONS
function goal_complete(){
	$("#goal-complete").click(function(){
		$("#completion-modal").css("display","none");
		localStorage.savings_balance="0";
	})
}

function notifications(){
	$("#notification-submit").click(function(){
		var n_month = $("#n-month option:selected").val();
		var n_year = $("#n-year option:selected").val();
		$.post(url+"includes/notifications-display.php",{month:n_month,year:n_year,user_id:localStorage.ff_user_id}).done(function(data){
			var n_messages = data.split("|");
			$("#notification").html("");
			for(i=0;i<n_messages.length;i++){
				$("#notification").append("<p class='single-notification'>"+n_messages[i]+"</p>")
			}
		})	
	})
}

function edit_login_password(){
	$('#change-login-password').click(function(){
		$(".alert_modal").html("");
		$('.new_pass').html("").append('<div class="ground-information-header-my-info-container"><p class="information-header">Enter New Password:</p><input type="password" id="new_login_password_1" /></div><div class="ground-information-header-my-info-container"><p class="information-header">Retype Password:</p><input type="password" id="new_login_password_2" /></div><div class="ground-information-header-my-info-container"><a id="save_login_password" data-role="button" data-theme="a">Save Changes</a></div>');
		$("#save_login_password").click(function(){
			var new_password_1=$("#new_login_password_1").val();
			var new_password_2=$("#new_login_password_2").val();
			if(new_password_1===new_password_2&&new_password_1!="" && new_password_2!=""){
				$.post(url+"includes/update_login_password.php",{user_id:localStorage.ff_user_id,password:new_password_1}).done(function(data){
					console.log("New Login Password:"+data);
					$('.new_pass').html("");
					$(".alert_modal").html("");
				})	
			}
			else{
				$(".alert_modal").html("");
				$("#my-info-page .ground-information-container").append("<div class='alert_modal'><p>Passwords Don't Match</p></div>");
			}
		})
	})
}

function edit_bank_info(){
	$('#bank_info_submit').click(function(){
		$(".alert_modal").html("");
		var password_1=$('#edit_bank_password_1').val();
		var password_2=$('#edit_bank_password_2').val();
		var bank_name=$('#edit_bank_name').val();
		var account_type=$('#edit_account_type').val();
		var bank_username=$('#edit_bank_username').val();
		if(password_1===password_2){
			$.post(url+"includes/update_bank_info.php",{user_id:localStorage.ff_user_id,password:password_1,bank_name:bank_name,account_type:account_type,bank_username:bank_username}).done(function(data){
				console.log("Bank Edit Info:"+data);
				window.location.replace("#my-info-page")
			})	
		}
		else{
			$("#edit-bank-info .ground-information-container").append("<div class='alert_modal'><p>Passwords Don't Match</p></div>");
		}
	})
}

function edit_account(){
	$('#account_save').click(function(){
		var first_name = $("#edit_account_first_name").val();
		var last_name= $("#edit_account_last_name").val();
		var email= $("#edit_account_email").val();
		var carrier= $("#edit_account_carrier").val();
		var cell_number= $("#edit_account_cell_number").val();
		var text_opt = $("#edit-text-opt option:selected").val();
		$.post(url+"includes/update_account_info.php",{user_id:localStorage.ff_user_id,first_name:first_name,last_name:last_name,email:email,carrier:carrier,cell_number:cell_number,text_opt:text_opt}).done(function(data){
			console.log("Account Edit:"+data);
			if(first_name=="" || last_name=="" || email=="" || carrier=="" || cell_number==""){
				$("#edit-info-page .ground-information-container").html("").append("<div class='alert_modal'><p>Fields can't be empty</p></div>");
			}else{
				$("#account_first_name").text(first_name)
				$("#account_last_name").text(last_name);
				$("#account_email").text(email);
				$("#account_carrier").text(carrier);
				$("#account_cell_number").text(cell_number);
				if(text_opt=="1"){
					$("#text-opt").text("Yes");
				}
				else{
					$("#text-opt").text("No");
				}
				$("#edit-info-page .ground-information-container .alert_modal").remove();
				window.location.replace("#my-info-page")
			}
		})
	})
}

function logout(){
	$('.log-out-button').click(function(){
		$(':text').val("");
	})	
}

function update_user_info_local_storage(data){
	var data2=data.split('|');
	localStorage.ff_user_name=data2[1];
	localStorage.ff_user_id=data2[2];
	localStorage.ff_goal_id=data2[3];
	localStorage.ff_email=data2[4];
	localStorage.ff_first_name=data2[5];
	localStorage.ff_last_name=data2[6];
	localStorage.ff_cell_number=data2[7];
	localStorage.ff_carrier=data2[8];
	//localStorage.ff_activation_key=data2[9];
	localStorage.ff_bank_username=data2[10];
	localStorage.ff_bank_token=data2[11];
	localStorage.ff_bank_name=data2[12];
	localStorage.ff_account_type=data2[13];
	
	//Fill in information on user's account page
	$("#account_first_name").text(data2[5]);
	$("#edit_account_first_name").val(data2[5]);
	$("#account_last_name").text(data2[6]);
	$("#edit_account_last_name").val(data2[6]);
	$("#account_email").text(data2[4]);
	$("#edit_account_email").val(data2[4]);
	$("#account_carrier").text(data2[8]);
	$("#account_cell_number").text(data2[7]);
	$("#edit_account_cell_number").val(data2[7]);
	$('#edit_bank_name').val(data2[12]);
	$("#edit_account_type").val(data2[13]);
	$("#edit_bank_username").val(data2[10]);

	//Text Opt In/Out
	if(data2[14]=="1"){
		$("#text-opt").text("Yes");
	}
	else{
		$("#text-opt").text("No");
	}
	
	console.log("User Info in local storage:");
	console.log("User Name: "+localStorage.ff_user_name);	
	console.log("User Id: "+localStorage.ff_user_id);
	console.log("Goal Id: "+localStorage.ff_goal_id);
	console.log("Email:"+localStorage.ff_email);
	console.log("First Name: "+localStorage.ff_first_name);
	console.log("Last Name: "+localStorage.ff_last_name);
	console.log("Cell Number: "+localStorage.ff_cell_number);
	console.log("Carrier: "+localStorage.ff_carrier);
	console.log("Text Opt: "+data2[14]);
}

function update_goal_info_local_storage(data){
	console.log("update_goal_info_local_storage() Ajax return data:"+data);
	var data2=data.split('|');

	//Set localStorage Goal Info
	localStorage.ff_cushion_total=data2[0];
	localStorage.ff_cushion_days=data2[1];
	localStorage.ff_initial_savings_balance=0;
	localStorage.cushion_with_savings=data2[3];
	localStorage.cushion_daily_savings=data2[4];
	localStorage.goal_id=data2[5];
	var goal_months=data2[1]/30;

	//Set goal date 
	var goal_date = new Date(data2[2]);
	goal_date.setDate(goal_date.getDate() + parseInt(localStorage.ff_cushion_days));
	var deadline=goal_date;
	var goal_date_string=goal_date.toString();
	var new_goal_date_string=goal_date_string.split(" ");
	var goal_date=new_goal_date_string[0]+" "+new_goal_date_string[1]+" "+new_goal_date_string[2]+" "+new_goal_date_string[3];

	//Calculate Goal Progress Bar
	var goal_progress=localStorage.savings_balance-localStorage.ff_initial_savings_balance;
	var goal_progress2=goal_progress/data2[0];
	var goal_progress_percent=goal_progress2*100;
	var goal_progress_percent=goal_progress_percent.toFixed(2);
	if(goal_progress_percent<0){
		goal_progress_percent=0;
	}
	else if(goal_progress_percent>100){
		goal_progress_percent=100;
	}
	$('#tree_goal_progress div').animate({
		    width: goal_progress_percent+"%",
		}, 5000, function() {
 	});
	if(goal_progress_percent>10){
		$('.seed').attr("class","tree");
	}
 	//Display Tree Based on Goal Amount
 	if(goal_progress_percent>=0&&goal_progress_percent<=10){
 		
 	}
 	else if(goal_progress_percent>10&&goal_progress_percent<=20){
 		$(".tree").attr("src","img/tree_1.png");
 	}
 	else if(goal_progress_percent>20&&goal_progress_percent<=30){
 		$(".tree").attr("src","img/tree_2.png");
 	}
 	else if(goal_progress_percent>30&&goal_progress_percent<=40){
 		$(".tree").attr("src","img/tree_3.png");
 	}
 	else if(goal_progress_percent>40&&goal_progress_percent<=50){
 		$(".tree").attr("src","img/tree_4.png");
 	}
 	else if(goal_progress_percent>50&&goal_progress_percent<=60){
 		$(".tree").attr("src","img/tree_5.png");
 	}
 	else if(goal_progress_percent>60&&goal_progress_percent<=70){
 		$(".tree").attr("src","img/tree_6.png");
 	}
 	else if(goal_progress_percent>70&&goal_progress_percent<=80){
 		$(".tree").attr("src","img/tree_7.png");
 	}
 	else if(goal_progress_percent>80&&goal_progress_percent<=90){
 		$(".tree").attr("src","img/tree_8.png");
 	}
 	else if(goal_progress_percent>80&&goal_progress_percent<=99){
 		$(".tree").attr("src","img/tree_9.png");
 	}
 	else if(goal_progress_percent==100){
 		$(".tree").attr("src","img/tree_10.png");
 		for(i=0;i<3;i++){
	 		$("#tree_goal_progress div").animate({
			    opacity: "0"
			  }, 1000);
	 		$("#tree_goal_progress div").animate({
			    opacity: "1"
			  }, 1000);
 		}
 		$("#completion-modal").css("display","block");

 	}


 	//Calculate New Daily Savings Goal
 	var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	var current_date = new Date();
	console.log("Current Date:" + current_date);
	console.log("Second Date:" + deadline);
	var diffDays = Math.round(Math.abs((current_date.getTime() - deadline.getTime())/(oneDay)));
	console.log("Days Apart: " + diffDays);
	var savings_difference = data2[3]-localStorage.savings_balance;
	var updated_daily_savings = savings_difference/diffDays;
	updated_daily_savings = updated_daily_savings.toFixed(2);
	console.log("New Daily Savings: " + updated_daily_savings);
	var weekly_savings = updated_daily_savings*7;

 	$("#tree-savings-balance").text(localStorage.savings_balance);
 	$("#tree_goal_progress_data").text(Math.round(goal_progress_percent)+" %");
	$('#tree_savings_goal').text("$"+data2[0]);
	$('#tree_goal_description').text("1 Month Emergency Fund");
	$('#tree_goal_deadline').text(goal_date);
	$('#tree_daily_savings').text("$"+updated_daily_savings);
	//$('#tree_goal_timespan').text(data2[1]+" Days");
	$('#tree_weekly_savings').text(weekly_savings.toFixed(2));

	console.log("New Goal Info:");
	console.log("New Savings Balance: "+localStorage.savings_balance)
	console.log("Cushion Total: "+localStorage.ff_cushion_total);
	console.log("Cushion Days: "+localStorage.ff_cushion_days);
	console.log("Cushion With Savings: "+localStorage.cushion_with_savings);
	console.log("Cushion Daily Savings: "+updated_daily_savings);
	console.log("Goal Date: "+goal_date);	
}

function update_goal(){
	$('#update_goal').click(function(){
		$("#edit-modal").html("");
		var cushion_total=$("#edit_cushion_total").val();
		var month = $("#edit-month-select option:selected").val();
		var savings_balance=localStorage.savings_balance;
		if(cushion_total==""){
			$("#edit-modal").append("<p>Please Fill In All Fields With A Number</p>");
		}else if(cushion_total<=0){
			$("#edit-modal").append("<p>Please Enter Positive Number</p>");
		}
		
		if($("#edit-modal p").length!="1"){
			cushion_days=month*30;
			$.post(url+"includes/set_cushion_goal.php",{user_id:localStorage.ff_user_id,cushion_total:cushion_total,cushion_days:cushion_days,savings_balance:localStorage.savings_balance}).done(function(data){
				$.post(url+"includes/set_user_savings_data.php",{user_id:localStorage.ff_user_id,cushion_total:cushion_total,cushion_days:cushion_days}).done(function(data4){
					$.post(url+"includes/get_goal_id.php",{user_id:localStorage.ff_user_id}).done(function(data){
						update_goal_info_local_storage(data);
						$.post(url+"includes/update_user_goal.php",{user_id:localStorage.ff_user_id,goal_id:localStorage.goal_id,savings_balance:savings_balance}).done(function(data){
							window.location.replace("#money-tree-page")
						})
					})
				})
			})	
		}
	});
}

function set_cushion_goal(){
	$("#started-modal").html("");
	var cushion_total=$("#cushion_total").val();
	var month = $("#month-select option:selected").val();
	var savings_balance=0;
	//Get savings account balance
	localStorage.savings_balance=savings_balance;
	if(cushion_total==""){
		$("#started-modal").append("<p>Please Fill In All Fields With A Number</p>");
	}else if(cushion_total<=0){
		$("#started-modal").append("<p>Please Enter Positive Number</p>");
	}
	if($("#started-modal p").length!="1"){
		cushion_days=month*30;
		$("#login-msg").text("Please login with the username and password you created to see your savings assignment for this week")
		$.post(url+"includes/set_cushion_goal.php",{user_id:localStorage.ff_user_id,cushion_total:cushion_total,cushion_days:cushion_days,savings_balance:localStorage.savings_balance}).done(function(data){
			$.post(url+"includes/set_user_savings_data.php",{user_id:localStorage.ff_user_id,cushion_total:cushion_total,cushion_days:cushion_days}).done(function(data4){
			})
			console.log("Set Initial Goal:"+data)
			window.location.replace("#login-page")
		})	
	}
}
	
function login_button(){
	var login_username=$('#login_username').val();
	var login_password=$('#login_password').val();
	$('.alert_modal p').html("");
	$.post(url+"includes/login.php",{username:login_username,password:login_password}).done(function(data){
		var new_data=data.split("|");
 		if(new_data[0]=="success"){
			update_user_info_local_storage(data)
			window.location.replace("#account-balance-page")
			$("#account-balance-submit").click(function(){
				savings_balance=$("#account-balance").val();
				localStorage.savings_balance=savings_balance;
				if(savings_balance==""||savings_balance<0){
					$("#balance-label").text("Enter Savings Balance (Invalid Input)").css("color","red");
				}
				else
				{
					$.post(url+"includes/get_goal_id.php",{user_id:localStorage.ff_user_id}).done(function(data){
						update_goal_info_local_storage(data);
						$.post(url+"includes/update_user_goal.php",{user_id:localStorage.ff_user_id,goal_id:localStorage.goal_id,savings_balance:savings_balance}).done(function(data){
						})
						window.location.replace("#money-tree-page")
					})
				}
			})
		}
		if(data=="password"){
			$("#login-page .login-page-main-content-container").append("<div class='alert_modal'><p>Password Incorrect</p></div>");
		}
		if(data=="user"){
			$("#login-page .login-page-main-content-container").append("<div class='alert_modal'><p>User Not Found</p></div>");
		}
		if(data=="fields"){
			$("#login-page .login-page-main-content-container").append("<div class='alert_modal'><p>Please Fill In Login Information</p></div>");
		}
		if(data=="fail"){
			$("#login-page .login-page-main-content-container").append("<div class='alert_modal'><p>Database Error</p></div>");	
		}
	}); 
}

function registration_form_submit(){
		var username=$('#username').val();
		var firstname=$('#first_name').val();
		var lastname=$('#last_name').val();
		var email=$('#s_email').val();
		var password=$('#password').val();
		var password2=$('#password_confirmation').val();
		var phone=$('#phone').val();
		var carrier=$('#carrier').val();
		console.log(username+''+firstname+''+lastname+''+email+''+password+''+password2+''+phone+''+carrier)
		$.post(url+"includes/sign_up.php",{device_id:localStorage.device_id,username:username,firstname:firstname,lastname:lastname,password: password,password2:password2,phone:phone,email:email,carrier:carrier}).done(function(data){
			console.log(data)
			//Registration Errors
			if(data=="username-length"){
				$("#registration_error").text("Username Too Short/Long");
			}
			if(data=="password-length"){
				$("#registration_error").text("Password Too Short/Long");
			}
			if(data=="email"){
				$("#registration_error").text("Invalid Email");
			}
			if(data=="pw-match"){
				$("#registration_error").text("Passwords Don't Match");
			}
			if(data=="sql-error"){
				$("#registration_error").text("You Already Have An Account");	
			}
			if(data=="registered"){
				$.post(url+"includes/register-update-storage.php",{username:username}).done(function(data){
					var new_data=data.split("|");
						if(new_data[0]=="success"){
						update_user_info_local_storage(data)
						window.location.replace("#about-page-1");
					}
				})
			}
			if(data=="fields"){
				$("#registration_error").text("Please Fill In All Fields");
			}
		})
}
	
function form_validation(){
	$('.reg_form').blur(function(){
		var entered_value=$(this).val();
		var input_id=$(this).attr('id');
		var label_message=$(this).attr('placeholder');
		if(entered_value==""){
			$('label[for='+input_id+']').text('Enter '+label_message).css("color","red");
		}
		else{
			$('label[for='+input_id+']').text('');
		}
	})
}

function drop_menu_check(){
	$('.drop-down-menu-button').bind('click',function(e) {
		e.preventDefault();
		$('.drop-down-menu-container').empty();
		$('.drop-down-menu-container').append('<nav></nav>');
		$('.drop-down-menu-container nav').append('<ul></ul>');
		$('.drop-down-menu-container nav ul').append('<li class=\"main-menu-link\"><a href=\"#money-tree-page\">Money Tree</a></li>');
		//$('.drop-down-menu-container nav ul').append('<li class=\"main-menu-link\"><a href=\"#my-forest-page\">My Forest</a></li>');
		$('.drop-down-menu-container nav ul').append('<li class=\"main-menu-link\"><a href=\"#notifications-page\">Notifications</a></li>');
		$('.drop-down-menu-container nav ul').append('<li class=\"main-menu-link\"><a href=\"#edit-goal-page\">Edit Goal</a></li>');
		$('.drop-down-menu-container nav ul').append('<li class=\"main-menu-link\"><a href=\"#my-info-page\">My Info</a></li>');
		e.stopPropagation();
	});

	$('.main-menu-link ').live('click',function() {
		$('.drop-down-menu-container').empty();
	});

	$('.page-container').live('click',function() {
		$('.drop-down-menu-container').empty();
	});

	$('header').live('click',function() {
		$('.drop-down-menu-container').empty();
	});		
}

function sky_change(){
	var now = new Date();
	var currentTime = now.getHours();
	//var currentTime = 12;
	if (currentTime > 18) {
		$('.money-tree-container').css({'background-color':'#1d2c4a'});
		$('.sky-blue-container').css({'background-color':'#1d2c4a'});
		$('.background-trees-footer').css({'background-image':'url("img/background_trees_night.png")'});
		$('.background-trees-footer').css({'position':'fixed'});
		$('.background-trees-footer').css({'bottom':'0px'});
		$('.background-trees-footer').css({'margin-bottom':'-30px'});
		$('.current-money-tree-container').css({'background-image':'url("img/background_trees_night.png")'});
		$('.about-the-app-page-main-content-container').css({'background-color':'#1d2c4a'});
		$('.clouds').empty();
		$('.clouds').append('<img src=\"img/starry_night.png\" alt=\"starrynight\" class=\"stars\" />');
		$('.clouds').append('<img src=\"img/shooting_star.png\" alt=\"shootingstar\" class=\"shootingstar\" />');
	} else if (currentTime < 6) {
		$('.money-tree-container').css({'background-color':'#1d2c4a'});
		$('.sky-blue-container').css({'background-color':'#1d2c4a'});
		$('.background-trees-footer').css({'background-image':'url("img/background_trees_night.png")'});
		$('.background-trees-footer').css({'position':'fixed'});
		$('.background-trees-footer').css({'bottom':'0px'});
		$('.background-trees-footer').css({'margin-bottom':'-30px'});
		$('.current-money-tree-container').css({'background-image':'url("img/background_trees_night.png")'});
		$('.about-the-app-page-main-content-container').css({'background-color':'#1d2c4a'});
		$('.clouds').empty();
		$('.clouds').append('<img src=\"img/starry_night.png\" alt=\"starrynight\" class=\"stars\" />');
		$('.clouds').append('<img src=\"img/shooting_star.png\" alt=\"shootingstar\" class=\"shootingstar\" />');
	}

	for(i=0;i<20;i++){
		$('.clouds img.day').animate({
		left: '-100%'
		}, 20000, 'linear' ,function() {
		$('.clouds img.day').css("left","0");
		});
	}

	for(i=0;i<20;i++){
		$('.clouds .shootingstar').animate({
		right: '-120%'
		}, 10000,function(){$('.clouds .shootingstar').css("right","120%")});
	}

}

});


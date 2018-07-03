//Admin page for knight scavanger
//Done by Austin Sanford


function displayBoard() {
	var nid = document.getElementById("selectUser").value;
	//alert(nid);
	
	if (nid==""){
		$('#userBoard').empty();
		$('#userBoard').append('<p>All user boards have been reviewed.</p>');
	} else {
		$('#userBoard').empty();
		$('#userBoard').append('<p>Reviewing User: '+nid+'</p>');
		
		$.ajax({
			type: "post",
			data: {nid:nid},
			url: "admin/pics.php",
			success: function(showPics) {
				$('#userBoard').append(showPics);
			}
		});
		
		
		//$('#userBoard').append('<div><form>Notes: <input type="text" name="notes" id="notes" /></form></div>');
		
		//$('#userBoard').append('<p><input type="button" id="approveButton" value="Approve User" onclick="approve()" /></p>');
		//$('#userBoard').append('<p><input type="button" id="denyButton" value="Deny User" onclick="deny()" /></p>');
	}

}

function approve(){
	var nid = document.getElementById("selectUser").value;
	$.ajax({
		type: "post",
		data: {nid:nid},
		url: "admin/approve.php",
		success: function(approvedMessage) {
			$('#selector').empty();
			$('#selector').append(approvedMessage);
			$('#userBoard').empty();
			$('#userBoard').append('<p>User '+nid+' has been approved!</p>');
			$.ajax({
				type: "post",
				data: {nid:nid},
				url: "admin/emailApprove.php",
				success: function(approveSent) {
				}
			});
		}
	});	
}

function deny(){
	var nid = document.getElementById("selectUser").value;
	var notes = document.getElementById("notes").value;
	
	for (i=0; i<16; i++) {
		if ($("#deleteBox"+i+"").attr('checked')) {
			//alert("box "+i+" is checked!");
			var deleteNum = i;
			$.ajax({
				type: "post",
				data: {nid:nid,deleteNum:deleteNum},
				url: "admin/deletePic.php",
				success: function(picGone) {
				}
			});	
		} 
	}
	
	$.ajax({
		type: "post",
		data: {nid:nid,notes:notes},
		url: "admin/deny.php",
		success: function(deniedMessage) {
			$('#selector').empty();
			$('#selector').append(deniedMessage);
			$('#userBoard').empty();
			$('#userBoard').append('<p>User '+nid+' has been denied!</p>'); 
		}
	});	
	
	$.ajax({
		type: "post",
		data: {nid:nid},
		url: "admin/emailDeny.php"
	});
}

function showApproved(){
	$.ajax({
		url: "admin/approved.php",
		success: function(approvedList) {
			$('#userBoard').empty();
			$('#userBoard').append(approvedList); 
		}
	});	
}

function showDenied(){
	$.ajax({
		url: "admin/denied.php",
		success: function(deniedList) {
			$('#userBoard').empty();
			$('#userBoard').append(deniedList); 
		}
	});	
}

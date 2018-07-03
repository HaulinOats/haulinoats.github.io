$(document).ready(function() {
	var url="http://www.brettdavidconnolly.com/financial-forest/";
	$("input").click(function(){
		var cell=$(this).parent()
		var text=$(this).parent().text()
		var data=$(this).parent().attr("data");
		$.post(url+"includes/permutations.php",{text:text,data:data}).done(function(data){
			cell.append("<p class='msg'>Messages Sent!<p>")
		})	
	})
});
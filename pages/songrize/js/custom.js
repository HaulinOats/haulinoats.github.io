$( document ).ready(function() {
	$('#stage').height($(window).height());

	$('#logo_container').addClass('show');

	$('.star').each(function(){
		var left_position = Math.random()*100;
		var top_position = Math.random()*100;
		$(this).css({"left":left_position+"%","top":top_position+"%"})
	})

	$('#s_title').fitText(.6);
});
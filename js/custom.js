$( document ).ready(function() {

	//Randomize numbers in 'languages and techonlogies' section
	var interval_count = 0;
	var experience_level_array = [];

	$('.right li').each(function(){
		experience_level_array.push($(this).text());
	}) 	

	var li_height = $('.left ul li').first().height();
	$('.right ul li').height(li_height);
	
     calculateRatio();

     function calculateRatio() {
          var ratio = $(window).height()/$(window).width();
          $('.tech-section ul li').height(40 * ratio);
     }

     $(window).resize(function() {
          calculateRatio();
     });
});
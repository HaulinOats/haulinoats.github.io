$( document ).ready(function() {

	//Randomize numbers in 'languages and techonlogies' section
	var interval_count = 0;
	var experience_level_array = [];

	$('.right li').each(function(){
		experience_level_array.push($(this).text());
	}) 	

	var li_height = $('.left ul li').first().height();
	$('.right ul li').height(li_height);

	$('.tech-cont').mouseover(function(){
		$('.skill-level').each(function(){
			var skill_level = $(this).attr('data-skill');
			var element = this;
			
			switch (skill_level) {
			  case "1":
			    $(element).css({'width':'20%', 'background-color':'#F2473F'});
			    break;
			  case "2":
			    $(element).css({'width':'40%', 'background-color':'#FA9A50'});
			    break;
			  case "3":
			    $(element).css({'width':'60%', 'background-color':'#FFEC8B'});
			    break;
			  case "4":
			    $(element).css('width','80%');
			    break;
			  case "5":
			    $(element).css({'width':'100%', 'background-color':'#9CCB19'});
			    break;
			}	
		});
	});
     calculateRatio();

     function calculateRatio() {
          var ratio = $(window).height()/$(window).width();
          $('.tech-section ul li').height(40 * ratio);
     }

     $(window).resize(function() {
          calculateRatio();
     });
});
jQuery(document).ready(function( $ ) {

	//show loading gif while ajax is loading content
	ajaxLoading();

	//apply Fit Text scaling to text
	applyFitText();

	//set opening buttons height to half of viewport
	var window_height = $(window).height();
	$('.opener_button').height(window_height/2);
	
	verticallyCenterOpener();

	$('.opener_button').on('click', function(){

		//find which button was clicked
		which_button = $(this).attr('id');
		title_element = $(this).find('.main_title_div');

		if(which_button == 'opener_top'){
			if($(this).hasClass('open')){
				$(this).removeClass('open');
			} else {
				$('#opener_top').addClass('open').animate({height:window_height},1000,function(){
					$(title_element).animate({'top':'20px'}, 1000, function(){
						$('#provider_form_cont').show();
					})
				})
			}
		} else if(which_button == 'opener_bottom'){
			if($(this).hasClass('open')){
				$(this).removeClass('open');
			} else {
				$('#opener_top').animate({height:0},1000,function(){
					$("#opener_bottom").addClass('open');
					$(title_element).animate({'top':'20px'}, 1000, function(){
						$('#plan_form_cont').show();
					})
				})
			}
		} else {

		}
	})

	$('.form_button').on('click', function(){
		element_id = $(this).attr('id');
		if(element_id == 'provider_cancel'){
			$('#provider_form_cont').hide();
			$('#opener_top').animate({height:window_height/2}, 1000, function(){
				$('#opener_top .main_title_div').animate({'top':top_h2_position.top}, 1000, function(){})
			})

		} else if(element_id == 'provider_confirm'){
			type = $(this).attr('data-type');
			name = $('#prov_name').val();
			notes = $('#prov_notes').val();
			notice_date = $('#prov_date').val();
			formSubmit(name, type, notes, notice_date);

			loadXML('http://www.brettdavidconnolly.com/dpnc/data/healthcare_provider.xml', 'hc_provider');
		} else if(element_id == 'plan_cancel'){
			$('#plan_form_cont').hide();
			$('#opener_top').animate({height:window_height/2}, 1000, function(){
				$('#opener_bottom .main_title_div').animate({'top':(bottom_h2_position.top/2)-75}, 1000, function(){})
			})
		} else if(element_id == 'plan_confirm'){
			type = $(this).attr('data-type');
			name = $('#plan_name').val();
			notes = $('#plan_notes').val();
			notice_date = $('#plan_date').val();
			formSubmit(name, type, notes, notice_date);
			loadXML('http://www.brettdavidconnolly.com/dpnc/data/health_plan.xml', 'health_plan');
		}
	})

	//imported XML file and parsing
	// Get and parse XML file into HTML upon opening of application
	function loadXML(xmlPath,privacyType){
		//fade out opening slide
		$('#dpn_opener').fadeOut();

		var privacyType = privacyType;

		$.ajax({
		  //absolute path to xml file
		  url: xmlPath,
		  dataType: 'xml',
		  success: function(xml){

		  	$('#dpn_footer').show();

		  	//set a page and category count variables
		  	page_index = 1;
		  	main_category_count = 0;
		  	sub_category_count = 0;
		  	outro_info = [];

		  	//loop through each main category tag in the xml
		  	intro_title = $(xml).find('intro-title').text();
		  	intro_info  = $(xml).find('intro-info').text();
		  	outro_title = $(xml).find('outro-title').text();
		  	$(xml).find('outro-info').each(function(){
		  		outro_info.push($(this).text());
		  	})
		  	// outro_info  = $(xml).find('outro-info').text();
		  	intro_title_array = intro_title.split('.');

		  	//First slide (intro) creation
		  	var intro_content = $('<div id="dpn_intro_slide" class="slide"></div>');
		  	$(intro_content).append('<p>' + intro_info + '</p>');
		  	for(i=0;i<intro_title_array.length;i++){
		  		$(intro_content).append('<h1>' + intro_title_array[i] + '</h1>');
		  	}
		  	$('#dpn_content').append(intro_content);
		  	$('#dpn_content').addClass('hc_provider');

		  	//loop through each main category tag in the xml
		  	$(xml).find('main-category').each(function(index,value){
		  		
		  		//get category title and information, create main_category_selector
		  		main_title = $(this).find('main-title').text();
		  		main_info  = $(this).find('main-info').text();
		  		main_title_sub = $(this).find('main-title-sub').text();
		  		main_image = $(this).find('main-image').text();
		  		category_number = $(this).find('category-number').text();

		  		//create main category slides and content
		  		if(index < 3) {
			  		var footer_content = $('<div href="#main_'+ index +'" id="footer_category_'+index+'" class="dpn_footer_category"></div>');
			  		$(footer_content).append('<hr id="hr_bar_'+index+'"data-title="'+ main_title +'"><div class="main_cat_circle" id="cat_circle_'+index+'"></div>');
			  	}

		  		var main_category_content = $('<div data-category="' + category_number + '" data-title="'+ main_title +'" data-info="'+ main_info +'" data-image-url="img/'+ main_image +'" class="main_category_'+ category_number +' slide main_info '+privacyType+'_slide" id="'+privacyType+'_main_' + index + '"></div>');
		  		var slide_top_area = $('<div class="top_area '+privacyType+'_top_area top_area_'+ category_number +'"></div>');
		  		var slide_bottom_area = $('<div class="bottom_area '+privacyType+'_bottom_area"></div>')
		  		$(slide_top_area).append('<h2>'+ main_title +'</h2>');
		  		$(slide_top_area).append('<p>'+ main_title_sub +'</p>');
		  		var animation_stage = $('<div class="animation_stage" id="animation_stage_'+ index +'"></div>');
		  		$(slide_top_area).append(animation_stage);
		  		$(main_category_content).append(slide_top_area);
		  		$(main_category_content).append(slide_bottom_area);
		  		
		  		//append footer and main category content to 
		  		
		  		$("#dpn_content").append(main_category_content);
		  		$("#dpn_footer").append(footer_content);


		  		//Loop through each sub category tag in the xml
		  		$(this).find('sub-category').each(function(sub_index, value){

		  			var sub_animation_section = $('<div class="animation_sub anim_sub_'+sub_index+'"></div>');
		  			$(this).find('animation-image').each(function(anim_index){
		  				$(sub_animation_section).append('<div class="anim_img_wrap"><img src="img/'+$(this).text()+'" alt="animation" class="animation_image anim_image_'+anim_index+'" /></div>')
		  			})
		  			$(animation_stage).append(sub_animation_section);

		  			//get sub category title, create sub_category_selector
		  			var sub_description_array = [];
					sub_title = $(this).find('sub-title').text();
					$(this).find('sub-description').each(function(){
						description = $(this).text();
						sub_description_array.push(description);
					});
					sub_image = $(this).find('sub-image').text();
		  			sub_category_selector = '#sub_category_' + page_index;
	  			
		  			//Create elements to be placed in each slide (sub category), append to body
		  			var sub_category_cont = $('<div class="sub_category_cont"></div>');
		  			$(sub_category_cont).append('<img class="plus_minus_icons" src="img/plus_icon.png" alt="plus-minus" />');
		  			$(sub_category_cont).append('<h3>'+ sub_title +'</h3>');
		  			var sub_cat_description = $('<div class="sub_cat_description"></div>');
		  			var sub_cat_ul = $('<ul class="sub_cat_ul"></ul>')
		  			
		  			for(i=0;i<sub_description_array.length;i++){
		  				$(sub_cat_ul).append('<li>' + sub_description_array[i] + '</li>')
		  			}
		  			$(sub_cat_description).append(sub_cat_ul);
		  			$(sub_category_cont).append(sub_cat_description);
		  			$(slide_bottom_area).append(sub_category_cont);

		  			//Loop through any sub category descriptions and append to the slide's 'ul' 
		  			$(this).find('sub-description').each(function(){
		  				sub_description = $(this).text();
		  				$(sub_category_selector+" ul").append('<li>' + sub_description + '</li><div class="bullet_info"><p>Some filler text for this dropdown</p></div>');
		  			});	
		  			page_index++;
		  		})
		  		
		  		//increment main category count
		  		main_category_count++;
		  	});
			main_2_title = $('.main_category_2').first().attr('data-title');
			main_2_info = $('.main_category_2').first().attr('data-info');
			main_2_image = $('.main_category_2').first().attr('data-image-url');
			main_3_title = $('.main_category_3').first().attr('data-title');
			main_3_info = $('.main_category_3').first().attr('data-info');
			main_3_image = $('.main_category_3').first().attr('data-image-url');
			$('.main_category_2').first().before('<div class="title-slide slide" id="title-slide-2" data-category="2"><div><img src="'+ main_2_image +'" alt="image" /><h2>'+ main_2_title +'</h2></div><p>'+ main_2_info +'</p></div>');
			$('.main_category_3').first().before('<div class="title-slide slide" id="title-slide-3" data-category="3"><div><img src="'+ main_3_image +'" alt="image" /><h2>'+ main_3_title +'</h2></div><p>'+ main_3_info +'</p></div>');
			$('#hc_provider_main_0').addClass('outViewPort');
			$(".dpn_footer_category").last().append('<img src="img/heart_crumb.png" id="heart_crumb_icon" alt="heart_crumb" />')
		  	var outro_slide = $('<div id="dpn_outro_slide" class="slide" data-category="end"><h1>' + outro_title + '</h1></div>');
		  	
		  	for(i=0;i<outro_info.length;i++){
		  		$(outro_slide).append('<p>&#8226; '+outro_info[i]+'</p>');
		  	}

		  	$('#dpn_content').append(outro_slide);

		  	//Set all slide height and width to window size
			var window_height = $(window).height();
			var window_width = $(window).width();
			$('.slide').height(window_height).width(window_width);
			$('.top_area').height((window_height/2)-50);
			$('.bottom_area').height(window_height/2);


			//footer element sizing
			// footer_category_width = 100/main_category_count;
			$('.dpn_footer_category').css("width", "33.33%");

			//plus minus click handler
			$('.sub_category_cont').on('click', function(){
				description_element = $(this).find('.sub_cat_description');
				plus_minus_icons = $(this).find('.plus_minus_icons');
				is_showing = (description_element).hasClass('show');
				$('.sub_cat_description').removeClass('show');
				$('.plus_minus_icons').attr('src','img/plus_icon.png');
				if(is_showing){
					$(description_element).removeClass('show');
				} else {
					$(description_element).addClass('show');
					$(plus_minus_icons).attr('src', 'img/minus_icon.png');
				}
			})

			//disable scrolling
			lockScrolling();

			//triggered on user swipe
			$(".slide").swipe({
			  swipe:function(event, direction, distance, duration, fingerCount) {
			  
			  	if(direction == 'left'){
				    next_slide = $(this).next();
				    category_id = $(next_slide).attr('data-category');
				    if(next_slide.length > 0){
					    $('html, body').animate({
					        scrollLeft: $(next_slide).offset().left
					    }, 1000, function(){
					    	$(next_slide).find('.animation_stage :first-child').fadeIn();
					    	$(next_slide).find('.anim_image_1').addClass('animate');
					    	$(next_slide).find('.sub_category_cont').fadeIn();
					    });
				    }

				    footerSlideAnimate(category_id);

			  	} else if(direction == 'right'){
			  		previous_slide = $(this).prev();
			  		category_id = $(previous_slide).attr('data-category');
			  		if(previous_slide.length > 0){
				  		$('html, body').animate({
					        scrollLeft: $(previous_slide).offset().left
					    }, 1000, function(){
					    	category_id = $(next_slide).attr('data-category');
					    	$(previous_slide).find('.animation_stage :first-child').fadeIn();
					    	$(previous_slide).find('.anim_image_1').addClass('animate');
					    	$(previous_slide).find('.sub_category_cont').fadeIn();
					    });

					}

					footerSlideAnimate(category_id);
			  	}
			  }
			});
		
			//scroll to page
			$(".dpn_footer_category_link").on('click', function() {
				var category_id = $(this).attr('href');
			    $('html, body').animate({
			        scrollLeft: $(category_id).offset().left
			    }, 2000);
			});

			//bullet point on click
			$('.sub_cat_holder li').on('click', function() {
				if($(this).next().hasClass('active_bullet') == true){
					$(this).next().removeClass('active_bullet');
				} else {
					$('.bullet_info').removeClass('active_bullet');
					$(this).next().addClass('active_bullet');
				}
			})
		  }, 
		  error: function(){
		  	alert('problem with xml retrieval');
		  }
		});
	}

	function lockScrolling(){
		 // lock scroll position, but retain settings for later
      var scrollPosition = [
        self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
      ];
      var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
      html.data('scroll-position', scrollPosition);
      html.data('previous-overflow', html.css('overflow'));
      html.css('overflow', 'hidden');
      window.scrollTo(scrollPosition[0], scrollPosition[1]);
	}

	function footerSlideAnimate(category_id) {
		if(category_id == 1){
    		$('#category_highlight').animate({"left":"-6px",},1000).css('background-color', 'rgb(240,85,86)');
    	} else if(category_id == 2){
    		$('#category_highlight').animate({"left":"32.6%",},1000).css('background-color', 'rgb(66,143,177)');
    	} else if(category_id == 3){
    		$('#category_highlight').animate({"left":"65.9%",},1000).css('background-color', 'rgb(173,212,119)');
    	} else if(category_id == 'end'){
    		$('#category_highlight').animate({"left":"99%",},1000, function(){
    			$('#category_highlight').css('background-color', 'rgba(240,85,86, 0)');
    		});
    	}
	}

	function ajaxLoading() {
		//Show loader during ajax request
		$(document).ajaxStart(function() {
  			$('#ajaxLoader').show();
		});

		//Hide loader after ajax request
		$(document).ajaxStop(function() {
  			$( '#ajaxLoader' ).hide();
		});
	}

	function applyFitText(){
		$('h2').fitText(1.4);
		$('p').fitText(1.4);
	}

	function verticallyCenterOpener(element){
		$('.main_title_div').each(function(){
			var parent_height = $(this).parent().height();
			var element_height = $(this).height();
			height_diff = parent_height - element_height;
			height_diff_offset = height_diff/2;
			$(this).css('top', height_diff_offset);
			top_h2_position = $('#opener_top .main_title_div').position();
			bottom_h2_position = $('#opener_bottom .main_title_div').position();
		})
	}

	function formSubmit(name, type, notes, notice_date) {
		$.post( "./inc/store_info.php",{ 
			name: name,
			type: type,
			notes: notes,
			notice_date: notice_date
		}).done(function( data ) {
			console.log(data)
		});
	}
});
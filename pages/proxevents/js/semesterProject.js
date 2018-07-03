$(document).ready(function(){
						   
	$('#jscode').click(function(e){
		e.preventDefault();
		$('#frame').remove();
		$(document.body).append('<div id="frame"><h2>Ajax - Javascript</h2><img id="close" src="img/xicon.png" alt="x" /><iframe src="js/semesterProject.js" width="880px" height="550px" style="background:#FFF;margin:15px;"></iframe></div>');
		$('#close').click(function(e){
			$('#frame').remove();						   
		})
	})
	$('#phpcode').click(function(e){
		e.preventDefault();
		$('#frame').remove();
		$(document.body).append('<div id="frame"><h2>Ajax - PHP</h2><img id="close" src="img/xicon.png" alt="x" /><iframe  id="php" src="ajaxphp.html" width="880px" height="550px" style="background:#FFF;margin:15px;"></iframe></div>');
		$('#close').click(function(e){
			$('#frame').remove();						   
		})
	})
	
	
	$('#artists').bind('click', function(e){
		e.preventDefault();
		var username='username='+$('#username').val();
		$.ajax({
			dataType:'xml',
			url:'getArtists.php',
			type:'post',
			data:username,
			success:function(response){
				console.log(response);
				$('#eventform').remove();
				$('#content').append("<div id='eventform'><img class='headphones' src='img/headphonesicon.jpg' alt='headphones' /><p>City to find events:</p><input type='text' id='city' /><input type='button' value='Show Events' id='events' /></div>");
				$('#events').bind('click', function(e){
					e.preventDefault();
					$('.artists').remove();
					$(response).find('artist').each(function(e){
						var location=$('#city').val();
						var location1=location.split(' ');
						var location=location1.join('+');
						var name=$(this).find('name').text();
						var img=this.getElementsByTagName("image")[2];
						var y=img.childNodes[0];
						var img=y.nodeValue;
						var name1=name.split(' ');
						var name=name1.join('+');
						$('#main').append('<div id="'+name+'" class="artists"><img src="'+img+'" /><h2><a href="'+$(this).find('url').text() +'">'+$(this).find('name').text()+'</h2></a></div>');
	$.ajax({
		dataType:'xml',
		url:'getEvents.php',
		type:'post',
		data:{location:location,name:name},
		success:function(response){
			console.log(response);
			$(response).find('event').each(function(e){
				//Creation of divs containing events for each artist
				var div=document.createElement('div');
				div.setAttribute('class','info');
				document.getElementById(name).appendChild(div);
				var eventname=$(this).find('title').text();
				var txt=document.createTextNode(eventname);
				var h3=document.createElement('h3');
				h3.appendChild(txt);
				div.appendChild(h3);
				var time=$(this).find('start_time').text();
				var time=time.split(' ');
				var timedate=time[0].split('-');
				var timedate1=timedate[1]+"-"+timedate[2]+"-"+timedate[0]+" "+time[1];
				var txt=document.createTextNode(timedate1);
				var p=document.createElement('p');
				p.appendChild(txt);
				div.appendChild(p);
				var venue=$(this).find('venue_name').text();
				var txt=document.createTextNode(venue);
				var p=document.createElement('p');
				p.appendChild(txt);
				div.appendChild(p);
				var address=$(this).find('venue_address').text();
				var txt=document.createTextNode(address);
				var p=document.createElement('p');
				p.appendChild(txt);
				div.appendChild(p);
				var cityname=$(this).find('city_name').text();
				var txt=document.createTextNode(cityname);
				var p=document.createElement('p');
				p.appendChild(txt);
				div.appendChild(p);
				var region=$(this).find('region_abbr').text();
				var p=document.createElement('p');
				var txt=document.createTextNode(region);
				p.appendChild(txt);
				div.appendChild(p);
				});
									
				},
						})
					});
				});
			},
		})
	});
						   
});
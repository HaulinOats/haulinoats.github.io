	//Queue page right side show repopulation information
	var episode=['familyguy1','familyguy2','familyguy3','familyguy4','familyguy5','simpsons1','simpsons2','simpsons3','simpsons4','simpsons5','modern1','modern2','modern3','modern4','modern5'];
	var epimg=['img/familyguy.jpg','img/familyguy4.jpg','img/familyguy3.jpg','img/familyguy6.jpg','img/familyguy5.jpg','img/simpsons.jpg','img/simpsons2.jpg','img/simpsons3.jpg','img/simpsons4.jpg','img/simpsons5.jpg','img/modernfamily.jpg','img/modernfamily2.jpg','img/modernfamily3.jpg','img/modernfamily4.jpg','img/modernfamily5.jpg'];
	var imgid=['fampic1','fampic2','fampic3','fampic4','fampic5','simppic1','simppic2','simppic3','simppic4','simppic5','modern1','modern2','modern3','modern4','modern5'];
	var h2text=['Family Guy','Family Guy','Family Guy','Family Guy','Family Guy','The Simpsons','The Simpsons','The Simpsons','The Simpsons','The Simpsons','Modern Family','Modern Family','Modern Family','Modern Family','Modern Family'];
	var p1text=['Brian Gets Lost','Stewies Birthday','I Love You, James','Out To Sea','The Chase','Bartvana','Pilot','Art is Hard','Camp Simpson','Detention Blues','The Talk','Neighbors','Anger Management','In and Out','The Boyfriend'];
	var p2text=['Season 3 Ep. 6 (20:32)','Season 1 Ep. 2 (19:02)','Season 4 Ep. 7 (22:12)','Season 1 Ep.  (20:00)','Season 3 Ep. 2 (18:32)','Season 4 Ep. 6 (21:32)','Season 1 Ep. 1 (19:23)','Season 6 Ep. 3 (32:34)','Season 3 Ep. 8 (22:10)','Season 1 Ep. 6 (18:46)','Season 3 Ep. 6 (20:32)','Season 1 Ep. 2 (19:02)','Season 4 Ep. 7 (22:12)','Season 1 Ep. 2 (20:00)','Season 3 Ep. 2 (18:32)'];
	//family guy data - associative arrays
	var famid=['familyguy1','familyguy2','familyguy3','familyguy4','familyguy5'];
	var famtitle=['Brian and Stewie Get Lost','Stewies Birthday','I Love You, James','Out to Sea','The Chase'];
	var famep=['Season 3 Ep. 6 (20:32)','Season 1 Ep. 2 (19:02)','Season 4 Ep. 7 (22:12)','Season 1 Ep.  (20:00)','Season 3 Ep. 2 (18:32)'];
	var famair=['Air Date: 2/19/2006','Air Date: 1/14/2006','Air Date: 2/28/2011','Air Date: 6/04/2003','Air Date: 1/14/2006'];
	var famrate=['Rated: TV-MA','Rated: TV-MA','Rated: TV-MA','Rated: TV-MA','Rated: TV-MA'];
	var famstudio=['Network/Studio: FOX','Network/Studio: FOX','Network/Studio: FOX','Network/Studio: FOX','Network/Studio: FOX'];
	var famdes=['Brian and Stewie get themselves lost','Stewie celebrates his birthday','Peter gains a new friend ','Peter and the guys get stuck out at sea','Is that a cropduster chasing Peter?'];
	//simpsons data - associate arrays
	var simpid=['simpsons1','simpsons2','simpsons3','simpsons4','simpsons5'];
	var simptitle=['Bartvana','Pilot','Art is Hard','Camp Simpson','Detention Blues'];
	var simpep=['Season 4 Ep. 6 (21:32)','Season 1 Ep. 1 (19:23)','Season 6 Ep. 3 (32:34)','Season 3 Ep. 8 (22:10)','Season 1 Ep. 6 (18:46)'];
	var simpair=['Air Date: 2/19/2006','Air Date: 1/14/2006','Air Date: 2/28/2011','Air Date: 6/04/2003','Air Date: 1/14/2006'];
	var simprate=['Rated: TV-T','Rated: TV-T','Rated: TV-T','Rated: TV-T','Rated: TV-T'];
	var simpstudio=['Network/Studio: FOX','Network/Studio: FOX','Network/Studio: FOX','Network/Studio: FOX','Network/Studio: FOX'];
	var simpdes=['Bart recreates the video "Smells Like Teen Spirit"','The first episode from the family you know and love','The family takes a trip into the unknown','The Simpsons take a trip but is it more then they bargained for?','Barts in trouble again...'];
	//modern family data - associative arrays
	var modid=['modern1','modern2','modern3','modern4','modern5'];
	var modtitle=['The Talk','Neighbors','Anger Management','In and Out','The Boyfriend'];
	var modep=['Season 3 Ep. 6 (20:32)','Season 1 Ep. 2 (19:02)','Season 4 Ep. 7 (22:12)','Season 1 Ep. 2 (20:00)','Season 3 Ep. 2 (18:32)'];
	var modair=['Air Date: 2/19/2006','Air Date: 1/14/2006','Air Date: 2/28/2011','Air Date: 6/04/2003','Air Date: 1/14/2006'];
	var modrate=['Rated: TV-PG','Rated: TV-PG','Rated: TV-PG','Rated: TV-PG','Rated: TV-PG'];
	var modstudio=['Network/Studio: ABC','Network/Studio: ABC','Network/Studio: ABC','Network/Studio: ABC','Network/Studio: ABC'];
	var moddes=['A secret comes out when Gloria cooks a meal for the family','Having your father live next door can really be a hassle','The kids are getting out of hand and dad is a pushover', 'Problems arise when the guys go to couples night','Daddy doesnt like the new boyfriend'];
	//Main Page Arrays
	var title=['Bullies','The Terrible Truth','Brian and Stewie Get Lost','High School Musical','Premeditation','Bartvana','In the Dog House','Christmas Cheer'];
var mepisode=['Season 2 Ep. 5 (18:23)','Season 3 Ep. 4 (19:21)','Season 5 Ep. 2 (22:06)','Season 1 Ep. 5 (21:46)','Season 4 Ep. 2 (36:26)','Web Short','Season 1 Ep. 4 (18:16)','Season 3 Ep. 5 (23:43)'];
var airdate=['Air Date: 7/8/2011','Air Date: 3/13/2010','Air Date: 2/19/2006','Air Date: 5/27/2009','Air Date: 8/22/2007','Air Date: 11/03/2009','Air Date: 10/13/2010','Air Date: 7/09/2011'];
var rating=['Rated: TV-MA','Rated: TV-MA','Rated: TV-MA','Rated: TV-T','Rated: TV-T','Rated: TV-T','Rated: TV-MA','Rated: TV-T'];
var studio=['Network/Studio: ABC','Network/Studio: FOX','Network/Studio: FOX','Network/Studio: FOX','Network/Studio: NBC','Network/Studio: FOX','Network/Studio: FOX','Network/Studio: USA'];
var description=['Allen learns about bullies and finds a unique solution to his problem','Cleveland finds out a terrible secret that could change everything','Brian and Stewie get themselves lost','The crew get together to cover more ridiculous songs','House finds a disturbing secret about one of his patients','Remake of Nirvanas "Teen Spirit" video','Ryan discovers what its really like to be a dog','The family gets ready to celebrate Christmas'];

var ismodalshowing=0;	
window.addEventListener('load', init, false);

function init(){
	if(document.body.id=='main'){
		var shows=document.getElementsByClassName('leftshows');
		var shows1=document.getElementsByClassName('rightshows');
		for(i=0;i<shows.length;i++){
			shows[i].addEventListener('click',function(e){e.preventDefault();mainshows(this.id)},false);
		}
		for(i=0;i<shows1.length;i++){
			shows1[i].addEventListener('click',function(e){e.preventDefault();mainshows(this.id)},false);
		}
	
	}
	else if(document.body.id=='queue'){
		var shows=document.getElementsByClassName('queueshows');
		var shows1=document.getElementsByClassName('queueshows1');
		for(i=0;i<shows.length;i++){
			shows[i].addEventListener('click',function(e){e.preventDefault();rightshows(this.id);},false);
		}
		for(i=0;i<shows1.length;i++){
			shows1[i].addEventListener('click',function(e){e.preventDefault(); leftshows(this.id)},false);
		}
	}
	//jQuery and Ajax only used to display Javascript Code
	$('#code').click(function(e){
		e.preventDefault();
		$(document.body).append('<div id="frame"><h2>DOM Javascript</h2><img id="close" src="img/xicon.png" alt="x" /><iframe src="js/a3.js" width="880px" height="550px" style="background:#FFF;margin:15px;"></iframe></div>');
		$('#close').click(function(e){
			$('#frame').remove();						   
		})
	})
}

//Show Code


//Queue Page
function leftshows(show){
	
	var right=document.getElementById('rightbottomQ');
	var modal=document.getElementById('modalbox');
	resetcolors();
	right.innerHTML='';
	modalbox.innerHTML='';
	
	
	if(show=='showlist'){
		var showhighlight=document.getElementById('showlist');
		for(x=0;x<15;x++){
		repop(x);
		}
	}
	else if(show=='familyqueue'){
		var showhighlight=document.getElementById('familyqueue');
		for(x=0;x<5;x++){
		repop(x);
		}
	}
	else if(show=='simpsonsqueue'){
		var showhighlight=document.getElementById('simpsonsqueue');
		for(x=5;x<10;x++){
		repop(x);
		}
	}
	else if(show=='modernqueue'){
		var showhighlight=document.getElementById('modernqueue');
		for(x=10;x<15;x++){
		repop(x);
		}
	}
	showhighlight.style.backgroundColor='#C0C0C0';
	
	var shows=document.getElementsByClassName('queueshows');
	for(i=0;i<shows.length;i++){
			shows[i].addEventListener('click',function(e){rightshows(this.id);},false);
	}
	
}

function rightshows(show){
	
	var right = document.getElementById('rightbottomQ');
	var rightstuff=document.getElementsByClassName('queueshows');
	id=document.getElementById(show);
	y=id.offsetTop;
	x=id.offsetLeft;
	
	if(show=='familyguy1'){
		modalboxfunc(famtitle,famep,famair,famrate,famstudio,famdes,0,x,y,show);
	}
	if(show=='familyguy2'){
		modalboxfunc(famtitle,famep,famair,famrate,famstudio,famdes,1,x,y,show);
	}
	if(show=='familyguy3'){
		modalboxfunc(famtitle,famep,famair,famrate,famstudio,famdes,2,x,y,show);
	}
	if(show=='familyguy4'){
		modalboxfunc(famtitle,famep,famair,famrate,famstudio,famdes,3,x,y,show);
	}
	if(show=='familyguy5'){
		modalboxfunc(famtitle,famep,famair,famrate,famstudio,famdes,4,x,y,show);
	}
	if(show=='modern1'){
		modalboxfunc(modtitle,modep,modair,modrate,modstudio,moddes,0,x,y,show);
	}
	if(show=='modern2'){
		modalboxfunc(modtitle,modep,modair,modrate,modstudio,moddes,1,x,y,show);
	}
	if(show=='modern3'){
		modalboxfunc(modtitle,modep,modair,modrate,modstudio,moddes,2,x,y,show);
	}
	if(show=='modern4'){
		modalboxfunc(modtitle,modep,modair,modrate,modstudio,moddes,3,x,y,show);
	}
	if(show=='modern5'){
		modalboxfunc(modtitle,modep,modair,modrate,modstudio,moddes,4,x,y,show);
	}
	if(show=='simpsons1'){
		modalboxfunc(simptitle,simpep,simpair,simprate,simpstudio,simpdes,0,x,y,show);
	}
	if(show=='simpsons2'){
		modalboxfunc(simptitle,simpep,simpair,simprate,simpstudio,simpdes,1,x,y,show);
	}
	if(show=='simpsons3'){
		modalboxfunc(simptitle,simpep,simpair,simprate,simpstudio,simpdes,2,x,y,show);
	}
	if(show=='simpsons4'){
		modalboxfunc(simptitle,simpep,simpair,simprate,simpstudio,simpdes,3,x,y,show);
	}
	if(show=='simpsons5'){
		modalboxfunc(simptitle,simpep,simpair,simprate,simpstudio,simpdes,4,x,y,show);
	}

	modalshowing();	
}

//Main Page
function mainshows(show){
	var modal=document.getElementById('modalbox');
	id=document.getElementById(show);
	y=id.offsetTop;
	x=id.offsetLeft;

	if(show=='allen'){
	modalboxfunc(title,mepisode,airdate,rating,studio,description,0,x,y,show);
	}
	else if(show=='cleveland'){
	modalboxfunc(title,mepisode,airdate,rating,studio,description,1,x,y,show);	
	}
	else if(show=='familyg'){
	modalboxfunc(title,mepisode,airdate,rating,studio,description,2,x,y,show);	
	}
	else if(show=='glee'){
	modalboxfunc(title,mepisode,airdate,rating,studio,description,3,x,y,show);
	}
	else if(show=='house'){
	modalboxfunc(title,mepisode,airdate,rating,studio,description,4,x,y,show);	
	}
	else if(show=='simpsons'){
	modalboxfunc(title,mepisode,airdate,rating,studio,description,5,x,y,show);	
	}
	else if(show=='wilfred'){
	modalboxfunc(title,mepisode,airdate,rating,studio,description,6,x,y,show);	
	}
	else if(show=='modern'){
	modalboxfunc(title,mepisode,airdate,rating,studio,description,7,x,y,show);	
	}
	
	modalshowing();
}


//Modal Box Build Function
function modalboxfunc(title,episode,airdate,rating,studio,description,j,x,y,show){
		
	var thisdiv=document.getElementById(show);
	var modal=document.getElementById('modalbox');
	var arrow = document.createElement('img');
	arrow.style.position='absolute';

	//x and y positioning for modal windows
	id=document.getElementById(show);
	y=id.offsetTop;
	x=id.offsetLeft;
		
	if(thisdiv.className=='leftshows'){
		x=x+420;
		y=y-80;
		arrow.setAttribute('src','img/larrow.png');
		arrow.style.left='-20px';
		arrow.style.top='120px';
	}
	else{
		x=x-270;
		y=y-80;
		arrow.setAttribute('src','img/marrow.png');
		arrow.style.left='256px';
		arrow.style.top='120px';
	}

	//Build Modal Box
	var modalbox=document.getElementById('modalbox');
	var div= document.createElement('div');
	div.setAttribute('class','differentshowdivs');
	div.style.backgroundColor='#ccc';
	var h2 = document.createElement('h2');
	var p1 = document.createElement('p');
	var p2 = document.createElement('p');
	var p3 = document.createElement('p');
	var p4 = document.createElement('p');
	var pspace=document.createElement('p');
	var p5 = document.createElement('p');
	var buttonlinks=document.createElement('a');
	var bdiv = document.createElement('div');
	bdiv.style.backgroundColor='#999';
	bdiv.setAttribute('onclick','location.href="#"');
	var bdivimg = document.createElement('img');
	bdivimg.setAttribute('src','img/marrow.png');
	var bdivh2 = document.createElement('h2');
	var bdiv1 = document.createElement('div');
	bdiv1.style.backgroundColor='#999';
	var bdivimg1 = document.createElement('img');
	bdivimg1.setAttribute('src','img/plus.png');
	var bdivh21 = document.createElement('h2');
	var bdiv2 = document.createElement('div');
	bdiv2.style.backgroundColor='#999';
	var bdivimg2 = document.createElement('img');
	bdivimg2.setAttribute('src','img/door.png');
	var bdivh22 = document.createElement('h2');
	bdiv.setAttribute('onclick','location.href="#"');
	bdiv1.setAttribute('onclick','location.href="#"');
	bdiv2.setAttribute('onclick','location.href="#"');
		
	var h2text = document.createTextNode(title[j]);
	var p1text = document.createTextNode(episode[j]);
	var p2text = document.createTextNode(airdate[j]);
	var p3text = document.createTextNode(rating[j]);
	var p4text = document.createTextNode(studio[j]);
	var pspacetext = document.createTextNode('');
	var p5text = document.createTextNode(description[j]);
	var bdivh2text = document.createTextNode('Watch Now');
	var bdivh21text = document.createTextNode('Add to Queue');
	var bdivh22text = document.createTextNode('Go to Show Page');
	
	h2.appendChild(h2text);
	p1.appendChild(p1text);
	p2.appendChild(p2text);
	p3.appendChild(p3text);
	p4.appendChild(p4text);
	pspace.appendChild(pspacetext);
	p5.appendChild(p5text);
	
	
	bdivh2.appendChild(bdivh2text);
	bdiv.appendChild(bdivimg);
	bdiv.appendChild(buttonlinks);
	bdiv.appendChild(bdivh2);
	bdivh21.appendChild(bdivh21text);
	bdiv1.appendChild(bdivimg1);
	bdiv1.appendChild(bdivh21);
	bdivh22.appendChild(bdivh22text);
	bdiv2.appendChild(bdivimg2);
	bdiv2.appendChild(bdivh22);
	
	div.appendChild(h2);
	div.appendChild(p1);
	div.appendChild(p2);
	div.appendChild(p3);
	div.appendChild(p4);
	div.appendChild(pspace);
	div.appendChild(p5);
	div.appendChild(bdiv);
	div.appendChild(bdiv1);
	div.appendChild(bdiv2);
		
	modalbox.appendChild(arrow);
	modalbox.appendChild(div);
	
	modalbox.style.left=x+'px';
	modalbox.style.top=y+'px';

}

//Reset Queue Page Left Side Highlights
function resetcolors(){
	var mf = document.getElementById('modernqueue');
	mf.style.backgroundColor='#FFF';
	var fg = document.getElementById('familyqueue');
	fg.style.backgroundColor='#FFF';
	var simp = document.getElementById('simpsonsqueue');
	simp.style.backgroundColor='#FFF';
	var shows = document.getElementById('showlist');
	shows.style.backgroundColor='#FFF';
}

//Repopulates right side of queue page based on clicked show
function repop(x){	
	var right=document.getElementById('rightbottomQ');
	
	var div=document.createElement('div');
	div.setAttribute('class','queueshows');
	div.setAttribute('id',episode[x]);
	var img=document.createElement('img');
	img.setAttribute('src',epimg[x]);
	img.setAttribute('id',imgid[x]);
	var h2=document.createElement('h2');
	var p1=document.createElement('p');
	var p2=document.createElement('p');
	var p1textnode=document.createTextNode(p1text[x]);
	var p2textnode=document.createTextNode(p2text[x]);
	var h2textnode=document.createTextNode(h2text[x]);
	
	h2.appendChild(h2textnode);
	p1.appendChild(p1textnode);
	p2.appendChild(p2textnode);
	
	div.appendChild(img);
	div.appendChild(h2);
	div.appendChild(p1);
	div.appendChild(p2);
	
	right.appendChild(div);
}

function modalshowing(){
	if(ismodalshowing==0){
		ismodalshowing=1;
	}
	else{
		modalbox.innerHTML='';
		ismodalshowing=0;
	}
}
$(document).ready(function(){
	$('.drop-down-menu-button').live('click',function(e) {
		e.preventDefault();
		$('.drop-down-menu-container').empty();
		$('.drop-down-menu-container').append('<nav></nav>');
		$('.drop-down-menu-container nav').append('<ul></ul>');
		$('.drop-down-menu-container nav ul').append('<li class=\"main-menu-link\"><a href=\"#money-tree-page\">Money Tree</a></li>');
		$('.drop-down-menu-container nav ul').append('<li class=\"main-menu-link\"><a href=\"#my-forest-page\">My Forest</a></li>');
		$('.drop-down-menu-container nav ul').append('<li class=\"main-menu-link\"><a href=\"#notifications-page\">Notifications</a></li>');
		$('.drop-down-menu-container nav ul').append('<li class=\"main-menu-link\"><a href=\"#set-new-goal-page\">Set New Goal</a></li>');
		$('.drop-down-menu-container nav ul').append('<li class=\"main-menu-link\"><a href=\"#my-info-page\">My Info</a></li>');
	});

	$('.main-menu-link').live('click',function() {
		$('.drop-down-menu-container').empty();
	});

	$('.page-container').live('click',function() {
		$('.drop-down-menu-container').empty();
	});
});
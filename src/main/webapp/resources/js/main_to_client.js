$(function() {
	$('#nearest-to-cart').click(function(event) {
		event.preventDefault();
		$.cookie('clientMenu', 'cart');
		
		$(location).attr('href', './client.html');
	});
	
	$('#nearest-to-purchase').click(function(event) {
		event.preventDefault();
		$.cookie('clientMenu', 'purchase');
		
		$(location).attr('href', './client.html');	
	});
	
	$('#nearest-to-request').click(function(event) {
		event.preventDefault();
		$.cookie('clientMenu', 'request');
		
		$(location).attr('href', './client.html');
	});
});
	
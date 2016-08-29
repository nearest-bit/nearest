$(function() {
	$('#nearest-to-cart').click(function() {
		$.cookie('clientMenu', 'cart');
		
		$(location).attr('href', './client.html');
	});
	
	$('#nearest-to-purchase').click(function() {
		$.cookie('clientMenu', 'purchase');
		
		$(location).attr('href', './client.html');	
	});
	
	$('#nearest-to-request').click(function() {
		$.cookie('clientMenu', 'request');
		
		$(location).attr('href', './client.html');
	});
});
	
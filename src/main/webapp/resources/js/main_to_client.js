$(function() {
	$('#nearest-to-cart').click(function(event) {
		event.preventDefault();
		if(sessionLogin == true){
			$.cookie('clientMenu', 'cart');
		
			$(location).attr('href', './client.html');
		}else{
			$(location).attr('href', './login.html');
		}
	});
	
	$('#nearest-to-purchase').click(function(event) {
		event.preventDefault();
		if(sessionLogin == true){
			$.cookie('clientMenu', 'purchase');
			
			$(location).attr('href', './client.html');
		}else{
			$(location).attr('href', './login.html');
		}
	});
	
	$('#nearest-to-request').click(function(event) {
		event.preventDefault();
		if(sessionLogin == true){
			$.cookie('clientMenu', 'request');
			
			$(location).attr('href', './client.html');
		}else{
			$(location).attr('href', './login.html');
		}
	});
});
	
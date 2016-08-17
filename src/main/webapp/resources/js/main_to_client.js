	
	$('#nearest-to-cart').click(function(e) {
		  e.preventDefault();
	  
		  var url = 'http://localhost:8080/nearest/client.html';
		  
		  $.cookie('client-menu', 'cart');
		  
		  $(location).attr('href',url);
		 
	  });
	
	
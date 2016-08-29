	
	$('#nearest-to-cart').click(function(e) {
		  e.preventDefault();
	  
		  var url = contextRoot + 'client.html';
		  
//		  $.cookie('client-menu', 'cart');
		  
		  $(location).attr('href',url);
		 
	  });
	
	
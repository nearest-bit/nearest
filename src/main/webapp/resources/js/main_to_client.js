	var cartSource = $('#nearest-cart-list').text();
	var cartListTempl = Handlebars.compile(source);
	
	$('#nearest-to-cart').click(function(e) {
		  e.preventDefault();
	  
		  var url = 'http://localhost:8080/nearest/client.html';
			  alert($.cookie('loginId'));
		  $(location).attr('href', url);
		  alert('aa');
		  $.ajax({
			  url : contextRoot + 'cart/getCart.do',
			  datatype : 'json',
			  method : 'get',
			  data : {
				  clientNo : $.cookie('loginId')
			  },
			  success : function(result) {
				  if(result.status != 'success'){
					  alert('failure');
					  return;
				  }
				  
				  $('#nearest-cart-table > tbody').append(cartListTempl(result));
				  $('#nearest-client-menu').addClass('active');
			  },
			  error : function() {
				  alert('error');
			  }
		  });
	  });
	
	
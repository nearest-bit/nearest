$(function() {
	$(document).on('click', '.fh5co-project-item img', function() {		
		var productNo = $(this).parent().parent().prev().val();
		
		$.ajax({
			url: contextRoot + 'product/getProduct.do',
			method: 'post',
			dataType: 'json',
			data: {
				no: productNo
			},
			success: function(result) {
				var data = result.productData;
				var discountRate = data.discountRate;
				var discountPrice;
								
				$('#nearest-item-title').text(data.name);
				$('#nearest-item-mart').text(data.mart.name);
				$('#nearest-item-prod-no').val(productNo);
				$('#nearest-item-entity').text(data.entity);
				$('#nearest-item-price').text(data.price);
				
				if(discountRate > 0) {
					$('#nearest-item-price').css('text-decoration', 'line-through');
					$('#nearest-item-price').next().remove();
					
					discountPrice = $('<font>').addClass('nearest-purchase-pay');
					$(discountPrice).text(' ' + parseInt(data.price - (data.price * discountRate / 100)));
					
					$('#nearest-item-price').after(discountPrice);
				}
			},
			error: function() {
				
			}
		});
	});
	
	$(document).on('click', '#nearest-item-cart', function(event) {
		event.preventDefault();
		
		var loginId = sessionLogin;
				
		if( loginId == false){
        	$.magnificPopup.close();
        	
        	$(location).attr('href', './login.html');
        	
        	return;
	    }
		
		var cartProductNo = $('#nearest-item-prod-no').val();
				
		$.ajax({
			url: contextRoot + 'cart/addCart.do',
			method: 'post',
			dataType: 'json',
			data: {
				productNo: cartProductNo				
			},
			success: function(result) {
				mainAlert('cartSuccess');
			},
			error: function() {
				
			}
		});
	});
	
	$('#nearest-item-purchase, #nearest-purchase-dialog').magnificPopup();
	
	$(document).on('click', '#nearest-item-purchase', function(event) {
		event.preventDefault();
		
		var loginId = sessionLogin;
		
		if( loginId == false){
        	$.magnificPopup.close();

        	$(location).attr('href', './login.html');
        	
        	return;
	    }
		
		/*$.magnificPopup.close();
		$('#nearest-myinfo-div').magnificPopup('open');*/
		
	});
});
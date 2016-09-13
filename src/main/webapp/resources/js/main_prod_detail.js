$(function() {
	$(document).on('click', '.fh5co-project-item img', function() {		
		var productNo = $(this).parent().parent().prev().val();
		var martNo = $(this).parent().parent().prev().prev().val();
		var discountRate = $(this).parent().parent().prev().prev().prev().val();		
		
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
				var originPrice;
				var discountPrice;
				
				console.log(discountRate);
								
				$('#nearest-item-title').text(data.name);
				$('#nearest-item-mart').text(data.mart.name);
				$('#nearest-item-prod-no').val(productNo);
				$('#nearest-item-mart-no').val(martNo);
				$('#nearest-item-discount-rate').val(discountRate);
				$('#nearest-item-entity').text(data.entity);
				$('#nearest-detail-prod-image').attr('src', data.photo);
				
				$('#nearest-item-price').children('span').remove();
				
				originPrice = $('<span>').addClass('nearest-purchase-pay');
				$(originPrice).text(data.price + '원');
				$(originPrice).css('color', 'black');
				$('#nearest-item-price').append(originPrice);
								
				if(discountRate > 0) {
					
					$(originPrice).css('text-decoration', 'line-through');
					
					
					discountPrice = $('<span>').addClass('nearest-purchase-pay');
					$(discountPrice).text('\t\t'+parseInt( data.price - (data.price * discountRate / 100)) + '원');
					$('#nearest-item-payment-price').val($(discountPrice).text());
					
					$(originPrice).after(discountPrice);
					
					$('#nearest-percent-discount').text(discountRate + '%');
				} else if(discountRate == 0){
					$('#nearest-item-payment-price').val(data.price);
					$('#nearest-percent-discount').text('0%');
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

	$(document).on('click', '#nearest-item-purchase', function(event) {
		event.preventDefault();
		
		var loginId = sessionLogin;
		
		if( loginId == false){
        	$.magnificPopup.close();

        	$(location).attr('href', './login.html');
        	
        	return;
	    }
		
		$.magnificPopup.open({
			  items: {
			    src: '#nearest-purchase-dialog'
			  }
		});
		
		var maxEntity = parseInt($('#nearest-item-entity').text());
		$('#nearest-receive-entity').attr('max', maxEntity);
		
		var totalPrice = parseInt( $('#nearest-item-payment-price').val() ) * parseInt ( $('#nearest-receive-entity').val() );
		
		/*alert('totalPrice: ' + parseInt( $('#nearest-item-payment-price').val() ) * parseInt( $('#nearest-receive-entity').val() ));*/
		
		$('#nearest-payment-price').text(totalPrice + '원');
		$('#nearest-payment-price').attr('value', totalPrice);
		
		$('.nearest-cart-prodNo').val($('#nearest-item-prod-no').val());
		$('.nearest-cart-martNo').val($('#nearest-item-mart-no').val());
		$('.nearest-cart-prodName').val($('#nearest-item-title').text());
		$('.nearest-cart-price').val(totalPrice);
		$('.nearest-cart-discount').val($('#nearest-item-discount-rate').val());
		
	});
	
	$(document).on('change', '#nearest-receive-entity', function() {
		var entity = parseInt($(this).val()); 
		
		var totalPrice = parseInt ( $('#nearest-item-payment-price').val() ) * entity;
		  
		$('#nearest-payment-price').text(totalPrice + '원');
		$('#nearest-payment-price').attr('value', totalPrice);
		
	})
});
$(function() {
	$(document).on('click', '.fh5co-project-item > img', function() {
		var productNo = $(this).parent().prev().val();
		
		$.ajax({
			url: contextRoot + 'product/getProduct.do',
			method: 'post',
			dataType: 'json',
			data: {
				no: productNo
			},
			success: function(result) {
				var data = result.productData;
				
				alert(productNo);
				
				$('#nearest-item-title').text(data.name);
				$('#nearest-item-mart').text(data.mart.name);
				$('#nearest-item-prod-no').val(productNo);
				$('#nearest-item-entity').text(data.entity);
				$('#nearest-item-price').text(data.price);
			},
			error: function() {
				
			}
		});
	});
	
	$(document).on('click', '#nearest-item-cart', function(event) {
		event.preventDefault();
		
		var loginId = $.cookie('loginId');
		
		alert(loginId);
		
		if( loginId == undefined){
        	$.magnificPopup.close();
        	$('#loginBtn').click();
        	
        	return;
	    }
		
		var cartClientNo = loginId;
		var cartProductNo = $('#nearest-item-prod-no').val();
		
		alert(cartProductNo);
		
		$.ajax({
			url: contextRoot + 'cart/addCart.do',
			method: 'post',
			dataType: 'json',
			data: {
				clientNo: cartClientNo,
				productNo: cartProductNo				
			},
			success: function(result) {
				alert('찜하셨습니다!!!!!')
			},
			error: function() {
				
			}
		});
	});
	
	$(document).on('click', '#nearest-item-purchase', function(event) {
		event.preventDefault();
		
		var loginId = $.cookie('loginId');
		
		if( loginId == undefined){
        	$.magnificPopup.close();
        	$('#loginBtn').click();
        	
        	return;
	    }
		
		
	});
});
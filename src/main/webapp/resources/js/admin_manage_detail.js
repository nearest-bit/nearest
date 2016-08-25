$(function() {
	$(document).on('click', '.fh5co-project-item', function() {		
		var productNo = $(this).prev().val();
		
		$.ajax({
			url: contextRoot + 'product/getProduct.do',
			method: 'post',
			dataType: 'json',
			data: {
				no: productNo
			},
			success: function(result) {
				var data = result.productData;
								
				$('#nearest-admin-item-title').val(data.name);
				$('#nearest-admin-item-prod-no').val(productNo);
				$('#nearest-admin-item-entity').val(data.entity);
				$('#nearest-admin-item-price').val(data.price);
				$('#nearest-product-detail-form img').attr('src', data.photo);
			},
			error: function() {
				
			}
		});
	});
	
	$(document).on('click', '#nearest-item-update', function(event) {
		event.preventDefault();
		
		var adminProductNo = $('#nearest-item-prod-no').val();
				
		$.ajax({
			url: contextRoot + 'product/updateProduct.do',
			method: 'post',
			dataType: 'json',
			data: {
				productNo: adminProductNo				
			},
			success: function(result) {
			},
			error: function() {
				alert('ajax error');
			}
		});
	});
	
	$(document).on('click', '#nearest-item-cancel', function(event) {
		event.preventDefault();

		$.magnificPopup.close();
	});
});
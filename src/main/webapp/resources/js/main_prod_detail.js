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
				
				$('#nearest-item-title').text(data.name);
				$('#nearest-item-mart').text(data.mart.name);
				$('#nearest-item-entity').text(data.entity);
				$('#nearest-item-price').text(data.price);
			},
			error: function() {
				
			}
		});
	});
});
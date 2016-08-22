$(function() {
		$('#order-btn').on('click', function() {
		$('#order-search').css('display', 'block');
		$('#order-btn').css('display', 'none');
	});

	$('#request-btn').on('click', function() {
		$('#request-search').css('display', 'block');
		$('#request-btn').css('display', 'none');
	});

	$('#order-reset-btn').on('click', function() {
		$('#order-search').css('display', 'none');
		$('#order-btn').css('display', '');
	});

	$('#request-reset-btn').on('click', function() {
		$('#request-search').css('display', 'none');
		$('#request-btn').css('display', '');
	});

	$('#nearest-complete-btn').on('click', function() {
		$('.nearest-margin-bottom').css('background', 'gray');
	});
	
	$('#nearest-file-upload').change(function() {
		
	});
	
	
	$(document).on('click', '#nearest-product-upload-btn', function() {
		var productName = $('#nearest-product-name').val();
		var productPrice = $('#nearest-product-price').val();
		var productEntity = $('#nearest-product-entity').val();
		var productSaleRate = $('#nearest-product-salerate').val();
		
		var file = $('#nearest-file-upload')[0].files[0];
	    var formData = new FormData();
	  
	    formData.append('name', productName);
	    formData.append('price', productPrice);
	    formData.append('entity', productEntity);
	    formData.append('discountRate', productSaleRate);
	    formData.append('imageFile', file);
	    
	    $.ajax({
	    	url: './admin/productUpload.do',
	    	processData: false,
            contentType: 'multipart/form-data',
            type: 'POST',
	    	data: formData,
	    	success: function(result) {
	    		alert(result.status);
	    	},
	    	error: function() {
	    		alert('ajax error');
	    	}
	    });
	});
})
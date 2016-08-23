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
	
	/*
	$('#nearest-file-upload').fileupload({
		dataType: 'json',
		autoUpload: false,
		acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
		disableImageResize: /Android(?!.*Chrome)|Opera/
			.test(window.navigator.userAgent),
			previewMaxWidth: 150,
			previewMaxHeight: 150,
			previewCrop: true,
			dropZone : $('#dropzone')
	});
	
	$('#nearest-image-fileupload').submit(function(event) {
		event.preventDefault();
		var productImageFile = $('#nearest-file-upload');
		var filesList = $(productImageFile).attr('files');
		$(this).action = './product/addProduct.do';
		
		$(productImageFile).fileupload('send', {files: filesList});
	});
	
	$(document).on('click', '#nearest-product-upload-btn', function() {
		var productName = $('#nearest-product-name').val();
		var productPrice = $('#nearest-product-price').val();
		var productEntity = $('#nearest-product-entity').val();
		var productSaleRate = $('#nearest-product-salerate').val();
		
		var productImageFile = $('#nearest-upload-image');
		$(productImageFile).fileupload();
		var filesList = $(productImageFile).prop('files');
		var frm = $('nearest-image-fileupload');
		
		var formData = new FormData($('#nearest-image-fileupload'));
		var formURL = './product/addProductImage.do';
		  
	    $.ajax({
	    	url: './product/addProduct.do',
            method: 'POST',
            dataType: 'json',
	    	data: {
	    		name: productName,
	    		price: productPrice,
	    		entity: productEntity,
	    		discountRate: productSaleRate
	    	},
	    	success: function(result) {
	    	},
	    	error: function() {
	    		alert('ajax error');
	    	}
	    });
	});*/
})
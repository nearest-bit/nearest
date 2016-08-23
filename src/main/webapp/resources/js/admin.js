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
	
	var imageList = new Array();
	
	$('#nearest-file-upload').fileupload({
		add: function (e, data) {
	        $.each(data.files, function (index, file) {
	            imageList.push(file);
	        });
	    }
	});
	
	$('#nearest-image-fileupload').submit(function(event) {
		event.preventDefault();
		var productImageFile = $('#nearest-file-upload');
		
		$(productImageFile).fileupload('send', {files: imageList});
	});

})
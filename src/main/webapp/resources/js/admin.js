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
	
	$('#nearest-order-btn').on('click', function() {
		$('#nearest-order-search').css('display', 'block');
		$('#nearest-order-btn').css('display', 'none');
	});

	$('#nearest-request-btn').on('click', function() {
		$('#nearest-request-search').css('display', 'block');
		$('#nearest-request-btn').css('display', 'none');
	});

	$('#nearest-order-reset-btn').on('click', function() {
		$('#nearest-order-search').css('display', 'none');
		$('#nearest-order-btn').css('display', '');
	});

	$('#nearest-request-reset-btn').on('click', function() {
		$('#nearest-request-search').css('display', 'none');
		$('#nearest-request-btn').css('display', '');
	});

	$('#nearest-complete-btn').on('click', function() {
		$('.fh5co-person').css('border', '2px solid orange');
		$(this).text('준비 완료');
	});
	
	$('#reply-reset-btn').on('click', function() {
		$.magnificPopup.close();
	});
	
	var imageList = new Array();
	
	$('#nearest-file-upload').fileupload({
		disableImageResize: false, 
	    previewMaxWidth: 320, 
	    previewMaxHeight: 320
	}).on('fileuploadadd', function (e, data) {
		if(imageList.length > 0) {
			imageList.pop();
		}
		
        $.each(data.files, function (index, file) {	        	
            imageList.push(file);
        });
	}).on('fileuploadprocessalways', function(e, data) {
        
		node = $("#nearest-upload-image");
		$("#nearest-upload-image > img").remove();
		
		var canvasIntodiv = $('<span class="imagewrapper"/>').append(data.files[0].preview);
		canvasIntodiv.appendTo(node);
	  });
	
	$('#nearest-image-fileupload').submit(function(event) {
		event.preventDefault();
		var productImageFile = $('#nearest-file-upload');
		
		$(productImageFile).fileupload('send', {files: imageList});
	});
})

$('.nearest-to-home').on('click', function(){
	  $( 'html, body' ).animate( { scrollTop : 0 }, 400 );
	  return false;
});
$( function() {
	
	$('.nearest-admin-list > ul > li > a[href="#regist"]').click(function () {
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
	});
});

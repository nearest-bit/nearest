$( function() {
	
	$('.nearest-admin-list > ul > li > a[href="#regist"]').click(function () {		
		var imageList = new Array();
		var count = 1;
		
		$('#nearest-file-upload').fileupload({
			disableImageResize: false, 
		    previewMaxWidth: 320, 
		    previewMaxHeight: 320
		}).on('fileuploadadd', function (e, data) {
			console.log('fileuploadadd : ' + count);
			count++;
			
			if(imageList.length > 0) {
				imageList.pop();
			}
			
	        $.each(data.files, function (index, file) {	        	
	            imageList.push(file);
	        });
		}).on('fileuploadprocessalways', function(e, data) {
	        console.log('fileuploadprocessalways : ' + count);
	        count++;
			
			node = $("#nearest-upload-image");
			$("#nearest-upload-image > img").remove();
			$("#nearest-upload-image > span").remove();
			
			var canvasIntodiv = $('<span class="imagewrapper"/>').append(data.files[0].preview);
			$(canvasIntodiv.children()).attr('style', 'width: 400px; height: 280px;');
			canvasIntodiv.appendTo(node);
		  });
		
		$('#nearest-image-fileupload').submit(function(event) {
			event.preventDefault();
			var productImageFile = $('#nearest-image-file-upload');
			
			console.log('submit : ' + count);
			count++;
			
			$(productImageFile).fileupload('send', {files: imageList});
			$(productImageFile).fileupload('destroy');
			
			console.log('after fileupload : ' + count);
			count++;
		});
	});
});

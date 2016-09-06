$( function() {
	var registActive = false;
	var imageList = new Array();
	
	$('.nearest-admin-list > ul > li > a[href="#regist"]').click(function () {	
		if(!registActive) {
			var count = 1;
			
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
		        console.log('fileuploadprocessalways : ' + count);
				
				node = $("#nearest-upload-image");
				$("#nearest-upload-image > img").remove();
				$("#nearest-upload-image > span").remove();
				
				var canvasIntodiv = $('<span class="imagewrapper"/>').append(data.files[0].preview);
				$(canvasIntodiv.children()).attr('style', 'width: 400px; height: 280px;');
				canvasIntodiv.appendTo(node);
			});
		}
		
		registActive = true;
	});
	
	$('#nearest-image-fileupload').submit(function(event) {
		event.preventDefault();
		
		console.log(imageList.length);
		console.log(imageList);
		
		if(imageList.length == 0) {
			adminAlert('needImage');
			
			return;
		}
		
		$('#nearest-image-fileupload')[0].reset();
		imageList = new Array();
		
		adminAlert('registSuccess');
	});
});

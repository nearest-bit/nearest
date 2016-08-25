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
	
	$('.nearest-admin-list > ul > li > a[href="#manage"]').click(function () {
		event.preventDefault();
		
		/* 파일업로드 */
		var detailImageList = new Array();
		
		$('#nearest-detail-file-upload').fileupload({
			disableImageResize: false, 
		    previewMaxWidth: 320, 
		    previewMaxHeight: 320
		}).on('fileuploadadd', function (e, data) {
			if(detailImageList.length > 0) {
				detailImageList.pop();
			}
			
	        $.each(data.files, function (index, file) {	        	
	        	detailImageList.push(file);
	        });
		}).on('fileuploadprocessalways', function(e, data) {
	        
			node = $("#nearest-detail-upload-image");
			$("#nearest-detail-upload-image > img").remove();
			$("#nearest-detail-upload-image > span").remove();
			
			var canvasIntodiv = $('<span class="imagewrapper"/>').append(data.files[0].preview);
			$(canvasIntodiv.children()).attr('style', 'width: 400px; height: 280px;');
			canvasIntodiv.appendTo(node);
		  });
		
		$('#nearest-detail-image-fileupload').submit(function(event) {
			event.preventDefault();
			var productImageFile = $('#nearest-detail-file-upload');
			
			$(productImageFile).fileupload('send', {files: detailImageList});
			$(productImageFile).fileupload('destroy');
		});
	});
	
	$(document).on('click', '#nearest-item-cancel', function(event) {
		event.preventDefault();

		$.magnificPopup.close();
	});
});
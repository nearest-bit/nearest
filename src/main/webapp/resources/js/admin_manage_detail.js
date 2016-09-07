$(function() {
	$('#nearest-manage-maj-cate').change(function(event) {
		var subCate = $('#nearest-manage-sub-cate');
		var cateValue = $(this).children('option:selected').val();
		$(subCate).children().remove();
		
		var foodCate = [$('<option>').attr('value', '1').attr('selected', 'selected').text('과일류/채소류/계란'),
		               $('<option>').attr('value', '2').text('쌀/잡곡'),
		               $('<option>').attr('value', '3').text('라면/통조림/조미료/장류/소스'),
		               $('<option>').attr('value', '4').text('과자/초콜릿/시리얼/빵'),
		               $('<option>').attr('value', '5').text('유제품/냉장/냉동/간편식')];
		
		var lifeCate = [$('<option>').attr('value', '1').attr('selected', 'selected').text('화장지/물티슈/위생용품/일회용품'),
		               $('<option>').attr('value', '2').text('세제/세탁/청소/욕실용품'),
		               $('<option>').attr('value', '3').text('구강용품/면도/의약외품')];
		
		switch(cateValue) {
			case '1':
				for(var i in foodCate) {
					$(subCate).append($(foodCate[i]));
				}
				
				break;
			case '2':
				for(var i in lifeCate) {
					$(subCate).append($(lifeCate[i]));
				}
				
				break;
		}
		
	});
	
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
				
				var majCateSel = $('#nearest-manage-maj-cate');
				var subCateSel = $('#nearest-manage-sub-cate');
				$(majCateSel).children().remove();
				$(subCateSel).children().remove();
				
				var majCateVal = parseInt(data.majorCategory);
				var subCateVal = parseInt(data.subCategory);
				
				var majCate = [$('<option>').attr('value', '1').text('Food'),
				               $('<option>').attr('value', '2').text('Life')];
				
				var foodCate = [$('<option>').attr('value', '1').text('과일류/채소류/계란'),
				               $('<option>').attr('value', '2').text('쌀/잡곡'),
				               $('<option>').attr('value', '3').text('라면/통조림/조미료/장류/소스'),
				               $('<option>').attr('value', '4').text('과자/초콜릿/시리얼/빵'),
				               $('<option>').attr('value', '5').text('유제품/냉장/냉동/간편식')];
				
				var lifeCate = [$('<option>').attr('value', '1').text('화장지/물티슈/위생용품/일회용품'),
				               $('<option>').attr('value', '2').text('세제/세탁/청소/욕실용품'),
				               $('<option>').attr('value', '3').text('구강용품/면도/의약외품')];
								
				$('#nearest-admin-item-title').val(data.name);
				$('#nearest-admin-item-prod-no').val(productNo);
				$('#nearest-admin-item-entity').val(data.entity);
				$('#nearest-admin-item-price').val(data.price);
				$('#nearest-detail-image-fileupload img').attr('src', data.photo);
				
				switch(data.majorCategory) {
					case '1':
						for(var i in majCate) {
							if(i == majCateVal-1) {
								$(majCateSel).append($(majCate[i]).attr('selected', 'selected'));
							} else {
								$(majCateSel).append($(majCate[i]));
							}
						}
						
						for(var i in foodCate) {
							if(i == subCateVal-1) {
								$(subCateSel).append($(foodCate[i]).attr('selected', 'selected'));
							} else {
								$(subCateSel).append($(foodCate[i]));
							}
						}
						
						break;
					case '2':
						for(var i in majCate) {
							if(i == majCateVal-1) {
								$(majCateSel).append($(majCate[i]).attr('selected', 'selected'));
							} else {
								$(majCateSel).append($(majCate[i]));
							}
						}
						
						for(var i in lifeCate) {
							if(i == subCateVal-1) {
								$(subCateSel).append($(lifeCate[i]).attr('selected', 'selected'));
							} else {
								$(subCateSel).append($(lifeCate[i]));
							}
						}
						
						break;
				}
			},
			error: function() {
				
			}
		});
	});
	
	var manageActive = false;
	var detailImageList = new Array();
	
	$('.nearest-admin-list > ul > li > a[href="#manage"]').click(function () {
		
		/* 파일업로드 */
		
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
			
			$('#nearest-detail-file-upload').fileupload('send', {files: detailImageList});
						
			if(detailImageList.length == 0) {
				adminAlert('needImage');
				
				return;
			}
			
			$('#nearest-detail-image-fileupload')[0].reset();
			detailImageList = new Array();
			
			adminAlert('registSuccess');
		});
	});
	
	$(document).on('click', '#nearest-item-cancel', function(event) {
		event.preventDefault();

		$.magnificPopup.close();
	});
});
$( function() {
	var registActive = false;
	var imageList = new Array();
	
	$('.nearest-admin-list > ul > li > a[href="#regist"]').click(function () {	
		if(!registActive) {
			var count = 1;
			
			$('#nearest-file-upload').fileupload({
				disableImageResize: false, 
			    previewMaxWidth: 300, 
			    previewMaxHeight: 300
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
				$(canvasIntodiv.children()).attr('style', 'width: 300px; height: 300px; border: 2px solid #286090');
				canvasIntodiv.appendTo(node);
			});
		}
		
		registActive = true;
	});
	
	$('#nearest-regist-maj-cate').change(function(event) {
		var subCate = $('#nearest-regist-sub-cate');
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

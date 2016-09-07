$(document).on('click', '#loginFind-btn', function() {
	doFindId();		
});

function doFindId() {
	if($.trim($('#loginFind-form-username').val()) == ""){
		swal('이름을 입력해주세요!');
		return;
	}
	if(!$('#loginFind-form-confirm').is(':checked')){
		$.ajax({
			url: contextRoot + 'client/findId.do',
			dataType: 'json',
			data: {
				name: $('#loginFind-form-username').val(),
				phone1: $('#login-find-select option:selected').text(),
				phone2: $('#loginFind-form-phone1').val(),
				phone3: $('#loginFind-form-phone2').val(),
				email: $('#loginFind-form-email').val()
			},
			method: 'post',
			success: function(result) {
				if(result.status == "success"){
					swal('고객님의 ID는 '+result.id+' 입니다!');
				}else{
					swal('controller 에러');
				}
				
			},
			error: function(result){
				swal('ajax 전송 에러');
			}
		});
	}else{
		/*$.ajax({
			url: contextRoot + 'admin/findId.do',
			dataType: 'json',
			data: {
				name: $('#loginFind-form-username').val(),
				phone1: $('#login-find-select option:selected').text(),
				phone2: $('#loginFind-form-phone1').val(),
				phone3: $('#loginFind-form-phone2').val(),
				email: $('#loginFind-form-email').val()
			},
			method: 'post',
			success: function(result) {
				if(result.status == "success"){
					swal('고객님의 ID는 '+result.id+' 입니다!');
				}else{
					swal('controller 에러');
				}
			},
			error: function(result){
				swal('ajax 전송 에러');
			}
		});*/
		swal('준비중입니다.');
	}	
}

$(document).on('click', '.confirm', function() {
	$(location).attr('href', contextRoot);
});
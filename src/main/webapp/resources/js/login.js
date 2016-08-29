$(function() {
	var saveId = $.cookie('saveId');
	
	console.log(saveId);
	
    if(saveId != undefined){
    	$('#rememberId').attr('checked', true);
    	$('#login-form-username').val(saveId);
    }
});

$(document).on('click','#login-btn',function() {
	
	if($.trim($('#login-form-username').val()) == ""){
		mainAlert('idEmpty');
		return;
	}
	
	if($('#adminLogin').is(':checked')){
		$.ajax({
			url: contextRoot + 'admin/login.do',
			dataType: 'json',
			data: {
				'id': $('#login-form-username').val(),
				'password': $('#login-form-password').val()
			},
			method: 'post',
			success: function(result) {
				if(result.status == "correct"){
					if(!$('#rememberId').is(':checked')) {
						$.removeCookie('saveId');
					} else {
						$.cookie('saveId', $('#login-form-username').val());
					}
					
					$(location).attr('href', './admin.html');
				}else{
					alert('로그인이 실패하였습니다');
				}
			},
			error: function(result) {
				alert(result.status);
			}
		});
		
	} else {
		
		$.ajax({
			url: contextRoot + 'client/login.do',
			dataType: 'json',
			data: {
				id: $('#login-form-username').val(),
				password: $('#login-form-password').val()
			},
			method: 'post',
			success: function(result) {
				$(function() {
					if(result.status == "correct"){
						if(!$('#rememberId').is(':checked')) {
							$.removeCookie('saveId');
						} else {
							$.cookie('saveId', $('#login-form-username').val());
						}
						
						$(location).attr('href', contextRoot);
					}else{
						alert('id/password를 확인하세요');
					}
				});
			},
			error: function(result) {
				alert(result.status);
			}
		});
		
	}	
});

$('.find-id-password > a').magnificPopup();

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
					//alert('관리자 체크22');
					$(location).attr('href', './admin.html');
					
					$("#loginBtn").css("display", "none");
					$("#signupBtn").css('display', 'none');
					$("#btnSplit").css('display', 'none');
					$('#nearest-dropdown').css('display', 'inline');
					$('#loginAfter').css('display', 'inline');

					$.cookie('loginId', result.data.no, {expires : 1});
				}else{
					alert('로그인이 실패하였습니다');
				}
			},
			error: function(result) {
				alert(result.status);
			}
		});
		
	}else{
		
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
						$.magnificPopup.close();
						$("#loginBtn").css("display", "none");
						$("#signupBtn").css('display', 'none');
						$("#btnSplit").css('display', 'none');
						$('#nearest-dropdown').css('display', 'inline');
						$('#loginAfter').css('display', 'inline');
					}else{
						alert('id/password를 확인하세요');
					}
				});
				$.cookie('loginId', result.data.id, {expires : 1});
			},
			error: function(result) {
				alert(result.status);
			}
		});
		
	}	
});

$(document).on('click','#logoutBtn',function() {
	$.removeCookie('loginId');
		
	$(function() {
		$(location).attr('href', contextRoot);
	})
});

$(function() {
    
    var loginId = $.cookie('loginId');
    if( loginId != undefined){
        $(function() {
            $("#loginBtn").css("display", "none");
            $("#signupBtn").css('display', 'none');
            $("#btnSplit").css('display', 'none');
            $('#nearest-dropdown').css('display', 'inline');
            $('#loginAfter').css('display', 'inline');
        });
    }
});


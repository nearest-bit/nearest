//$(document).on('click','#login-btn',function() {
//	/* location.href = "./admin.html"; */
//	$.ajax({
//		url: 'http://localhost:8080/nearest/admin/login.do',
//		dataType: 'json',
//		data: {
//			id: $('#login-form-username').val(),
//			password: $('#login-form-password').val()
//		},
//		method: 'post',
//		success: function(result) {
//			alert(result.status);
//		},
//		error: function(result) {
//			alert(result.status);
//		}
//	});
//	
//});

$(document).on('click','#login-btn',function() {
	
	if($.trim($('#login-form-username').val()) == ""){
		alert("아이디를 입력하세요.");
		return;
	}
	
	alert($('#managerLogin').is(':checked'));
//	alert($('#managerLogin').)
	
	if($('#managerLogin').is(':checked')){
		alert($('#login-form-username').val());
		alert( $('#login-form-password').val());
		$.ajax({
			url: contextRoot + 'admin/login.do',
			dataType: 'json',
			data: {
				'id': $('#login-form-username').val(),
				'password': $('#login-form-password').val()
			},
			method: 'post',
			success: function(result) {
				alert('관리자 체크');
				if(result.status == "correct"){
					//alert('관리자 체크22');
					$(location).attr('href', './manager.html');
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
		
		/* location.href = "./admin.html"; */
		$.ajax({
			url: contextRoot + 'client/login.do',
			dataType: 'json',
			data: {
				'id': $('#login-form-username').val(),
				'password': $('#login-form-password').val()
			},
			method: 'post',
			success: function(result) {
				$(function() {
					if(result.status == "correct"){
						alert('고객 체크');
						$.magnificPopup.close();
						$("#loginBtn").css("display", "none");
						$("#signupBtn").css('display', 'none');
						$("#btnSplit").css('display', 'none');
						$('#nearest-dropdown').css('display', 'inline');
						$('#loginAfter').css('display', 'inline');
					}else{
						alert('로그인이 실패하였습니다.');
					}
				});
				$.cookie('loginId', result.data.no, {expires : 1});
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
		$("#loginBtn").css("display", 'inline');
		$("#signupBtn").css('display', 'inline');
		$("#btnSplit").css('display', 'inline');
		$('#nearest-dropdown').css('display', 'none');
		$('#loginAfter').css('display', 'none');
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


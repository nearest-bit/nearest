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
	
	$.ajax({
		url: contextRoot + 'client/login.do',
		dataType: 'json',
		data: {
			id: $('#login-form-username').val(),
			password: $('#login-form-password').val()
		},
		method: 'post',
		success: function(result) {
			if(result.status == 'correct'){
				$(function() {
					$.magnificPopup.close();
					$("#loginBtn").css("display", "none");
					$("#signupBtn").css('display', 'none');
					$("#btnSplit").css('display', 'none');
					$('#nearest-dropdown').css('display', 'inline');
					$('#loginAfter').css('display', 'inline');
				});
				
				$.cookie('loginId', result.data.no, {expires : 1});
			}else{
				alert('id/password를 확인하세요');
			}
		},
		error: function(result) {
			alert(result.status);
		}
	});
	
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

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
	var loginId = $.cookie('loginId', $('#login-form-username').val(), {expires : 1});
	/*if(loginId != undefined){
		$('#login-form-username').val(loginId);
		$('#rememberId').prop('checked', true);
	}*/
	if($.trim($('#login-form-username').val()) == ""){
		alert("아이디를 입력하세요.");
		return;
	} else {
		if($('#rememberId').prop('checked')) {
			$.cookie('loginId', $('#login-form-username').val());
		} else{
			$.removeCookie('loginId');
		}
	}
	
	/* location.href = "./admin.html"; */
	$.ajax({
		url: contextRoot + 'client/login.do',
		dataType: 'json',
		data: {
			id: $('#login-form-username').val(),
			password: $('#login-form-password').val()
		},
		method: 'post',
		success: function(result) {
			alert(result.status);
			$('#loginView').text(result.data.id);
			$(function() {
				$.magnificPopup.close();
				$("#loginBtn").css("display", "none");
				$("#signupBtn").css('display', 'none');
				$('#loginAfter').css('display', 'inline');
			});
			
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
		$('#loginAfter').css('display', 'none');
	})
});

$(function() {
    
    var loginId = $.cookie('loginId');
    if( loginId != undefined){
        $('#loginView').text(loginId);
        $(function() {
            $("#loginBtn").css("display", "none");
            $("#signupBtn").css('display', 'none');
            $('#loginAfter').css('display', 'inline');
        });
    }
});

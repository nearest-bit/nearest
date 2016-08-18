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
			$(function() {
				$.magnificPopup.close();
				$("#loginBtn").css("display", "none");
				$("#signupBtn").css('display', 'none');
				$("#btnSplit").css('display', 'none');
				$('#nearest-dropdown').css('display', 'inline');
				$('#loginAfter').css('display', 'inline');
			});
			
			$.cookie('loginId', result.data.id, {expires : 1});
		},
		error: function(result) {
			alert(result.status);
		}
	});
	
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

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

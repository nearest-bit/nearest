$(function() {
	var saveId = $.cookie('saveId');
	
	console.log(saveId);
	
    if(saveId != undefined){
    	$('#rememberId').attr('checked', true);
    	$('#login-form-username').val(saveId);
    }
});

$(document).on('click', '#login-btn', function() {
	doLogin();		
});

$(document).on('keydown', '#login-form-username', function(event) {
	if(event.keycode == 13) {
		doLogin();
	}		
});

$(document).on('keydown', '#login-form-password', function(event) {
	if(event.keycode == 13) {
		doLogin();
	}		
});

function doLogin() {
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
					clientLogin('loginFail');
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
						clientLogin('incorrectInfo');
					}
				});
			},
			error: function(result) {
				alert(result.status);
			}
		});
		
	}
}

/*$('.login-tab a').on('click', function (e) {
	  
	  e.preventDefault();
	  
	  $(this).parent().addClass('active');
	  $(this).parent().siblings().removeClass('active');
	  
	  target = $(this).attr('href');

	  $('.login-form-bottom > div').not(target).hide();
	  
	  $(target).fadeIn(600);
	  
	});
*/

$('.find-id-password > a').magnificPopup();
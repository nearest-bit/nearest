var sessionLogin = false;

$.ajax({
	url: contextRoot + 'session/check.do',
	method: 'post',
	dataType: 'json',
	success: function(result) {		
		if(result.status == 'true') {
			sessionLogin = true
			
			var url = $(location).attr('href');
			
			if(url == contextRoot || url == contextRoot + 'index.html') {
				$("#loginBtn").css('display', 'none');
			    $("#signupBtn").css('display', 'none');
			    $("#btnSplit").css('display', 'none');
			    $('#nearest-dropdown').css('display', 'inline');
			    $('#loginAfter').css('display', 'inline');
			    
			    $.ajax({
					url: contextRoot + 'client/checkAlert.do',
					method: 'post',
					dataType: 'json',
					success: function(result) {
						var data = result.alertData;
						var count = data.cnt_req + 0 + data.cnt_order;
													
						if(result.status != 'success') {
							return;
						}
						
						$('#nearest-dropdown-alert').text(count);
						
						$('#nearest-to-purchase').append($('<span>').addClass('badge').text(data.cnt_order));
						$('#nearest-to-request').append($('<span>').addClass('badge').text(data.cnt_req));
					},
					error: function() {
						
					}
				});	
			}
		}
		console.log('sessionLogin:' + sessionLogin);
	},
	error: function() {
		console.log('ajax error');
	}
});
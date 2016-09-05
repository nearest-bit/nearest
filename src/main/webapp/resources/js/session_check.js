var sessionLogin = false;
var sessionRole = '';

$.ajax({
	url: contextRoot + 'session/check.do',
	method: 'post',
	dataType: 'json',
	success: function(result) {		
		if(result.status == 'true') {
			sessionLogin = true
			sessionRole = result.role;
			
			console.log(sessionRole);
			
			var url = $(location).attr('href');
			
			if(url == contextRoot || url == contextRoot + 'index.html' || url == contextRoot + 'client.html') {
			    $("#loginBtn-div").addClass('login-display');
			    $("#signupBtn-div").addClass('login-display');
			    $("#btnSplit").css('display', 'none');
			    $('#myInfoBtn-div').removeClass('login-display');
			    $('#logoutBtn-div').removeClass('login-display');
			    
			    if( sessionRole == 'admin' ){
		    		location.href='./admin.html';
		    	} else if( sessionRole == 'client') {
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
		}
		
		console.log('sessionLogin:' + sessionLogin);
	},
	error: function() {
		console.log('ajax error');
	}
});
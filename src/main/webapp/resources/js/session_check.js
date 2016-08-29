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
				if( sessionLogin ){
				    $("#loginBtn").css('display', 'none');
				    $("#signupBtn").css('display', 'none');
				    $("#btnSplit").css('display', 'none');
				    $('#nearest-dropdown').css('display', 'inline');
				    $('#loginAfter').css('display', 'inline');
				} else {
				    $("#loginBtn").css('display', 'inline');
				    $("#signupBtn").css('display', 'inline');
				    $("#btnSplit").css('display', 'inline');
				    $('#nearest-dropdown').css('display', 'none');
				    $('#loginAfter').css('display', 'none');
				}
			}
		}
		
		console.log('sessionLogin:' + sessionLogin);
	},
	error: function() {
		console.log('ajax error');
	}
});
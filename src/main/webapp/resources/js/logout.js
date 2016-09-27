$(document).on('click','#logoutBtn',function() {
	$.ajax({
		url: contextRoot + 'session/logout.do',
		method: 'post',
		dataType: 'json',
		success: function(result) {
			if (result.status == 'success') {
				$(location).attr('href', '/nearest/index.html');
			}
		},
		error: function() {
			console.log('ajax error');
		}
	});
});
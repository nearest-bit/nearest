function clientRequest() {
	
	$.ajax({
		url : contextRoot + 'qna/QNAList.do',
		datatype : 'json',
		method : 'post',
		
		success : function(result){
			$('#nearest-req > tbody > tr').remove();
			var source = $('#nearest-req-list').html();
		    var templete = Handlebars.compile(source);
		    $('#nearest-req > tbody').append(templete(result));
		    $('#nearest-client-req-popup').load('client_req_form.html');
			
		},
		
		error : function(){
			alert('getRequerst error...');
		}
	});
	
	$('#nearest-new-reqBtn').on('click', function(event) {
		event.preventDefault();
	});
};


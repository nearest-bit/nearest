function clientRequest() {
	
	$.ajax({
		url : contextRoot + 'qna/QNAList.do',
		datatype : 'json',
		method : 'post',
		
		success : function(result){
			$('#nearest-req > tbody > tr').remove();
			var source = $('#nearest-req-list').html();
		    var templete = Handlebars.compile(source);
		    for(var i=0; i<result.reqData.length; i++){
		    	if(result.reqData[i].status == 1){
		    		result.reqData[i].request = false;
		    	}else{
		    		result.reqData[i].request = true;
		    	}
		    }
		    $('#nearest-req > tbody').append(templete(result));
			
		},
		
		error : function(){
			alert('getRequerst error...');
		}
	});
	
	$('#nearest-new-reqBtn').on('click', function(event) {
		event.preventDefault();
	});
};

$('#QNAaddBtn').on('click', function() {
	
	if($('#QNAselectBox option:selected').val() == ''){
		clientQnaAlert('noCheckMart');
		return;
	}
	
	
	$.ajax({
		url : contextRoot + 'qna/add.do',
		datatype : 'json',
		method : 'post',
		data : {
			martNo : $('#QNAselectBox option:selected').val(),
			title : $('#nearest-req-title').val(),
			content : $('#nearest-req-content').val()
		},
	  success : function(result){
		  clientQnaAlert('addQnaSuccess');
		  $.magnificPopup.close(); 
		  clientRequest();
		  
	  },
	  error : function() {
		  alert('Controller Error....');
	  }
	});
});

$(document).on('click', '.nearest-client-req-tr', function(){
	if ( $(this).children('td:last-child').attr('data') == '2'){
		
		$.ajax({
			url : contextRoot + 'qna/updateQna.do',
			datatype : 'json',
			method : 'post',
			data : {
				qnaNo : $(this).children('td:first-child').attr('req-no')
			},
			success : function(result){
				if( result.status != 'success' ){
					alert(result.status);
					return;
				}
				
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
						$('#nearest-to-request > span').remove();
						$('#nearest-dropdown-alert').text(count);
						
						
						$('#nearest-to-request').append($('<span>').addClass('badge').text(data.cnt_req));
					},
					error: function() {
						
					}
				});
				
				/*$.cookie('clientMenu', 'request');
				location.reload();*/
			},
			error : function(){
				alert('Controller error....');
			}
		});
		
		
	}
	
	
	if($(this).next('.nearest-Qna').css('display') == 'none'){
		$(this).next('.nearest-Qna').css('display', '');
	}else{
	  $(this).next('.nearest-Qna').css('display', 'none');
  }
});

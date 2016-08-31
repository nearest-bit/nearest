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
	if($(this).next('.nearest-Qna').css('display') == 'none'){
		$(this).next('.nearest-Qna').css('display', '');
  }else{
	  $(this).next('.nearest-Qna').css('display', 'none');
  }
});

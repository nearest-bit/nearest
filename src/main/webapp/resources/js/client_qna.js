/**
 * 
 */

$('#nearest-new-qnaBtn').on('click', function() {
    	var source   = $('#nearest-ordered-mart-list').html();
    	var template = Handlebars.compile(source);
    	$.ajax({
    		url : contextRoot + 'qna/orderMartList.do',
    		datatype : 'json',
    		method : 'post',
    		
    		success : function(result){
    			if(result.status != 'success'){
    				alert('Controller Error...');
    				return;
    			}
    			$('#nearest-select-ordered-mart').nextAll('option').remove();
    			$('#nearest-select-ordered-mart').after(template(result.orderMartList));
    		},
    		error : function() {
    			alert('error...');
    		}
    		
    	});
    });
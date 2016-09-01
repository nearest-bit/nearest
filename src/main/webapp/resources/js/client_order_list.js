/**
 * 
 */

 $(function() {
	 $.ajax({
		 url : contextRoot + 'order/orderCount.do',
		 success : function(result){
			 if(result.status != 'success'){
				 alert('Controller Error....');
				 return;
			 }
			 
			 var source = $('#nearest-purchase-info').html();
			 var templete = Handlebars.compile(source);
			 
			 $('#nearest-purchase-list > div:first-child').append(templete(result));
			 
		 },
		 error : function(result){
			 alert(result.status +' failure...');
		 }
	 });
 });
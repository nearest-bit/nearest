$.ajax({
	  url: contextRoot + 'admin/orderList.do',
	  dataType: 'json',
	  method: 'post',
	  success: function(result){
		  
		  var source   = $("#nearest-order-list").text();
		  var template = Handlebars.compile(source);
		  
		  if (result.orderList != 'success') {
		        alert('실행 중 오류 발생!');
		        return;
		        
		  }
		  console.log(result);
		  
		  $('#nearest-orderList-append').append(template(result));

		  $('.nearest-orderDetail-btn').magnificPopup();
		
		  
		  /* $('.nearest-complete-btn').on('click', function(){
			  
			  if($(this).parent().css('background', '')){
				  $(this).parent().css('background', 'gray');
			  }else{
				  $(this).parent().remove('background', 'gray');
			  }
			  
		  }); */
		 
		  
	  },
	  error: function(result) {
		  alert('안돼!!!!!!!!!!!');
	  }
	  
});  
$.ajax({
	  url: contextRoot + 'admin/orderList.do',
	  dataType: 'json',
	  method: 'post',
	  success: function(result){
		  
		  var source   = $("#nearest-order-list").text();
		  var template = Handlebars.compile(source);
		  
		  if (result.state != 'success') {
		        alert('실행 중 오류 발생!');
		        return;
		        
		  }
		  
		  $('#nearest-orderList-append').append(template(result));

		  $('.nearest-orderDetail-btn').magnificPopup();
		  
		  console.log($('.nearest-order-list-detail').attr('order-state'));
		  
		  var detailBtn = $('.nearest-order-list-detail');
		  
		  console.log(detailBtn);
		  
		  $.each(detailBtn, function(index, item){
			  if($(item).attr('order-state') == '3') {
				  $(item).parent().parent().css('background', 'gray');
			  }
		  });
	  },
	  error: function(result) {
		  alert('안돼!!!!!!!!!!!');
	  }
	  
});  
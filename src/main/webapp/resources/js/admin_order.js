
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
					  $(item).parent().parent().css('display', 'block');
					  };
			  });
			  
			  
		  },
		  error: function(result) {
			  alert('안돼!!!!!!!!!!!');
		  }

	});  


$(function() {
	$(document).on('click','#nearest-order-find', function() {
		callOrderListByCalendar();
	});

	$.datepicker.regional['ko'] = {
        closeText: '닫기',
        prevText: '이전달',
        nextText: '다음달',
        currentText: '오늘',
        monthNames: ['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUN)',
        '7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
        monthNamesShort: ['1월','2월','3월','4월','5월','6월',
        '7월','8월','9월','10월','11월','12월'],
        dayNames: ['일','월','화','수','목','금','토'],
        dayNamesShort: ['일','월','화','수','목','금','토'],
        dayNamesMin: ['일','월','화','수','목','금','토'],
        weekHeader: 'Wk',
        dateFormat: 'yy-mm-dd',
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: true,
        yearSuffix: '',
        showOn: 'both',
        buttonText: "달력",
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        yearRange: 'c-99:c+99',
    };
    $.datepicker.setDefaults($.datepicker.regional['ko']);
 
    $('#osdate').datepicker();
    $('#osdate').datepicker("option", "maxDate", $("#edate").val());
    $('#osdate').datepicker("option", "onClose", function ( selectedDate ) {
        $("#oedate").datepicker( "option", "minDate", selectedDate );
    });
 
    $('#oedate').datepicker();
    $('#oedate').datepicker("option", "minDate", $("#sdate").val());
    $('#oedate').datepicker("option", "onClose", function ( selectedDate ) {
        $("#osdate").datepicker( "option", "maxDate", selectedDate );
    });
})



function callOrderListByCalendar(){
	$('#nearest-orderList-append > *').remove();
		
	var source   = $("#nearest-order-list").text();
	var template = Handlebars.compile(source);
	
	$.ajax({
		url : contextRoot + 'admin/orderListByCalendar.do',
        datatype : 'json',
        method : 'post',
        data :{
      	  orderStatus : $('#nearest-order-select').children('option:selected').text(),
          startDate : $('#osdate').val(),
      	  endDate : $('#oedate').val()
        },
        success : function(result) {
			if (result.status != 'success') {
				swal('실행 중 오류 발생!');
				return;
			}

			for ( var i in result.orderData) {
				result.orderData[i].orderRequestDate = result.orderDateList[i];
			}

			$('#nearest-orderList-append').append(template(result));
			$('.nearest-orderDetail-btn').magnificPopup();
			
			var detailBtn = $('.nearest-order-list-detail');

			$.each(detailBtn, function(index, item) {
				console.log(item);
				if ($(item).attr('order-state') == '3') {
					$(item).parent().parent().css('display', 'block');
				}
			});
        },
        error: function(result){
        	swal('조회 오류');
        }
	});
};
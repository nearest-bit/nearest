$( function() {
	
	$('.nearest-admin-list > ul > li > a[href="#qna"]').click(function () {
		
		var source = $('#nearest-qna-list-template').text();
		var template = Handlebars.compile(source);
		
		$.ajax({
	        url: contextRoot + 'qna/QNAlist.do',
	        dataType: 'json',
	        method: 'post',
	        success: function(result) {
	            if(result.status != 'success'){
	                  alert('실행 중 오류 발생!');
	                  return;
	            }
	            
	            $('#nearest-qnaContent').append(template(result));
	            $('.nearest-answer-btn').magnificPopup();
	        },
	        error: function(){
	            alert('서버 요청 오류!');
	        }
	        
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
	 
	    $('#sdate').datepicker();
	    $('#sdate').datepicker("option", "maxDate", $("#edate").val());
	    $('#sdate').datepicker("option", "onClose", function ( selectedDate ) {
	        $("#edate").datepicker( "option", "minDate", selectedDate );
	    });
	 
	    $('#edate').datepicker();
	    $('#edate').datepicker("option", "minDate", $("#sdate").val());
	    $('#edate').datepicker("option", "onClose", function ( selectedDate ) {
	        $("#sdate").datepicker( "option", "maxDate", selectedDate );
	    });
	});
});

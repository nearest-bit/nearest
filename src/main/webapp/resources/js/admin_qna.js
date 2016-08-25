$( function() {
    
    $(document).ready(function () {
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

$(function(){
	$('#nearest-request-div').on('click', function() {
		$.ajax({
			url: contextRoot + 'qna/update.do',
			dataType: 'json',
			data: {
				'replyContent': $('#nearest-reply').text(),
			},
			method: 'post',
			success: function(result) {
				if(result.status == "success"){
					alert('답변이 등록되었습니다.');
				}else{
					alert('등록 오류');
				}
			},
			error: function(result) {
				alert(result.status);
			}
		});
		if(result.replyStatus == 2){
			
		} else {
			alert('답변 완료 오류');
		}
	});
});

$(function() {
    $('#order-btn').on('click', function() {
        $('#order-search').css('display', 'block');
        $('#order-btn').css('display', 'none');
    });
});

$(function() {
    $('#nearest-request-btn').on('click', function() {
        $('#nearest-request-search').css('display', 'block');
        $('#nearest-request-btn').css('display', 'none');
    });
});

$(function() {
    $('#order-reset-btn').on('click', function() {
        $('#order-search').css('display', 'none');
        $('#order-btn').css('display', '');
    });
});

$(function() {
    $('#nearest-request-reset-btn').on('click', function() {
        $('#nearest-request-search').css('display', 'none');
        $('#nearest-request-btn').css('display', '');
    });
});
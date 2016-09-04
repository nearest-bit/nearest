
$( function() {
	
	$('.nearest-admin-list > ul > li > a[href="#qna"]').click(function () {
		$('#nearest-qnaContent > *').remove();
		var source = $('#nearest-qna-list-template').text();
		var template = Handlebars.compile(source);
		$.ajax({
	        url: contextRoot + 'qna/QNAlistByAdmin.do',
	        dataType: 'json',
	        method: 'post',
	        success: function(result) {
	            if(result.status != 'success'){
	                  swal('실행 중 오류 발생!');
	                  return;
	            }
	           for(var i=0; i<result.simpleDate.length; i++){
	            	result.qnadata[i].localDate = result.simpleDate[i];
	            }
	            $('#nearest-qnaContent').append(template(result));
	            $('.nearest-answer-btn').magnificPopup();
	        },
	        error: function(){
	            swal('서버 요청 오류!');
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
function callQNAListByCalendar(){
	$('#nearest-qnaContent > *').remove();
	var source = $('#nearest-qna-list-template').text();
	var template = Handlebars.compile(source);
	$.ajax({
		url : contextRoot + 'qna/QNAlistByCalendar.do',
        datatype : 'json',
        method : 'post',
        data :{
      	  qnaStatus : $('#nearest-select').children('option:selected').text(),
          startDate : $('#sdate').val(),
      	  endDate : $('#edate').val()
        },
        success : function(result) {
        	 if(result.status != 'success'){
                 swal('실행 중 오류 발생!');
                 return;
           }
           for(var i=0; i<result.simpleDate.length; i++){
	            	result.qnadata[i].localDate = result.simpleDate[i];
	       }
           $('#nearest-qnaContent').append(template(result));
           $('.nearest-answer-btn').magnificPopup();
        },
        error: function(result){
        	swal('조회 오류');
        }
	});
};

$(function(){
	$(document).on('click','#nearest-find ', function() {
		callQNAListByCalendar();
	});
});

$(function(){
	
	var clientNoForReply = '';
	var replyStatus = '';
	var reqNo = '';
	var replyContent = '';
	var reqCnt = '';
	  
	$(document).on('click','.nearest-answer-btn ', function() {
		
		$('#summernote').summernote({
			placeholder: "답변을 입력해주세요.",
			height: 170,
		});
		
		clientNoForReply = $(this).parent().attr('client-no');
		replyStatus = $(this).attr('reply-status');
		reqNo = $(this).parent().attr('content-no');
		$.ajax({
			url: contextRoot + 'qna/reqContent.do',
			dataType: 'json',
			data: {
				'clientNo' : clientNoForReply,
				'reqNo': reqNo
			},
			method: 'post',
			success: function(result){
				if(result.status == "success"){
					if(result.reqMessage == 2){
						$('#qnaId').text('\" '+result.clntName+' \"');
						swal("답변하신 내용입니다.");
						$('#nearest-qnaStory').text(result.qnaStory);
						$('#summernote').summernote('code', result.content);
					} else {
						$('#qnaId').text('\" '+result.clntName+' \"');
						swal("답변을 등록해주세요.");
						$('#nearest-qnaStory').text(result.qnaStory);
						$('#summernote').summernote('code', '');
					}
					
				}else{
					swal('조회 오류');
				}	
			},
			error: function(result){
				swal('조회 오류');
			}
		});
	});
	
	$('#nearest-reply-btn').on('click', function() {
		/*alert($('#nearest-replyContent').val());
		alert(clientNoForReply);
		alert(reqNo);*/
		$.ajax({
			url: contextRoot + 'qna/updateQNA.do',
			dataType: 'json',
			data: {
				'replyContent': $('#summernote').summernote('code'),
				'clientNo': clientNoForReply,
				'contentNo': reqNo
			},
			method: 'post',
			success: function(result) {
				if(result.status == "success"){
					swal(
						"답변이 등록되었습니다!",
						"OK버튼을 눌러주세요.",
						"success"
					);
					/*alert('답변이 등록되었습니다.');*/
					$.magnificPopup.close();
					location.reload();
					/*$('.nearest-admin-list > ul > li > a').attr('aria-expanded', 'true');*/
				}else{
					swal('등록 오류');
				}
			},
			error: function(result) {
				swal(result.status);
			}
		});
		
	});
});

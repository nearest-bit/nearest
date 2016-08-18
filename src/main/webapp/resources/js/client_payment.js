/**
 * 클라이언트 결제
 */

var IMP = window.IMP;
	IMP.init('imp16866345');

	$('#purchaseBtn').click(function() {
		
		if (checkVal()) {
			return;
		}
		
		
		IMP.request_pay({
			pg : 'inicis', // version 1.1.0부터 지원. 
			/*
			    'kakao':카카오페이,
			    'inicis':이니시스, 'html5_inicis':이니시스(웹표준결제), 
			    'nice':나이스, 
			    'jtnet':jtnet, 
			    'uplus':LG유플러스,
			    'danal':다날
			 */
			pay_method : $('.purchaseMethod:checked').val(), // 'card':신용카드, 'trans':실시간계좌이체, 'vbank':가상계좌, 'phone':휴대폰소액결제
			merchant_uid : 'merchant_' + new Date().getTime(),
			name : '주문명:결제테스트',
			amount : $('#nearest-payment-price').attr('value'),
			buyer_email : $('#form-email').val(),
			buyer_name : $('#form-name').val(),
			buyer_tel : $('#phone-number').val(),
			buyer_addr : $('#form-addr').val(),
			buyer_postcode : $('#form-postcode').val()
		}, function(rsp) {
			if (rsp.success) {
				var msg = '결제가 완료되었습니다.';
				msg += '고유ID : ' + rsp.imp_uid;
				msg += '상점 거래ID : ' + rsp.merchant_uid;
				msg += '결제 금액 : ' + rsp.paid_amount;
				msg += '카드 승인번호 : ' + rsp.apply_num;
				alert('결제성공 성현이형 사랑해');
				//custom
				var martNo = new Array();
				var prodNo = new Array();
				var prodEnt = new Array();
				for( var i=0; i<$('.nearest-cart-prodNo').size(); i++){
					martNo[i] = $($('.nearest-cart-martNo')[i]).val();
					prodNo[i] = $($('.nearest-cart-prodNo')[i]).val();
					prodEnt[i] = $($('.nearest-prod-ent')[i]).val();
				}
				
				$.ajax({
					url : contextRoot + 'order/addOrder.do',
					datatype : 'json',
					method : 'post',
					data : {
						martNo : martNo,
						prodNo : prodNo,
						prodEnt : prodEnt
					},
					success : function(result){
						
						if(result.status != 'success'){
				              alert('failure');
				              return;
				        }
						
						alert('주문 등록 성공');
					},
					error : function(){
						alert('error');
					}
				});
				/*alert($($('.nearest-cart-prodNo')[0]).val()+'//'+$($('.nearest-cart-martNo')[0]).val()+'//'+$($('.nearest-prod-ent')[0]).text());
				alert($($('.nearest-cart-prodNo')[1]).val()+'//'+$($('.nearest-cart-martNo')[1]).val()+'//'+$($('.nearest-prod-ent')[1]).text());*/
			} else {
				var msg = '결제에 실패하였습니다.';
				msg += '에러내용 : ' + rsp.error_msg;
			}
		});
	});
	//validation check
	function checkVal(){

		for( var i in $('.form-group > input[type="text"]')){
			if( $($('.form-group > input[type="text"]')[i]).val() == null || $($('.form-group > input[type="text"]')[i]).val() == '' ){
				alert('모든 정보를 입력 해주세요');
				return true;
			} else if (i== $('.form-group > input[type="text"]').length-1) {
				return false;
			}
		}
	}
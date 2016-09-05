/**
 * 클라이언트 결제
 */

var IMP = window.IMP;
	IMP.init('imp16866345');

	$('#purchaseBtn').click(function() {
		
		if (checkVal()) {
			return;
		}else if (chechGetTime()){
			return;
		}else if(checkAgree()){
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
				//custom
				var martNo = '';
				var prodNo = '';
				var prodEnt = '';
				var prodName = '';
				var price = '';
				var discount = '';
				for( var i=0; i<$('.nearest-cart-prodNo').size(); i++){
					if (i == ($('.nearest-cart-prodNo').size() - 1) ){
						martNo += $($('.nearest-cart-martNo')[i]).val();
						prodNo += $($('.nearest-cart-prodNo')[i]).val();
						prodEnt += $($('.nearest-prod-ent')[i]).text();
						prodName += $($('.nearest-cart-prodName')[i]).val();
						price += $($('.nearest-cart-price')[i]).val();
						discount += $($('.nearest-cart-discount')[i]).val();
					}else{
						martNo += $($('.nearest-cart-martNo')[i]).val()+',';
						prodNo += $($('.nearest-cart-prodNo')[i]).val()+',';
						prodEnt += $($('.nearest-prod-ent')[i]).text()+',';
						prodName += $($('.nearest-cart-prodName')[i]).val()+',';
						price += $($('.nearest-cart-price')[i]).val()+',';
						discount += $($('.nearest-cart-discount')[i]).val()+',';
					}
					
				}
				
				$.ajax({
			        url : contextRoot + 'order/addOrder.do',
			        datatype : 'json',
			        method : 'post',
			        data : {
			          martNo : martNo,
			          prodNo : prodNo,
			          prodEnt : prodEnt,
			          prodName : prodName,
			          price : price,
			          discount : discount,
			          receiveDataTime : $('#nearest-receive-time').val()
			        },
			        success : function(result){
			        	
			         if(result.addOrder != 'success'){
	                 alert('insert table orders failure');
	                 return;
			          }else if(result.addProdOrder != 'success'){
			        	  alert('insert table prod_orders failure');
			        	  return;
			          }
			          cartAlert(5);
			          $.ajax({
			        	 url : contextRoot + 'cart/removeCartList.do',
			        	 datatype : 'json',
			        	 method : 'post'
			          });
			          $.magnificPopup.close();
			          location.reload();
			        },
			        error : function(){
			          alert('주문 실패 error.....');
			        }
			      });
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
				cartAlert(1);
				return true;
			} else if (i== $('.form-group > input[type="text"]').length-1) {
				return false;
			} 
		}
		
	}
	
	function checkAgree(){
		
		
		if ( $('#nearest-agree').is(':checked') ){
			return false;
		}else{
			cartAlert('checkAgree');
			$('#nearest-agree').focus();
			return true;
			
		}
	}
	
	$('#nearest-agree').on('click', function(){
		if($('#nearest-agree').is(':checked')){
			cartAlert(3);
			return;
		}
		$('.cancel').on('click', function(){
			$('#nearest-agree').prop('checked', false);
		});
	});
	
	function chechGetTime(){
		if( $('#nearest-receive-time').val() == null || $('#nearest-receive-time').val() == ''){
			cartAlert('checkGetTime');
			return true;
		}else{
			return false;
		}
	}
	
	$('#input-myinfo').on('click', function(){
		if( $('#input-myinfo').is(':checked') ){
			$.ajax({
				url : contextRoot + 'client/purchaseInfo.do',
				datatype : 'json',
				method : 'post',
				success : function(result){
					if(result.status != 'success'){
						alert('Controller Error......');
						return;
					}
					
					$('#form-email').val(result.data.email);
					$('#form-name').val(result.data.name);
					$('#phone-number').val(result.data.phone);
					
				}
			});
		}else{
			$('#form-email').val('');
			$('#form-name').val('');
			$('#phone-number').val('');
		}
	});
	
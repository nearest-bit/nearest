function adminAlert(option) {
	switch(option) {
		case 'registSuccess':
			swal("상품등록이 완료되었습니다.","","success");
			break;
		case 'needImage':
			sweetAlert("이런...", "상품이미지를 등록해주세요.", "error");
			break;
	}
}

function cartAlert(option) {
	switch (option) {
	case 0:
		/*swal("삭제할 상품이 없습니다.");*/
		swal({
			title : "<small>삭제할 상품이 없습니다.</small>",
			html : true
		});
		break;
	case 1:
		sweetAlert("이런...", "데이터를 모두 입력해주세요!", "error");
		break;
	case 2:
		swal("삭제되었습니다.!", "", "success");
		break;
	case 3:
		swal({
			title : "이용약관",
			text : "수령가능 시간 30분 이내 수령 못할 시 사전에 구매처에 연락 해야하며 연락부재로 인한 부분은 본인이 책임져야 합니다. ",
			type : "warning",
			showCancelButton : true,
			confirmButtonColor : "#DD6B55",
			confirmButtonText : "동의!",
			cancelButtonText : "동의하지않음!",
			closeOnConfirm : false,
			closeOnCancel : false
		}, function(isConfirm) {
			if (isConfirm) {
				swal("동의","이용약관 동의가 완료되었습니다.","success");
			} else {
				swal("취소", "이용약관 동의가 취소되었습니다.", "error");
			}
		});
		break;
	 case 4:
		sweetAlert("이런...", "최소 구매 수량 입니다!", "error");
		break;
	 case 5:
		 swal("주문 성공!", "", "success");
		 break;
	 case 'checkGetTime':
		
		swal({
			title : "<small>수령시간을 선택해 주세요.</small>",
			html : true
		});
		break;
	 case 'checkAgree':
			
		swal({
			title : "<small>이용약관을 읽고 동의 해주세요.</small>",
			html : true
		});
		break;
	 case 'noCartList':
			
		swal({
			title : "<small>찜하신 물품이 없습니다.</small>",
			html : true
		});
		break;
	 
	}
}

function clientQnaAlert(option) {
	switch (option) {
		case 'noCheckMart':
		   sweetAlert("문의처를 선택해주세요!", "", "error");
		   break;
		case 'addQnaSuccess':
		   sweetAlert("문의사항 등록 완료!", "", "success");
		   break;
	}
}

function clientInfoUpdate(option) {
	switch (option) {
		case 'noPassword':
		   sweetAlert("비밀번호를 입력해주세요!", "", "error");
		   break;
		case 'checkPassword':
			   sweetAlert("비밀번호가 일치하지 않습니다!", "", "error");
			   break;
		case 'incorrectEmail':
			   sweetAlert("이메일 형식이 일치하지 않습니다!", "", "error");
			   break;
		case 'successUpdate':
		   sweetAlert("회원정보 수정 완료!", "", "success");
		   break;
	}
}

function clientLogin(option) {
	switch (option) {
		case 'incorrectInfo':
		   sweetAlert("ID/Password를 확인하세요!", "", "error");
		   break;
		case 'loginFail':
			   sweetAlert("로그인이 실패하였습니다!", "", "error");
			   break;

	}
}

function clientAlert(option) {
	switch (option) {
		case 'nodata':
		   sweetAlert("검색결과가 없습니다!", "", "error");
		   break;
	}
}

function mainAlert(option) {
	switch (option) {
		case 'idEmpty':
			sweetAlert('아이디를 입력해주세요.', '','error');
			break;
		case 'idDuplicate':
			sweetAlert('중복된 아이디입니다.', '','error');
			break;
		case 'registSuccess':
			sweetAlert('회원가입이 완료되었습니다.', '','success');
			break;
		case 'cartSuccess':
			sweetAlert('찜하셨습니다.', '', 'success');
			break;
		default:
			break;
	}
}
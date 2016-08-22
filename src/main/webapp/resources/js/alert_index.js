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
			title : "Are you sure?",
			text : "Your will not be able to recover this imaginary file!",
			type : "warning",
			showCancelButton : true,
			confirmButtonColor : "#DD6B55",
			confirmButtonText : "Yes, delete it!",
			cancelButtonText : "No, cancel plx!",
			closeOnConfirm : false,
			closeOnCancel : false
		}, function(isConfirm) {
			if (isConfirm) {
				swal("Deleted!", "Your imaginary file has been deleted.", "success");
			} else {
				swal("Cancelled", "Your imaginary file is safe :)", "error");
			}
		});
		break;
	 case 4:
		sweetAlert("이런...", "최소 구매 수량 입니다!", "error");
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
		case 'registSuccess':
			sweetAlert('회원가입이 완료되었습니다.', '','success');
		default:
			break;
	}
}
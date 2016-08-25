function cartAlert(x) {
	switch (x) {
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
	 case 5:
		 swal("주문 성공!", "", "success");
		 break;
	}
}
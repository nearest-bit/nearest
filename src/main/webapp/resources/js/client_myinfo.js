/**
 * 
 */

function emailCheck(strEmail)
	{
		var regExp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
			//입력을 안했으면 
			if(strEmail == ''){
				return false;
			}
			//이메일 형식에 맞지않으면
			if (!strEmail.match(regExp)){
				return false;
			}
		return true;
	}
  
  $('#myInfoBtn').on('click', function(){
	  $.ajax({
		  url : contextRoot + 'client/myinfo.do',
		  datatype : 'json',
		  method : 'post',
		  success : function(result){
			  
			  if(result.status != 'success'){
				  alert('Controller error');
				  return;
			  }
			  
	 		  $('#client-name').text(result.data.name);
	 		  $('#client-id').text(result.data.id);
	 		  $('#client-birth').text(result.birth);
			  $('#client-phone').text(result.data.phone);
			  $('#client-email').text(result.data.email); 
			  $('#client-email-input').val(result.data.email);
			  
		  },
		  error : function(){
			  alert('request error...');
		  }
	  });
  });
  
  
  
  $('#update-email-btn').on('click', function(){
	  if($(this).val() != '취소'){
	      $('#client-email').css('display', 'none');
	      $('#client-email-input').attr('type', 'text').val($('#client-email').text()).focus();;
	      $(this).attr('class', 'btn btn-default').val('취소');
	    }else{
	      $('#client-email').css('display', '');
	      $('#client-email-input').attr('type', 'hidden').val('');
	      $(this).attr('class', 'btn btn-success').val('E-mail변경');
	    }
  });
  
  $('#myinfo-updateBtn').on('click', function(){
	  
	  if( $('#update-password').val() == "" ){
		clientInfoUpdate('noPassword');
		return;
	  }else if( $('#update-password').val() != $('#update-password-check').val() ){
		clientInfoUpdate('checkPassword');
		return;
	  }
	  
	  if($('#client-email-input').val() != '' || $('#client-email-input').val() != null){
		  if( emailCheck($('#client-email-input').val()) != true ){
			  clientInfoUpdate('incorrectEmail');
			  return;
		  }
	  }
	  
	  $.ajax({
		  url : contextRoot + 'client/update.do',
		  datatype : 'json',
		  method : 'post',
		  data : {
			  password : $('#update-password').val(),
			  email : $('#client-email-input').val()
		  },
		  success : function(result){
			  
			  if(result.status != 'success'){
				  alert('Controller Error....');
				  return;
			  }
			  clientInfoUpdate('successUpdate');
			  $('button[class="confirm"]').on('click', function() {
				  location.reload();
			  });
			  
		  },
		  error : function(){
			  alert('Request Error');
		  }
	  });
  });
  
$('#update-password-check').on('keyup', function() {
	if( $('#update-password').val() != $('#update-password-check').val() ){
		$('#alert-check-password').text('비밀번호가 일치하지 않습니다.').css('color', 'red');
	}else{
		$('#alert-check-password').text('비밀번호가 일치합니다.').css('color', 'blue');
	}
});
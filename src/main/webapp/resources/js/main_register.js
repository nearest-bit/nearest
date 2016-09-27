var duplicate = '';
  
  $(document).on('click','.regBtn', function(){
	  if($('input[name="reg-id"]').val() == '') {
		  mainAlert('idEmpty');
		  return;
	  }
	  /*alert($('input[name="reg-id"]').val())
	  alert($('input[name="reg-password"]').val())
	  alert($('input[name="reg-name"]').val())
	  alert($('input[name="reg-birth"]').val())
	  alert($('input[name="reg-email"]').val())
	  alert($('input[name="reg-phone"]').val())*/
	  $.ajax({
		  url : contextRoot + 'client/register.do',
		  method : 'post',
		  dataType : 'json',
		  data : {
			  id : $('input[name="reg-id"]').val(),
			  password : $('input[name="reg-password"]').val(),
			  name : $('input[name="reg-name"]').val(),
			  birth : $('input[name="reg-birth"]').val(),
			  email : $('input[name="reg-email"]').val(),
			  phone : $('input[name="reg-phone"]').val()
		  },
		  success : function(result){
			
			  if(duplicate == true){
				  mainAlert('idDuplicate');
				  return;
				  
			  }else{
				  mainAlert('registSuccess');
				  $.magnificPopup.close();
			  }
			  
		  },
		  error : function(){
			  alert('controller error....');
		  }
	  });
  });
  
  $('input[name="reg-id"]').on('keyup', function(event){
	  $.ajax({
		  dataType : 'json',
		  url : nodeRoot + 'client/checkDupl.do',
		  data : {
			  id : $('input[name="reg-id"]').val()
		  },
		  success : function(result){
			  
			  if( result == true ){						  
				  $('#nearest-checkDupl').text('중복된 아이디 입니다').css('color', 'red');
				  duplicate = true;
			  }else if( result == false ){				  
				  $('#nearest-checkDupl').text('사용 가능한 아이디 입니다.').css('color', '#00ffdc');
				  duplicate = false;
			  }
		  },
		  error : function(){
			  alert('error...');
		  }
	  });
  });
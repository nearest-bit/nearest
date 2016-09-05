var duplicate = '';
  
  $(document).on('click','.regBtn', function(){
	  if( $('input[name="reg-id"]').val() == '') {
		  mainAlert('idEmpty');
		  return;
	  }
	  
	  $.ajax({
		  dataType : 'json',
		  url : contextRoot + 'client/register.do',
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
				  $('#nearest-checkDupl').text('사용 가능한 아이디 입니다.').css('color', 'blue');
				  duplicate = false;
			  }
		  },
		  error : function(){
			  alert('error...');
		  }
	  });
  });
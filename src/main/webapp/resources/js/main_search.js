var prodListSource = $('#nearest-product-list-template').text();
var prodListTemplete = Handlebars.compile(prodListSource);
var pageNavSource = $('#nearest-product-pagenav-template').text();
var pageNavTemplete = Handlebars.compile(pageNavSource);

$('#nearest-search').click(function(){

  if($('input[name=searchContent]').val().trim() == ""){
    alert('검색어를 입력해주세요.');
    return;
  }
  
  $('#nearest-product-list').children().remove();
  $('#nearest-pageno').children().remove();
  
  $.ajax({
    url :  contextRoot + 'product/list.do',
    datatype : 'json',
    method : 'post',
      
    data : {
      searchTag : $('select[name=searchTag]').val(),
      searchContent : $('input[name=searchContent]').val()
    },
    success : function(result) {
      if(result.status != 'success'){
        alert('검색오류');
        return;
      }
        
      $('#nearest-product-list').append(prodListTemplete(result));
        
      alert(JSON.stringify(result.total));
        
      var pageUnit;
        
      if ( JSON.stringify(result.total) % 9 != 0){
      	pageUnit = parseInt( JSON.stringify(result.total) / 9 ) + 1;
      }else{
      	pageUnit = parseInt( JSON.stringify(result.total) / 9 );
      }
        
      if ( pageUnit >= 5) {
    	  pageUnit = 5; 
      }
        
      if (pageUnit >= 1){
      	for(var i=1; i<=pageUnit; i++){
       		$('#nearest-pageno').append(pageNavTemplete({i}));   		
       	}
      }
        
      alert(pageUnit);
    },
    error : function() {
      alert("error....");
    }
  });
});
var prodListSource = $('#nearest-product-list-template').text();
var prodListTemplete = Handlebars.compile(prodListSource);
var pageNavSource = $('#nearest-product-pagenav-template').text();
var pageNavTemplete = Handlebars.compile(pageNavSource);

/* page 버튼 누르면 재검색 하기위한 변수 */
var searchTag = "";
var searchContent = "";

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
      searchTag = $('select[name=searchTag]').val();
      searchContent = $('input[name=searchContent]').val();
      alert(pageUnit+'//'+searchTag+'//'+searchContent);
    },
    error : function() {
      alert("error....");
    }
  });
});

$(document).on('click','#nearest-pageno > li',function (){
	alert(searchTag+'//'+searchContent+$(this).children('a').text());
	$('#nearest-product-list').children().remove();
	
	$.ajax({
	    url :  contextRoot + 'product/list.do',
	    datatype : 'json',
	    method : 'post',
	      
	    data : {
	      searchTag : searchTag,
	      searchContent : searchContent,
	      currentPage : $(this).children('a').text()
	    },
	    success : function(result) {
	    	if(result.status != 'success'){
	            alert('재검색오류');
	            return;
	          }
	    	$('#nearest-product-list').append(prodListTemplete(result));
	    },
	    error : function() {
	        alert("error....");
	      }
  });
});
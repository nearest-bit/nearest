var prodListSource = $('#nearest-product-list-template').text();
var prodListTemplete = Handlebars.compile(prodListSource);
var pageNavSource = $('#nearest-product-pagenav-template').text();
var pageNavTemplete = Handlebars.compile(pageNavSource);

/* 검색 변수 */
var searchTag = "";
var searchContent = "";
var pageUnit = "" ;
var totalPage = "";
var currentPage = "";
var nextPage = "";
var priviousPage = "";
var total = "";

// 검색 했을때 
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
        
      total = JSON.stringify(result.total);
        
      if ( total % 9 != 0){
      	totalPage = parseInt( total / 9 ) + 1;
      }else{
    	totalPage = parseInt( total / 9 );
      }
      
      if ( totalPage >= 5) {
    	  pageUnit = 5; 
    	  nextPage = pageUnit + 1;
    	  
    	  $('span[data-next-page=""]').attr('data-next-page', nextPage);
      }else if( totalPage == 0 ){
    	  pageUnit = 0;
      }
        
      if (pageUnit >= 1){
      	for(var i=1; i<=pageUnit; i++){
       		$('#nearest-pageno').append(pageNavTemplete({i}));   		
       	}
      }
      searchTag = $('select[name=searchTag]').val();
      searchContent = $('input[name=searchContent]').val();
      alert(pageUnit+'//'+searchTag+'//'+searchContent+'//'+totalPage);
    },
    error : function() {
      alert("error....");
    }
  });
});

//페이지 번호 눌렀을때
$(document).on('click','#nearest-pageno > li',function (){
	
	$('#nearest-product-list').children().remove();
	
	currentpage = $(this).children('a').text();
	
	alert(searchTag+'//'+searchContent+"//"+currentpage);
	
	$.ajax({
	    url :  contextRoot + 'product/list.do',
	    datatype : 'json',
	    method : 'post',
	      
	    data : {
	      searchTag : searchTag,
	      searchContent : searchContent,
	      currentPage : currentpage
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

//다음 버튼 눌렀을때
$(document).on('click', 'a[aria-label="Next"]', function() {
	
	alert('currentPage = ' + $(this).children('span').attr('data-next-page'));
	
	currentPage = $(this).children('span').attr('data-next-page');
	
	$('#nearest-product-list').children().remove();
	  $('#nearest-pageno').children().remove();
	  
	  $.ajax({
	    url :  contextRoot + 'product/list.do',
		datatype : 'json',
		method : 'post',
	  
		data : {
		  searchTag : searchTag,
		  searchContent : searchContent,
		  currentPage : currentPage
		},
		success : function(result) {
		  if(result.status != 'success'){
		    alert('검색오류');
		    return;
		  }
		    
		  $('#nearest-product-list').append(prodListTemplete(result));
		    
		  alert(JSON.stringify(result.total));
		    
		  if( totalPage >= (nextPage + 5)) {
			  pageUnit = (nextPage + 5);
			  
			  $('span[data-next-page=""]').attr('data-next-page', nextPage);
		  }else{
			  pageUnit = totalPage+1;
		  }
		 
		  alert(totalPage+'//'+nextPage+"//"+pageUnit);
		 
		  if (pageUnit >= 1){
		  	for(var i=nextPage; i < pageUnit; i++){
		   		$('#nearest-pageno').append(pageNavTemplete({i}));   		
		   	}
		  	
		  }
		  if(totalPage >= pageUnit){
		      nextPage = pageUnit;
			  $('span[data-next-page]').attr('data-next-page', nextPage);
		  }
		  alert(pageUnit+'//'+searchTag+'//'+searchContent);
		},
		error : function() {
		  alert("error....");
		}
  });
});
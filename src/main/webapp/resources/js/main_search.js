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
var previousPage = "";
var total = "";

// 검색 했을때 
$('#nearest-search').click(function(){
	
	//초기화
	searchTag = "";
	searchContent = "";
	pageUnit = "" ;
	totalPage = "";
	currentPage = "";
	nextPage = "";
	priviousPage = "";
	total = "";

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
      searchTag : $('select[name="searchTag"]').val(),
      searchContent : $('input[name="searchContent"]').val()
    },
    success : function(result) {
      if(result.status != 'success'){
        alert('검색오류');
        return;
      }
        
      $('#nearest-product-list').append(prodListTemplete(result));
        
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
    	  $('span[data-next-page=""]').attr('data-next-page', '');
      }else{
    	  pageUnit = totalPage;
      }
        
      if (pageUnit >= 1){
      	for(var i=1; i<=pageUnit; i++){
       		$('#nearest-pageno').append(pageNavTemplete({i}));   		
       	}
      }
      searchTag = $('select[name=searchTag]').val();
      searchContent = $('input[name=searchContent]').val();
      
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

function search(){

	
}

//다음 버튼 눌렀을때
$(document).on('click', 'a[aria-label="Next"]', function() {
	
	currentPage = $(this).children('span').attr('data-next-page');
	
	$('#nearest-product-list').children().remove();
	  $('#nearest-pageno').children().remove();
	  
	  if( $(this).children('span').attr('data-next-page') == '' ){
		  alert('끝 페이지 입니다.');
	  }
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
			    
			  if( totalPage >= (nextPage + 5)) {
				  pageUnit = (nextPage + 5);
				  
				  $('span[data-next-page=""]').attr('data-next-page', nextPage);

			  }else{
				  pageUnit = totalPage+1;
				  $('span[data-next-page]').attr('data-next-page', '');
			  }
			  
			  previousPage = nextPage - 1;
			  $('span[data-previous-page]').attr('data-previous-page', previousPage );
			 
			  if (pageUnit >= 1){
			  	for(var i=nextPage; i < pageUnit; i++){
			   		$('#nearest-pageno').append(pageNavTemplete({i}));   		
			   	}
			  	
			  }
			  if(totalPage >= pageUnit){
			      nextPage = pageUnit;
				  $('span[data-next-page]').attr('data-next-page', nextPage);
			  }
			  /*alert('[pageUnit] : '+pageUnit+' [totalPage] : '+totalPage+' [currentPage] : '+currentPage+' [nextPage] : '+nextPage+' [priviousPage] : '+priviousPage+' [total] : '+total);*/
			},
			error : function() {
			  alert("error....");
			}
	  });
	  
});

//이전 버튼 눌렀을때
$(document).on('click', 'a[aria-label="Previous"]', function() {
	
	currentPage = $(this).children('span').attr('data-previous-page');
	
	$('#nearest-product-list').children().remove();
	$('#nearest-pageno').children().remove();
	  
	  $.ajax({
	    url :  contextRoot + 'product/list.do',
		datatype : 'json',
		method : 'post',
	  
		data : {
		  searchTag : searchTag,
		  searchContent : searchContent,
		  currentPage : previousPage
		},
		success : function(result) {
		  if(result.status != 'success'){
		    alert('검색오류');
		    return;
		  }
		  
		  $('#nearest-product-list').append(prodListTemplete(result));
		  
		
		  if (pageUnit >= 1){
		  	for(var i=(previousPage - 4); i <= previousPage; i++){
		   		$('#nearest-pageno').append(pageNavTemplete({i}));   		
		   	}
		  	
		  }
		  if(previousPage > 5 ){
			  previousPage -= 5 ;
			  $('span[data-previous-page]').attr('data-previous-page', previousPage );
		  }
		  if(nextPage > 6){
			  nextPage -= 5;  
			  $('span[data-next-page]').attr('data-next-page', nextPage);
		  }
		  /*alert('[pageUnit] : '+pageUnit+' [totalPage] : '+totalPage+' [currentPage] : '+currentPage+' [nextPage] : '+nextPage+' [priviousPage] : '+priviousPage+' [total] : '+total);*/
		},
		error : function() {
		  alert("error....");
		}
  });
});
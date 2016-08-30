var prodListSource = $('#nearest-product-list-template').text();
var prodListTemplete = Handlebars.compile(prodListSource);
var pageNavSource = $('#nearest-product-pagenav-template').text();
var pageNavTemplete = Handlebars.compile(pageNavSource);

/* 검색 변수 */
// 검색 옵션
var searchTag = "";

// 검색 키워드
var searchContent = "";

// 화면에 표시되는 페이지 수
var pageUnit = "" ;

// 총 페이지 수
var totalPage = "";

// 현재 페이지
var currentPage = 1;

// 다음 페이지 번호
var nextPage = "";

// 이전 페이지 번호
var previousPage = "";

// 총 데이터의 수
var total = "";

var indexOption = "";

var searchMartName;

// 검색 했을때 
$('#nearest-search').click(function(){
	indexOption = "search";
	
	//초기화
	searchTag = "";
	searchContent = "";
	pageUnit = "" ;
	totalPage = "";
	currentPage = 1;
	nextPage = "";
	previousPage = "";
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
    	  
      }else if( totalPage == 0 ){
    	  pageUnit = 0;
      }else{
    	  pageUnit = totalPage;
      }
      
      searchTag = $('select[name=searchTag]').val();
      searchContent = $('input[name=searchContent]').val();
      
      $('.fh5co-project-item > img').magnificPopup();
      
      
    },
    error : function() {
      alert("error....");
    }
  });
  
});

$(function() {
	if(searchMartName != undefined) {
		indexOption = 'index';
	}
	
	switch(indexOption){
		case 'index':
			$(window).scroll(function() {
				if($(window).scrollTop() >= $(document).height()-$(window).height()-20) {
					currentPage++;
					
					console.log('currentPage : ' + currentPage);
					
					$.ajax({
					    url :  contextRoot + 'product/list.do',
					    datatype : 'json',
					    method : 'post',
					      
					    data : {
					      searchTag: 'marts',
						  searchContent: searchMartName,
					      currentPage : currentPage,
					      option: 'client'
					    },
					    success : function(result) {
					      			    	
					      if(result.status != 'success'){
					        alert('검색오류');
					        return;
					      }
					        
					      $('#nearest-product-list').append(prodListTemplete(result));
					        
				//		      alert(JSON.stringify(result.total));
					      total = JSON.stringify(result.total);
					        
					      if ( total % 9 != 0){
					      	totalPage = parseInt( total / 9 ) + 1;
					      }else{
					    	totalPage = parseInt( total / 9 );
					      }
					      
					      if ( totalPage >= 5) {
					    	  pageUnit = 5; 
					    	  nextPage = pageUnit + 1;
					    	  
					      }else if( totalPage == 0 ){
					    	  pageUnit = 0;
					      }else{
					    	  pageUnit = totalPage;
					      }
					      
					      $('.fh5co-project-item').magnificPopup();
					      
					      
					    },
					    error : function() {
					      alert("error....");
					    }
					});
				}
			});
			
			break;
		case 'search':
			$(window).scroll(function() {
				if($(window).scrollTop() >= $(document).height()-$(window).height()-20) {
					currentPage++;
					
					$.ajax({
					    url :  contextRoot + 'product/list.do',
					    datatype : 'json',
					    method : 'post',
					      
					    data : {
					      searchTag : $('select[name="searchTag"]').val(),
					      searchContent : $('input[name="searchContent"]').val(),
					      currentPage : currentPage,
					      option: 'client'
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
					    	  
					      }else if( totalPage == 0 ){
					    	  pageUnit = 0;
					      }else{
					    	  pageUnit = totalPage;
					      }
					      
					      $('.fh5co-project-item').magnificPopup();
					      
					      
					    },
					    error : function() {
					      alert("error....");
					    }
					});
				}
			});
			
			break;
	}
	
});
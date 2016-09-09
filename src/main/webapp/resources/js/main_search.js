
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

// 다음 페이지 번호
var nextPage = "";

// 이전 페이지 번호
var previousPage = "";

// 총 데이터의 수
var total = "";

function productSearch(){

	
  $.ajax({
	url :  contextRoot + 'product/list.do',
    datatype : 'json',
    method : 'post',
    data : {
      searchTag : $('select[name="searchTag"]').val(),
      searchContent : $('#nearest-search').val(),
      currentPage: currentPage,
      option: 'client',
      martNo : martNo,
      majorCat : majorCat,
      subCat : subCat,
      searchLat : searchLat,
      searchLng : searchLng
    },
    success : function(result) {
      if(result.status != 'success'){
        alert('검색오류');
        return;
      }
      
      if( result.productData == undefined || result.productData.length == 0 ){
    	  clientAlert('nodata');
    	  return;
      }
      console.log(result);
      if(result.searchKeyword == 'prods'){
    	  searchMartName = '';
    	  
    	  $('#nearest-menu-category-wrap').css('display', 'none');
    	  $('#nearest-search-result').css('display','inline');
    	  $('#nearest-search-keyword-result').css('display', 'none');
    	  $('#nearest-search-keyword-result').next('span').text('상품');
    	  $('#nearest-search-content-result').text('\''+result.searchContent+'\'');
    	  $('#nearest-search-content-result').css('display', '');
      }else if(result.searchKeyword == 'marts'){
    	  console.log(result.productData);
    	  $('#nearest-menu-category-wrap').css('display', 'inline');
    	  $('#nearest-search-result').css('display','inline');
    	  $('#nearest-search-keyword-result').next('span').text('의 상품');
    	  $('#nearest-search-keyword-result').text('\''+result.searchContent+'\'');
    	  if(result.productData.length > 0){
    		  martNo = JSON.stringify(result.productData[0].mart.no);  
    	  }
    	  $('#nearest-search-content-result').css('display', 'none');
      }
      
      var products = result.productData;
      
      for(var i in products) {
    	  products[i].price = ' ' + parseInt(products[i].price - (products[i].price * products[i].discountRate / 100));
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
      searchContent = $('#nearest-search').val();
      
      $('.fh5co-project-item').magnificPopup();
      
      
    },
    error : function() {
      alert("error....");
    }
  });
}

// 검색 했을때 
$('#nearest-search').on('keypress', function(event){
	
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
	martNo = '';
	majorCat = '';
	subCat = '';
	

	if(event.keyCode == 13){
	  
	  if($.trim($('#nearest-search').val())== ""){
		    alert('검색어를 입력해주세요.');
		    return;
	  }
	  
	  $('#nearest-product-list').children().remove();
	  $('#nearest-pageno').children().remove();
	  
	  productSearch();
	  
	}
  

});
	  
//카테고리 검색
$('.category-link').on('click', function(e){
	e.preventDefault();
	majorCat = '';
	subCat = '';
	currentPage = 1;
	
	majorCat = $(this).attr('data-level');
	subCat = $(this).attr('data-code');


	if(martNo != '' && majorCat != '' && subCat != ''){
     
	 $('#nearest-product-list').children().remove();
     $('#nearest-pageno').children().remove();
			
	  productSearch();
	}
	
});

//카테고리 메뉴 클릭 이벤트 없앰
$('.categoty-menu').click(function(e){
	e.preventDefault();
});

$(function() {	
	
	

	$(window).scroll(function() {
		if($(window).scrollTop() >= $(document).height()-$(window).height()-20) {

			if(searchMartName != '') {
				indexOption = 'index';
			}else if(searchLat != '' && searchLng != ''){
				indexOption = 'search';
			}

			
			currentPage++;
			
			
			console.log('scroll searchMartName : ' + searchMartName);
			console.log('scroll currentPage : ' + currentPage);
			console.log('scroll lat : ' + searchLat);
			console.log('scroll searchContent : ' + searchContent);
			console.log('scroll indexOption : ' + indexOption);
			
			
			switch(indexOption) {
				case 'index':
					searchTag = 'marts';
					searchContent = searchMartName;
					
					break;
				case 'search':
					searchTag = $('select[name="searchTag"]').val();
				    searchContent = $('#nearest-search').val();
					
					break;
			}

			$.ajax({
			    url :  contextRoot + 'product/list.do',
			    datatype : 'json',
			    method : 'post',
			      
			    data : {
			      searchTag: searchTag,
				  searchContent: searchContent,
			      currentPage : currentPage,
			      option: 'client',
			      martNo : martNo,
			      majorCat : majorCat,
			      subCat : subCat,
			      searchLat : searchLat,
			      searchLng : searchLng
			    },
			    success : function(result) {

			      			    
			    	
			      if(result.status != 'success'){
			        alert('검색오류');
			        return;
			      }
			      
			      if(result.productData.length > 0){
		    		  martNo = JSON.stringify(result.productData[0].mart.no);  
		    	  }
			        
			      $('#nearest-product-list').append(prodListTemplete(result));
			      
			      var products = result.productData;
			      var indexProducts = $('.nearest-product-list-price');
			      var discountPrice;
			      var indexValue;
			      
			      for (var i in products) {					    	  
			    	  if(products[i].discountRate > 0) {
			    		  indexValue = parseInt(i)+parseInt((result.currentPage-1)*9);
			    		  
			    		  console.log(indexValue);
			    		  
			    		  console.log($(indexProducts[indexValue]).html());
			    		  
		    			  $(indexProducts[indexValue]).text(products[i].price);
			    		  $(indexProducts[indexValue]).css('text-decoration', 'line-through');
			    		  
			    		  discountPrice = $('<span>').text(' ' + parseInt(products[i].price - (products[i].price * products[i].discountRate / 100)) + ' 원');
			    		  $(indexProducts[indexValue]).after(discountPrice);					    		  
			    	  }
			      }
			        
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
	
});


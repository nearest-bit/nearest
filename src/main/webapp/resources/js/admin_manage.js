$( function() {
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
	
	
	var prodListSource = $('#nearest-admin-product-list-template').text();
	var prodListTemplete = Handlebars.compile(prodListSource);
	var pageNavSource = $('#nearest-admin-product-pagenav-template').text();
	var pageNavTemplete = Handlebars.compile(pageNavSource);
	
	$('.nearest-admin-list > ul > li > a[href="#manage"]').click(function () {

		// 검색 했을때 
				  
		$('#nearest-admin-product-list').children().remove();
		$('#nearest-admin-pageno').children().remove();
	  
	    $.ajax({
		    url :  contextRoot + 'product/list.do',
		    datatype : 'json',
		    method : 'post',
		      
		    data : {
		      searchTag : "",
		      searchContent : "",
		      option: 'admin'
		    },
		    success : function(result) {
		      //초기화
			  searchTag = "";
			  searchContent = "";
			  pageUnit = "" ;
			  totalPage = "";
			  currentPage = 1;
			  nextPage = "";
			  previousPage = "";
			  total = "";
		    	
		      if(result.status != 'success'){
		        alert('검색오류');
		        return;
		      }
		        
		      $('#nearest-admin-product-list').append(prodListTemplete(result));
		        
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

	    $(window).scroll(function() {
			if($(window).scrollTop() >= $(document).height()-$(window).height()-20) {
				currentPage++;
				
				$.ajax({
				    url :  contextRoot + 'product/list.do',
				    datatype : 'json',
				    method : 'post',
				      
				    data : {
				      searchTag : "",
				      searchContent : "",
				      currentPage : currentPage,
				      option: 'admin'
				    },
				    success : function(result) {
				      			    	
				      if(result.status != 'success'){
				        alert('검색오류');
				        return;
				      }
				        
				      $('#nearest-admin-product-list').append(prodListTemplete(result));
				        
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
});
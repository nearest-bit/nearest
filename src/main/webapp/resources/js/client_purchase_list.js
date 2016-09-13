
function clientPurchase(){
	var dateSelect     = $('#flight-datepicker');
	var dateDepart     = $('#start-date');
	var dateReturn     = $('#end-date');
	var spanDepart     = $('.date-depart');
	var spanReturn     = $('.date-return');
	var spanDateFormat = 'ddd, MMMM D yyyy';

	dateSelect.datepicker({
	  autoclose: true,
	  format: "yy/mm/dd",
	  maxViewMode: 0,
	  startDate: "now"
	}).on('change', function() {
	  var start = $.format.date(dateDepart.datepicker('getDate'), spanDateFormat);
	  var end = $.format.date(dateReturn.datepicker('getDate'), spanDateFormat);
	  spanDepart.text(start);
	  spanReturn.text(end);
	});
	
    var purchaseListTableFormSource = $('#nearest-purchase-list-table-form').text();
    var purchaseListTableFormTempl = Handlebars.compile(purchaseListTableFormSource);
    var purchaseListTableContentSource = $('#nearest-purchase-list-table-content').text();
    var purchaseListTableContentTempl = Handlebars.compile(purchaseListTableContentSource);
    
    $('#nearest-receipt').load('receipt.html');
    
    Handlebars.registerHelper("state", function(value, options){
    	 if(value == '1'){
    		 return new Handlebars.SafeString('<span class="label label-primary">결제완료</span>');
    	 }else if(value == '2'){
    		 return new Handlebars.SafeString('<span class="label label-info">준비중</span>');
    	 }else if(value == '3'){
    		 return new Handlebars.SafeString('<span class="label label-success">준비완료</span>');
    	 }else if(value == '4'){
    		 return new Handlebars.SafeString('<span class="label label-danger">수령완료</span>');
    	 }
    });
    
    function callOrderList() {
   	 $.ajax({
           url : contextRoot + 'order/orderList.do',
           datatype : 'json',
           method : 'post',
           data :{
         	  startDate : $('#nearest-order-start-date').val(),
         	  endDate : $('#nearest-order-end-date').val()
         	  
           },
           success : function(result) {
         	  /*alert(result.orderList[0].orderDate == result.compareDateData[0]);
         	  alert(JSON.stringify(result.orderList[0]));*/
         	  
             if(result.status != 'success'){
               alert('failure');
               return;
             }
             
             $('#nearest-purchase-list-div').children().remove();
             
             $('#nearest-purchase-list-div').append(purchaseListTableFormTempl(result.orderDate));
             for(var i=0; i<result.orderList.length; i++){
             	   for(var j=0; j<result.compareDateData.length; j++){
             		   if(result.orderList[i].orderDate == result.compareDateData[j]){
             			   var id = '#nearest-purchaseList-tbody-'+j;
             			   $(id).append(purchaseListTableContentTempl(result.orderList[i]));
             		   }
             	   }
             }
             
             for(var i=0; i<$('.nearest-purchased-list-table').length; i++){
             	
             	var tbodyId = '#nearest-purchaseList-tbody-'+i+' > tr > .nearest-mart-price';
             	var totalPrice = 0;
             	
             	for(var j=0; j<$(tbodyId).length; j++){
             		
             		totalPrice += parseInt($($(tbodyId)[j]).attr('price-data'));
             	
             	}
             	$('#nearest-putchase-total-price-'+i).html('&#8361;' + totalPrice);
             }
             
           },
           
           error : function(request, status, error) {
             alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
           }
         }); 
    }
    
    callOrderList();
    
    $('#nearest-order-searchBtn').on('click', function() {
    	
    	$('#nearest-purchase-list-div > *').remove();
    	callOrderList();
    });
    
    $(document).on('click','.nearest-order-list-detail',function(event) {
        event.preventDefault();
        $('.nearest-product-receipt-list-tr').remove();
        var productReceiptList = $('#nearest-product-recipt-list').text();
        var productReceiptListTempl = Handlebars.compile(productReceiptList);
        
        $.ajax({
        	url : contextRoot + 'order/myOrderList.do',
        	datatype : 'json',
        	method : 'post',
        	data : {
        		martNo : $(this).children('td').attr('mart-no'),
        		orderNo : $(this).children('td').attr('order-no')
        	},
        	success : function(result){
        		if(result.status != 'success'){
        			alert('myOrderList Contriller Error....');
        			return;
        		}
        		$('.nearest-product-receipt-list-tr').remove();
        		/*alert(result.orderDetail);*/
        		var realTotalPrice = 0;
        		var discountPrice = 0;
        		
        		$('#receipt-client-name').text(result.orderInfo.client.name);
        		$('#receipt-mart-name').text(result.orderInfo.mart.name);
        		$('#receipt-mart-tel').text(result.orderInfo.mart.telNo);
        		$('#receipt-order-date').text(result.orderInfo.orderDate);
        		$('#receipt-mart-addr').text(result.orderInfo.mart.addr);
        		$('#receipt-mart-addrDetail').text(result.orderInfo.mart.addrDetail);
 
        		
        		for(var i=0; i<result.orderDetail.length; i++){        			
        			discountPrice = result.orderDetail[i].price - (result.orderDetail[i].price * result.orderDetail[i].discountRate / 100); 
        			discountPrice = parseInt(discountPrice);
        			
        			result.orderDetail[i].price = discountPrice;
        			
        			result.orderDetail[i].totalPrice = discountPrice * result.orderDetail[i].orderEnt;
        			realTotalPrice += (discountPrice * result.orderDetail[i].orderEnt);
        		}
        		$('#nearest-product-receipt').after(productReceiptListTempl(result.orderDetail));
        		
        		$('#nearest-receipt-real-total-price').text(realTotalPrice+'원');
        		
        		$.magnificPopup.open({
        		      items: {
        		        src: $('#nearest-purchase-receipt')
        		      },
        		      type: 'inline',

        		      fixedContentPos: false,
        		      fixedBgPos: true,

        		      overflowY: 'auto',

        		      closeBtnInside: true,
        		      preloader: false,
        		      
        		      midClick: true,
        		      removalDelay: 300,
        		      mainClass: 'my-mfp-zoom-in'
        		    });
        		
        	}
        });
    
  });
    
};


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


$(function(){
    var purchaseListTableFormSource = $('#nearest-purchase-list-table-form').text();
    var purchaseListTableFormTempl = Handlebars.compile(purchaseListTableFormSource);
    var purchaseListTableContentSource = $('#nearest-purchase-list-table-content').text();
    var purchaseListTableContentTempl = Handlebars.compile(purchaseListTableContentSource);
    
    $('#nearest-receipt').load('receipt.html');

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
	    		clientNo : $(this).attr('client-no'),
	    		orderNo : $(this).attr('order-no')
	    	},
	    	success : function(result){
	    		if(result.status != 'success'){
	    			alert('myOrderList Contriller Error....');
	    			return;
	    		}
	    		/*alert(result.orderDetail);*/
	    		var realTotalPrice = 0;
	    		$('#receipt-client-name').text(result.orderInfo.mart.name);
	    		$('#receipt-mart-name').text(result.orderInfo.client.name);
	    		$('#receipt-mart-tel').text(result.orderInfo.client.phone);
	    		$('#receipt-order-date').text(result.orderInfo.orderDate);
	    		
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
	    
	    $.ajax({
	    	url : contextRoot + 'order/updateOrderState.do',
	    	datatype : 'json',
	    	method : 'post',
	    	data : {
	    		orderNo : $(this).attr('order-no'),
	    		orderState : $(this).attr('order-state'),
	    		option : 1
	    	},
	    	success : function(result){
	    		if(result.state != 'success') {
	    			console.log(result.state);
	    			return;
	    		}
	    	},
	    	error : function() {
	    		alert('ajax error');
	    	}
	    });
    });
    
    $(document).on('click', '.nearest-complete-btn', function() {
    	$.ajax({
	    	url : contextRoot + 'order/updateOrderState.do',
	    	datatype : 'json',
	    	method : 'post',
	    	data : {
	    		orderNo : $(this).next().children('button').attr('order-no'),
	    		orderState : $(this).next().children('button').attr('order-state'),
	    		option : 2
	    	},
	    	success : function(result){
	    		if(result.state != 'success') {
	    			console.log(result.state);
	    			return;
	    		}
	    		
	    		location.reload();
	    	},
	    	error : function() {
	    		alert('ajax error');
	    	}
	    });
    });
    
  });
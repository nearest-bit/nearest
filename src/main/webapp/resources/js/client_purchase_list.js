
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
    
    Handlebars.registerHelper("state", function(value, options){
    	 if(value == '1'){
    		 return new Handlebars.SafeString('<span class="label label-danger">결제완료</span>');
    	 }else if(value == '2'){
    		 return new Handlebars.SafeString('<span class="label label-danger">준비중</span>');
    	 }else if(value == '3'){
    		 return new Handlebars.SafeString('<span class="label label-danger">준비완료</span>');
    	 }else if(value == '4'){
    		 return new Handlebars.SafeString('<span class="label label-danger">수령완료</span>');
    	 }
    });
    
    $.ajax({
          url : contextRoot + 'order/orderList.do',
          datatype : 'json',
          method : 'post',
          
          success : function(result) {
        	 /*  alert(result.orderList[0].orderDate == result.compareDateData[0]);
        	  alert(JSON.stringify(result.orderList[0])); */
        	  
        	  
            if(result.status != 'success'){
              alert('failure');
              return;
            }if(result.orderList[0].orderDate)
            $('#nearest-purchase-list-div').append(purchaseListTableFormTempl(result.orderDate));
            
            for(var i=0; i<result.orderList.length; i++){
            	   for(var j=0; j<result.compareDateData.length; j++){
            		   if(result.orderList[i].orderDate == result.compareDateData[j]){
            			   var id = '#nearest-purchaseList-tr-'+j;
            			   $(id).append(purchaseListTableContentTempl(result.orderList[i]));
            		   }
            	   }
            }
            
          },
          
          error : function(request, status, error) {
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
          }
        }); 
  });
  $(document).on('click','.nearest-order-list-detail',function(event) {
    event.preventDefault();
    
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
  });

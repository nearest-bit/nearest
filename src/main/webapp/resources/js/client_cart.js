/**
 * 
 */
	
//금액 콤마
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//setTotalPrice
function setTotalPrice() {
	
	var totalPrice = '';
	var priceArray = $('.cart-prod-price');
	var price = 0;
	
	for (var i = 0; i < priceArray.length; i++) {
		price +=  parseInt($(priceArray[i]).html());
	}
	
	totalPrice = price;
	
	$('#nearest-cart-totalPrice').html(numberWithCommas(totalPrice));
	$('#nearest-payment-price').text(numberWithCommas(totalPrice)+' 원').attr('value', totalPrice);
	
	
}

//처음 들어왔을때 
$(function() {
	
	//handlebars @index 1부터
	Handlebars.registerHelper("inc", function(value, options){
		return parseInt(value) + 1;
	});
	
	var cartSource = $('#nearest-cart-list').text();
	var cartListTempl = Handlebars.compile(cartSource);

	$.ajax({
	      url : contextRoot + 'cart/getCart.do',
	      datatype : 'json',
	      method : 'post',
	      
	      success : function(result) {
	        if(result.status != 'success'){
	          alert('failure');
	          return;
	        }
	        $('#nearest-cart-tbody').append(cartListTempl(result));
	        $('#nearest-client-menu').addClass('active');
	        
	        setTotalPrice();
	      },
	      
	      error : function(request, status, error) {
	        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
	      }
	    });	
	
	
});

//Quantity increase
$(document).on('click','.increaseBtn', function() {
	var quantity = parseInt($(this).prev().text());
	$(this).prev().text(quantity+1);
	var price = $(this).parent().parent().next().next().find('span').attr('value') * (quantity+1);
	$(this).parent().parent().next().next().find('span').text(numberWithCommas(price));
	$(this).parent().parent().next().next().find('p').text(price);
	setTotalPrice();
});

//Quantity decrease
$(document).on('click','.decreaseBtn', function() {
	var quantity = parseInt($(this).next().text());
	if (quantity == 1){
		cartAlert(4);
		return;
	}
	$(this).next().text(quantity-1);
	var price = $(this).parent().parent().next().next().find('span').attr('value') * (quantity-1);
	$(this).parent().parent().next().next().find('span').text(numberWithCommas(price));
	$(this).parent().parent().next().next().find('p').text(price);
	setTotalPrice();
});

//delete cart
$('#nearest-cart-delete').on('click', function(){
	
	var prodNo = '';
	
	if( $('input[type="checkbox"]:checked').size() == 0 ){
		cartAlert(0);
	}else{
		for(var i = 0;  i < $('input[type="checkbox"]:checked').size(); i++){
			prodNo += $($('input[type="checkbox"]:checked')[i]).val();
			if( i != $('input[type="checkbox"]:checked').size() - 1){
				prodNo += ',';
			}
		}
		
		$.ajax({
	          url : contextRoot + 'cart/removeCart.do',
	          datatype : 'json',
	          method : 'post',
	          data : {
	        	  prodNo : prodNo
	          },
	          
	          success : function(result) {
	            if(result.status != 'success'){
	              alert('failure');
	              return;
	            }
	            cartAlert(2);
	            $(document).on('click', '.confirm', function() {
	            	location.reload();
	            });
	            
	            
	          },
	          
	          error : function(request, status, error) {
	            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
	          }
	        });
	}
});

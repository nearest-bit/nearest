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
	
	var cartSource = '';
	var cartListTempl = '';
	
	if($.cookie('client-menu') == 'cart'){
		cartSource = $('#nearest-cart-list').text();
		cartListTempl = Handlebars.compile(cartSource);
		$.ajax({
	          url : contextRoot + 'cart/getCart.do',
	          datatype : 'json',
	          method : 'post',
	          data : {
	            clientNo : $.cookie('loginId')
	          },
	          
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
	}
	
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
		alert('최소 구매 수량 입니다.')
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
		alert('삭제할 상품이 없습니다.');
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
	        	  prodNo : prodNo,
	        	  clientNo : $.cookie('loginId')
	          },
	          
	          success : function(result) {
	            if(result.status != 'success'){
	              alert('failure');
	              return;
	            }
	            alert('삭제되었습니다.');
	            $(location).attr('href','http://localhost:8080/nearest/client.html');
	            
	          },
	          
	          error : function(request, status, error) {
	            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
	          }
	        });
	}
});

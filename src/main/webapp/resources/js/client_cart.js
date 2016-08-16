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
$(document).ready( function() {
	
	setTotalPrice();
});

//Quantity increase
$('.increaseBtn').click(function() {
	var quantity = parseInt($(this).prev().text());
	$(this).prev().text(quantity+1);
	var price = $(this).parent().parent().next().next().find('span').attr('value') * (quantity+1);
	$(this).parent().parent().next().next().find('span').text(numberWithCommas(price));
	$(this).parent().parent().next().next().find('p').text(price);
	setTotalPrice();
});

//Quantity decrease
$('.decreaseBtn').click(function() {
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


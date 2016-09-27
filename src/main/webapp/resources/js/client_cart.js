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
function clientCart() {
	
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
	        
	        $('#nearest-cart-tbody').children().remove();
	        
	        $('#nearest-cart-tbody').append(cartListTempl(result));
	        $('#nearest-client-menu').addClass('active');
	        
	        if($('#nearest-cart-tbody').children().size() != 0){
	    		console.log($('#nearest-cart-tbody').children().size());
	    		$('.popup-with-zoom-anim-purchase').magnificPopup({
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
	    	}else{
	    		console.log($('#nearest-cart-tbody').children().size());
	    		cartAlert('noCartList');
	    	}
	        
	        var totalDiscountPrice;
	        
	        var products = result.cartData;
		    var cartHiddenProducts = $('.nearest-cart-price');
		    var cartProducts = $('.nearest-cart-price-display');
		    var cartTotalProducts = $('.nearest-cart-total-price-display');
		    var cartTotalPrices = $('.cart-prod-price');
		      
		    for (var i in products) {		  
		    	totalDiscountPrice = parseInt(products[i].price - (products[i].price * products[i].discountRate / 100));
		    	
		    	$(cartHiddenProducts[i]).text(totalDiscountPrice + ' 원');
		    	$(cartProducts[i]).text(totalDiscountPrice + ' 원');
		    	$(cartTotalProducts[i]).text(totalDiscountPrice + ' 원');
		    	$(cartTotalProducts[i]).attr('value', totalDiscountPrice);
		    	$(cartTotalPrices[i]).text(totalDiscountPrice);
		    	
		    }
	        
	        setTotalPrice();
	      },
	      
	      error : function(request, status, error) {
	        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
	      }
	    });	
	
	//Quantity increase
	$(document).on('click','.increaseBtn', function() {
		var quantity = parseInt($(this).prev().text());
		$(this).prev().text(quantity+1);
		var price = $(this).parent().parent().next().next().find('span').attr('value') * (quantity+1);
		$(this).parent().parent().next().next().find('span').text(numberWithCommas(price) + ' 원');
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
		$(this).parent().parent().next().next().find('span').text(numberWithCommas(price) + ' 원');
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
};

$('#nearest-logo').on('click', function() {
  	location.href='index.html';
});

$(function() {
	var menu = $.cookie('clientMenu');
	
	switch(menu) {
		case 'cart':
			$('.nearest-menu-tab-bar a[href="#home"]').click();
			clientCart();
			break;
		case 'purchase':
			$('.nearest-menu-tab-bar a[href="#menu1"]').click();
			clientPurchase();
			break;
		case 'request':
			$('.nearest-menu-tab-bar a[href="#menu2"]').click();
			clientRequest();
			break;
		default:
			$('.nearest-menu-tab-bar a[href="#home"]').click();
			clientCart();
			break;
	}
	
	$.removeCookie('clientMenu');
	
	$('.nearest-menu-tab-bar a[href="#home"]').click(function() {
		clientCart();
	});
	
	$('.nearest-menu-tab-bar a[href="#menu1"]').click(function() {
		clientPurchase();
	});
	
	$('.nearest-menu-tab-bar a[href="#menu2"]').click(function() {
		clientRequest();
	});
});

$(window).scroll(function(event) {
	if($(window).scrollTop() >= 100){
		$('#nearest-to-top').css('display', '');
	}else {
		$('#nearest-to-top').css('display', 'none');
	}
});
//홈버튼 누르면 맨 위로
$('.nearest-to-home').on('click', function(e){
	  e.preventDefault();
	  $( 'html, body' ).animate( { scrollTop : 0 }, 400 );
	  return false;
});
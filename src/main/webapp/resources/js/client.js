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
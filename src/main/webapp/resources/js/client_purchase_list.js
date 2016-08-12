/**
 * 
 */

$(function() {
	$('#order-btn').on('click', function() {
		$('#nearest-order-search').css('display', 'block');
		$('#order-btn').css('display', 'none');
	});
});

$(function() {
	$('#request-btn').on('click', function() {
		$('#request-search').css('display', 'block');
		$('#request-btn').css('display', 'none');
	});
});

$(function() {
	$('#order-reset-btn').on('click', function() {
		$('#nearest-order-search').css('display', 'none');
		$('#order-btn').css('display', '');
	});
});

$(function() {
	$('#request-reset-btn').on('click', function() {
		$('#request-search').css('display', 'none');
		$('#request-btn').css('display', '');
	});
});
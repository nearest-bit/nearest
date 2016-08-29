$(function() {
	$('#order-btn').on('click', function() {
		$('#order-search').css('display', 'block');
		$('#order-btn').css('display', 'none');
	});

	$('#request-btn').on('click', function() {
		$('#request-search').css('display', 'block');
		$('#request-btn').css('display', 'none');
	});

	$('#order-reset-btn').on('click', function() {
		$('#order-search').css('display', 'none');
		$('#order-btn').css('display', '');
	});

	$('#request-reset-btn').on('click', function() {
		$('#request-search').css('display', 'none');
		$('#request-btn').css('display', '');
	});
	
	$('#nearest-order-btn').on('click', function() {
		$('#nearest-order-search').css('display', 'block');
		$('#nearest-order-btn').css('display', 'none');
	});

	$('#nearest-request-btn').on('click', function() {
		$('#nearest-request-search').css('display', 'block');
		$('#nearest-request-btn').css('display', 'none');
	});

	$('#nearest-order-reset-btn').on('click', function() {
		$('#nearest-order-search').css('display', 'none');
		$('#nearest-order-btn').css('display', '');
	});

	$('#nearest-request-reset-btn').on('click', function() {
		$('#nearest-request-search').css('display', 'none');
		$('#nearest-request-btn').css('display', '');
	});

	$('#nearest-complete-btn').on('click', function() {
		$('.nearest-margin-bottom').css('background', 'gray');
	});
})
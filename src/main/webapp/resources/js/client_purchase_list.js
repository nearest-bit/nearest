/**
 * 
 */

/*$(function() {
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
});*/

// 주문 기간 설정

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
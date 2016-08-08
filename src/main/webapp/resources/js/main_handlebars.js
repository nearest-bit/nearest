var source   = $("#nearest-product-list-template").html();
var template = Handlebars.compile(source);

var data = {
	users: [
	   {name: '홍길동'},
	   {name: '홍길동'},
	   {name: '홍길동'},
	   {name: '홍길동'},
	   {name: '홍길동'},
	   {name: '홍길동'},
	   {name: '홍길동'},
	   {name: '홍길동'},
	   {name: '홍길동'}
	]
}

$(function(){
	var productList = $('#nearest-product-list');
	
	productList.append(template(data));
});
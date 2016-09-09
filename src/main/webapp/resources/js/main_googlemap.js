var myLocation = {
  lat : 37.492968,
  lng : 127.029334
};

//현재 페이지
var currentPage = 1;

var markerLocation = new Array();

var nearLocation;
var markers = new Array();
var markersLength;

var map, places;
var autocomplete;

var infowindows = new Array();

var indexOption = "index";

var searchMartName = '';

var majorCat = '';

var subCat = '';

var cityCircle = '';

var searchLat = '';
var searchLng = '';

var martNo = '';

function initMap() {

  var mapOptions = {
    zoom : 17,
    center : myLocation,
    scrollwheel: false,
    disableDefaultUI: false
  }

  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  
  google.maps.event.addListener(map, 'tilesloaded', tilesLoaded);
  places = new google.maps.places.PlacesService(map);
  autocomplete = new google.maps.places.Autocomplete( document.getElementById('nearest-map-autocomplete') );
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
	 showSelectedPlace(); 
  });

  var image = './resources/images/map_marker.png';
  
  var geo_options = {
    timeout: 0,
	enableHighAccuracy: true, 
    maximumAge        : Infinity
  };
  
  if (navigator.geolocation) {
	  
    navigator.geolocation.watchPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
//        lat: myLocation.lat,
//    	lng: myLocation.lng
      };
      
      myLocation = pos;

      map.setCenter(pos);
      
      var myMarker = new google.maps.Marker({
	    position : pos,
	    map : map,
	    title : '현재 내 위치'
	  });

	  myMarker.setMap(map);
	  
    }, function() {
    }, function(){}, geo_options);
  } else {
    // Browser doesn't support Geolocation
	
  }
  
  $.ajax({
	  url: contextRoot + 'mart/martList.do',
	  dataType: 'json',
	  method: 'post',
	  success: function(result) {		  
		if(result.state != 'success') {
			alert('Controller Exception 발생');
		} else {
			var martList = result.data;
			
			for(var i in martList) {
				markerLocation[i] = {
					lat: martList[i].latitude-0,
					lng: martList[i].longitude-0
				}
			}
			
			for ( var i in markerLocation) {
				
			  var contentString = '<div style="min-width: 200px;">';
			  contentString += '    <div class="text-center nearest-map-infowindow" style="text-align: left;">';
			  contentString += '      <h4 id="map-martName" style="margin-bottom: 0;">'+ martList[i].name +'</h4>';
			  contentString += '      <hr style="border-color: red; margin: 5px 0 5px 0;" />';
			  contentString += '      <span class="fh5co-position">'+ martList[i].telNo +'</span>';
			  contentString += '      <p style="margin: 10px 0 0 0;">'+ martList[i].addr +'</p>';
			  contentString += '      <p>'+ martList[i].addrDetail +'</p>';
			  contentString += '	  <a class="infowindow-btn" href="#" style="color: blue;" data-martNo="'+martList[i].no+'" data-martname="'+martList[i].name+'">마트 물품 보기</a>';
			  contentString += '    </div>';
			  contentString += '   </div>';
			  
				  
			  var marker = new google.maps.Marker({
			    position : markerLocation[i],
			    map : map,
			    title : '진한마트',
			    icon : image
			  });
			  
			  markers[i] = marker;
			    
			  setMarkerInfoWindow(marker, i, contentString);
			}
						
			var markerLocationArr = new Array();
			var distanceArr = new Array();
			  
			for(var i in markers) {
			  var tempPosition = new google.maps.LatLng(markers[i].getPosition)
				
			  markerLocationArr[i] = markers[i].getPosition();
			}
			
			
			for(var i in markerLocationArr) {
				distanceArr[i] = getDistance(myLocation, markerLocationArr[i]);
			}
			
			var minIndex = 0;
			
			for(var i in distanceArr) {
				if (Math.min.apply(null, distanceArr) == distanceArr[i]) {
					minIndex = i;
				}
			}
						
			var martName = markers[minIndex].getTitle();
			searchMartName = martName;
			
			$('#nearest-product-list').children().remove();
			$('#nearest-pageno').children().remove();
			$('select[name="searchTag"] option:last-child').attr('selected', 'selected');
			$('input[name="searchContent"]').val(martName);
			
			searchTag = $('select[name=searchTag]').val();
		    searchContent = $('input[name=searchContent]').val();
			
			$.ajax({
			  url: contextRoot + 'product/list.do',
			  dataType: 'json',
			  data: {
				searchTag: 'marts',
				searchContent: martName
			  },
			  method: 'post',
			  success: function(result) {
				  if(result.status != 'success'){
			        alert('Controller 오류');
			        return;
			      }

				  var products = result.productData;
			      
			      for(var i in products) {
			    	  products[i].price = ' ' + parseInt(products[i].price - (products[i].price * products[i].discountRate / 100));
			      }
				  
			      $('#nearest-product-list').append(prodListTemplete(result));
			     
			      total = JSON.stringify(result.total);
			        
			      if ( total % 9 != 0){
			      	totalPage = parseInt( total / 9 ) + 1;
			      }else{
			    	totalPage = parseInt( total / 9 );
			      }
			      
			      if ( totalPage >= 5) {
			    	  pageUnit = 5; 
			    	  nextPage = pageUnit + 1;
			    
			      }else if( totalPage == 0 ){
			    	  pageUnit = 0;
			      }else{
			    	  pageUnit = totalPage;
			      }
			      
			      $('.fh5co-project-item').magnificPopup();
			  },
			  error: function() {
				  alert('ajax 접속 실패');
			  }
			});
			
			
		}
	  },
	  error: function() {
		  alert('ajax 접속 실패');
	  }
  });
}

function getDistance(orign, destination) {
	var disX = orign.lat - destination.lat();
	var disY = orign.lng - destination.lng();

	var distance = Math.sqrt(Math.abs(disX*disX) + Math.abs(disY*disY));
	
	return distance;
}

function tilesLoaded() {
	google.maps.event.clearListeners(map, 'tilesloaded');
	google.maps.event.addListener(map, 'zoom_changed', search);
	google.maps.event.addListener(map, 'dragend', search);
	search();
}

function search() {
	var type;

	autocomplete.setBounds(map.getBounds());
	var search = {
		bounds: map.getBounds()
	};
	if (type != 'establishment') {
		search.types = [type];
	}
	places.search(search, function (results, status) {});
}

function addResult(result, i) {
	var results = document.getElementById('nearest-map-results');
	var tr = document.createElement('tr');
	tr.style.backgroundColor = (i % 2 == 0 ? '#F0F0F0' : '#FFFFFF');
	tr.onclick = function () {
		google.maps.event.trigger(markers[i], 'click');
	};
	var iconTd = document.createElement('td');
	var nameTd = document.createElement('td');
	var icon = document.createElement('img');
	icon.src = result.icon.replace('http:', '');
	icon.setAttribute('class', 'placeIcon');
	var name = document.createTextNode(result.name);
	iconTd.appendChild(icon);
	nameTd.appendChild(name);
	tr.appendChild(iconTd);
	tr.appendChild(nameTd);
	results.appendChild(tr);
}

function getDetails(result, i) {
	return function () {
		places.getDetails({
			reference: result.reference
		}, showInfoWindow(i));
	}
}


function showSelectedPlace() {
	//clearResult();
	//clearMarkers();
	var place = autocomplete.getPlace();
	map.panTo(place.geometry.location);
	
	searchLat = place.geometry.location.lat();
	searchLng = place.geometry.location.lng();
	
	if(cityCircle != ''){
		cityCircle.setMap(null);
	}
	
	cityCircle = new google.maps.Circle({
	      strokeColor: '#FF0000',
	      strokeOpacity: 0.8,
	      strokeWeight: 2,
	      fillColor: '#FF0000',
	      fillOpacity: 0.35,
	      map: map,
	      center: {lat : searchLat, lng : searchLng},
	      radius: 150
	    });
	
	/*var iw;
	
	markers[0] = new google.maps.Marker({
		position: place.geometry.location,
		map: map
	});
	iw = new google.maps.InfoWindow({
		content: getIWContent(place)
	});
	iw.open(map, markers[0]);*/
}

function clearResult() {
	var results = $('#nearest-map-results');
	while (results.childNodes[0]) {
		results.removeChild(results.childNodes[0]);
	}
}

function setMarkerInfoWindow (marker, index, content) {
	var contentString = content;
	var infowindow = new google.maps.InfoWindow({
		content: content
	});
	
	infowindows[index] = infowindow;
	
	google.maps.event.addListener(marker, 'click', function() {
		for (var i in infowindows) {
			infowindows[i].close();
		}
		
		map.setCenter(marker.position);
		
		infowindow.open(map, marker);
	});
}

$(function() {
	$(document).on('click', '.infowindow-btn', function(event) {
		event.preventDefault();
		currentPage = 1;
		majorCat = '';
		subCat = '';
		
		var martName = $(this).attr('data-martname');
		searchMartName = martName;
		
		$('#nearest-product-list').children().remove();
		$('#nearest-pageno').children().remove();
		$('select[name="searchTag"] option:last-child').attr('selected', 'selected');
		$('#nearest-search').val(martName);
		$('#nearest-menu-category-wrap').css('display', 'inline');
		martNo = $(this).attr('data-martNo');
		
		searchTag = $('select[name=searchTag]').val();
	    searchContent = $('#nearest-search').val();
		
		$.ajax({
		  url: contextRoot + 'product/list.do',
		  dataType: 'json',
		  data: {
			searchTag: 'marts',
			searchContent: martName,
			currentPage: currentPage
		  },
		  method: 'post',
		  success: function(result) {
			  if(result.status != 'success'){
		        alert('Controller 오류');
		        return;
		      }
		        
		      $('#nearest-product-list').append(prodListTemplete(result));
		      
		      var products = result.productData;
		      var indexProducts = $('.nearest-product-list-price');
		      var discountPrice;
		      var indexValue;
		      
		      /*for (var i in products) {					    	  
		    	  if(products[i].discountRate > 0) {
		    		  indexValue = parseInt(i)+parseInt((result.currentPage-1)*9);
		    		  
		    		  console.log(indexValue);
		    		  
		    		  console.log($(indexProducts[indexValue]).html());
		    		  
					  $(indexProducts[indexValue]).text(products[i].price);
		    		  $(indexProducts[indexValue]).css('text-decoration', 'line-through');
		    		  
		    		  discountPrice = $('<span>').text(' ' + parseInt(products[i].price - (products[i].price * products[i].discountRate / 100)) + ' 원');
		    		  $(indexProducts[indexValue]).after(discountPrice);					    		  
		    	  }
		      }*/
		        
		      total = JSON.stringify(result.total);
		        
		      if ( total % 9 != 0){
		      	totalPage = parseInt( total / 9 ) + 1;
		      }else{
		    	totalPage = parseInt( total / 9 );
		      }
		      
		      if ( totalPage >= 5) {
		    	  pageUnit = 5; 
		    	  nextPage = pageUnit + 1;
		    	  
		    	  $('span[data-next-page=""]').attr('data-next-page', nextPage);
		      }else if( totalPage == 0 ){
		    	  pageUnit = 0;
		    	  $('span[data-next-page=""]').attr('data-next-page', '');
		      }else{
		    	  pageUnit = totalPage;
		      }
		        
		      if (pageUnit >= 1){
		      	for(var i=1; i<=pageUnit; i++){
		       		$('#nearest-pageno').append(pageNavTemplete({i}));   		
		       	}
		      }
		      
		      $('.fh5co-project-item').magnificPopup();
		  },
		  error: function() {
			  alert('ajax 접속 실패');
		  }
		});
	});
});
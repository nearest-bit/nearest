var myLocation = {
  lat : 37.492968,
  lng : 127.029334
};
var markerLocation = new Array();

var map;

var infowindows = new Array();

function initMap() {

  var mapOptions = {
    zoom : 17,
    center : myLocation,
    scrollwheel: false,
    disableDefaultUI: false
  }

  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  var image = './resources/images/map_marker.png';
  
  var geo_options = {
    enableHighAccuracy: false, 
    maximumAge        : 0
  };
  
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(function(position) {
      var pos = {
//        lat: position.coords.latitude,
//        lng: position.coords.longitude
    	  lat: myLocation.lat,
    	  lng: myLocation.lng
      };

      map.setCenter(pos);
      
      var myMarker = new google.maps.Marker({
	    position : pos,
	    map : map,
	    title : '현재 내 위치'
	  });

	  myMarker.setMap(map);
	  
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    }, function(){}, geo_options);
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
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
				
			  var contentString = '<div>';
			  contentString += '    <div class="fh5co-person text-center nearest-map-infowindow">';
			  contentString += '      <img src="./resources/images/person1.jpg" alt="Image" style="width:70%; height:30%;">';
			  contentString += '      <h3>'+ martList[i].name +'</h3>';
			  contentString += '      <span class="fh5co-position">'+ martList[i].telNo +'</span>';
			  contentString += '      <p>'+ martList[i].addr +'</p>';
			  contentString += '      <p>'+ martList[i].addrDetail +'</p>';
			  contentString += '	  <button type="button" class="infowindow-btn" value="'+ martList[i].name +'">마트 물품 보기</button>';
			  contentString += '    </div>';
			  contentString += '   </div>';
				  
			  var marker = new google.maps.Marker({
			    position : markerLocation[i],
			    map : map,
			    title : '진한마트',
			    icon : image
			  });
			    
			  setMarkerInfoWindow(marker, i, contentString);
			}
		}
	  },
	  error: function() {
		  alert('ajax 접속 실패');
	  }
  })
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
	
	google.maps.event.addListener(infowindow, 'domready', function() {

		   // Reference to the DIV which receives the contents of the infowindow using jQuery
		   var iwOuter = $('.gm-style-iw');

		   /* The DIV we want to change is above the .gm-style-iw DIV.
		    * So, we use jQuery and create a iwBackground variable,
		    * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
		    */
		   var iwBackground = iwOuter.prev();

		   // Remove the background shadow DIV
		   iwBackground.children(':nth-child(2)').css({'display' : 'none'});

		   // Remove the white background DIV
		   iwBackground.children(':nth-child(4)').css({'display' : 'none'});

		   var iwCloseBtn = iwOuter.next();

	    		// Apply the desired effect to the close button
	    		iwCloseBtn.css({
	    		  opacity: '1', // by default the close button has an opacity of 0.7
	    		  right: '15%', 
	    		  top: '2%', // button repositioning
	    		  border: '7px solid #48b5e9', // increasing button border and new color
	    		  'border-radius': '4px', // circular effect
	    		  'box-shadow': '0 0 5px #3990B9' // 3D effect to highlight the button
	    		  });
	
	    		// The API automatically applies 0.7 opacity to the button after the mouseout event.
	    		// This function reverses this event to the desired value.
	    		iwCloseBtn.mouseout(function(){
	    		  $(this).css({opacity: '1'});
	    		});
		});
}

$(function() {
	$(document).on('click', '.infowindow-btn', function() {
		var martName = $(this).val();
		
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
		        
		      alert(pageUnit);
		  },
		  error: function() {
			  alert('ajax 접속 실패');
		  }
		});
	});
});
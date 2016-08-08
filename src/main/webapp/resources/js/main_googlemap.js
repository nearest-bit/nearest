var myLocation = {
  lat : 37.497946,
  lng : 127.027786
};
var markerLocation = [ {
  lat : 37.497777,
  lng : 127.028590
}, {
  lat : 37.498890,
  lng : 127.027653
}, {
  lat : 37.498552,
  lng : 127.030824
}, {
  lat : 37.498897,
  lng : 127.029857
}, {
  lat : 37.496719,
  lng : 127.027769
}, {
  lat : 37.497394,
  lng : 127.030292
} ];

var map;

var infowindows = new Array();

function initMap() {
  var mapOptions = {
    zoom : 17,
    center : myLocation,
    scrollwheel: false,
    disableDefaultUI: false
  }

  map = new google.maps.Map(document.getElementById('map'),
  mapOptions);

  var image = './resources/images/map_marker.png';

  var myMarker = new google.maps.Marker({
    position : myLocation,
    map : map,
    title : '현재 내 위치'
  });

  myMarker.setMap(map);

  for ( var i in markerLocation) {
	/* var contentString = markerLocation[i].lat + ',' + markerLocation[i].lng; */
	var contentString = '<div>';
    contentString += '    <div class="fh5co-person text-center nearest-map-infowindow">';
    contentString += '      <img src="./resources/images/person1.jpg" alt="Image" style="width:70%; height:30%;">';
    contentString += '      <h3>진한 마트</h3>';
    contentString += '      <span class="fh5co-position">02-335-8878</span>';
    contentString += '      <p>서울시 관악구 신림동 1245-55 번지</p>';
    contentString += '      <ul class="social social-circle">';
    contentString += '        <li><a href="#"><i class="icon-twitter"></i></a></li>';
    contentString += '        <li><a href="#"><i class="icon-facebook"></i></a></li>';
    contentString += '        <li><a href="#"><i class="icon-dribbble"></i></a></li>';
    contentString += '      </ul>';
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
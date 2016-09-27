$(function() {
	$('#nearest-dropdown-alert').click(function() {
		$('#myDropdown').css('display', 'block');
	});
})

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {	
  if (!event.target.matches('#nearest-dropdown-alert') 
		  && !event.target.matches('#nearest-to-cart')
		  && !event.target.matches('#nearest-to-purchase')
		  && !event.target.matches('#nearest-to-request')) {
    var dropdowns = document.getElementsByClassName("nearest-dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      
      if ($(openDropdown).css('display') == 'block') {
    	  $(openDropdown).css('display', 'none');
      }
    }
  }
}

$('#nearest-menu-category-wrap').mouseover(function(){
	$('#nearest-category-menu').css('display', 'inline');
});
$('#nearest-menu-category-wrap').mouseout(function() {
	$('#nearest-category-menu').css('display', 'none');
});
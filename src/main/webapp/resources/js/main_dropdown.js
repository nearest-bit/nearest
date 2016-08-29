$(function() {
	$('#nearest-dropdown-alert').click(function() {
		$('#myDropdown').css('display', 'block');
	});
})

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {	
  if (!event.target.matches('#nearest-dropdown-alert')) {
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
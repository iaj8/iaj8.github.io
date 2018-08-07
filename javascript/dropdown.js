/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
var dropBtn = $(".dropbtn");
dropBtn.css("color","black");
var black = dropBtn.css("color");
dropBtn.css("color","blue");
var blue = dropBtn.css("color");

function showDropdown() {
  $("#myDropdown").toggleClass("show");
  if (dropBtn.css("color") == black){
    dropBtn.css("color",blue);
  } else {
    dropBtn.css("color",black);
  }
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = $(".dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
        $(".dropbtn").css("color",blue);
      }
    }
  }
}

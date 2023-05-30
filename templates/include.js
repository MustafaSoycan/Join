function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    }
  }

  function logOut() {
    localStorage.removeItem('username');
  
    let logOut = document.getElementById('logOut');
  
    if (logOut.classList.contains('d-none')) {
      logOut.classList.remove('d-none');
    } else {
      logOut.classList.add('d-none');
    }
  }

function openMenu(){
  console.log("openMobileMenu"); 
}



// Event Listener für Kategorien in der Sidebar-Middle und Sidebar-Bottom
var categories = document.querySelectorAll('.sidebar-middle a, .sidebar-bottom a');
categories.forEach(function(category) {
  category.addEventListener('click', function() {
    // Entferne die Markierung von allen Kategorien
    categories.forEach(function(c) {
      c.classList.remove('active');
    });
    // Füge die Markierung zur ausgewählten Kategorie hinzu
    category.classList.add('active');
  });
});
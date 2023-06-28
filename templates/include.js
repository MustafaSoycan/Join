/**
 * Funktion zum einbinden der Templates.
 * @returns Git das den inklidierten HTML Code zurück
 */
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
  /**
   * Funktion zum Ausloggen aus dem JOIN System. ‚
   */
  function logOut() {
    localStorage.removeItem('username');
  
    let logOut = document.getElementById('logOut');
  
    if (logOut.classList.contains('d-none')) {
      logOut.classList.remove('d-none');
    } else {
      logOut.classList.add('d-none');
    }
  }

/**
 * Öffnet das mobile Menü
 */
function openMenu(){
  let mobileMenu = document.getElementById('mobileMenuPopup');
  if (mobileMenu.classList.contains('d-none')) {
    mobileMenu.classList.remove('d-none');
  } else {
    mobileMenu.classList.add('d-none');
  }
}

window.addEventListener("DOMContentLoaded", function() {
  var activePage = localStorage.getItem("activePage");
  if (activePage) {
      var link = document.querySelector('a[data-page="' + activePage + '"]');
      if (link) {
          link.classList.add("active");
      }
  }
});

function changeActivePage(event, pageName) {
  event.preventDefault(); // Verhindert das Laden der neuen Seite

  var clickedElement = event.target;
  
  // Entferne die Klasse "active" von allen Links
  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
      links[i].classList.remove("active");
  }

  // Füge die Klasse "active" zum geklickten Link hinzu
  clickedElement.classList.add("active");

  // Speichere den Zustand der aktiven Seite im Web Storage
  localStorage.setItem("activePage", pageName);
}
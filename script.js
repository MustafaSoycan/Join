/**
 * Ein Array zur Speicherung der Benutzerdaten.
 */
let user = [];


async function init() {
    loadUser();
    /*
    await setItem('user', JSON.stringify(user));
    console.log("set empty user");
    */ 
}


/**
 * Lädt die Benutzerdaten aus dem Backend.
 */
async function loadUser() {
    try {
        user = JSON.parse(await getItem('user'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

/**
 * Überprüft, ob eine E-Mail gültig ist.
 * Gibt true zurück, wenn die E-Mail gültig ist, andernfalls false.
 */
function isValidEmail(email) {
    return email.includes('@');
  }


  /**
 * Event-Listener, der aufgerufen wird, wenn das DOM geladen ist.
 * Elemente für Anmeldescreen, Registrierungsscreen, Passwort vergessen-Screen,Passwort ändern Screen.
 */
  let loginscreen, signupscreen, forgotPW1, changePW;

  window.addEventListener('DOMContentLoaded', function() {
    loginscreen = document.getElementById('login-screen');
    signupscreen = document.getElementById('sign-up-screen');
    forgotPW1 = document.getElementById('forgotPW');
    changePW = document.getElementById('changePW');
    signupButton = document.getElementById('signup-screen');
  });


  /**
 * Öffnet eine bestimmte Seite basierend auf dem angegebenen Parameter.
 */
function openPage(page) {
    if (page === "log-in") {
        checkLogin()
    } else  if (page === "summary") {
        localStorage.setItem('login', true);
        window.location.href = "./summary/summary.html";
    } else if (page === "sign-up") {
        loadSignUp();
    } else if (page === "back") {
        back();
    } else if (page === "forgotPW") {
        forgotPW();
    }else if (page === "backChange") {
        backChange();
    }
}


  /**
 * Führt eine Gastanmeldung durch.
 */
function guestLogin(){
       document.getElementById("summaryUsername").innerHTML = 'Guest'  ; 
}

  /**
 * Lädt das Registrierungsformular.
 */
function loadSignUp() {
    loginscreen.style.display = 'none';
    signupButton.style.display = 'none';
    signupscreen.style.display = 'flex';
}


  /**
 * Zeigt den Bildschirm zum Zurücksetzen des Passworts an.
 */
function forgotPW() {
    loginscreen.style.display = 'none';
    signupButton.style.display = 'none';
    forgotPW1.style.display = 'flex';
}

/**
*Geht zurück zum Anmeldebildschirm.
*/
function back() {
    loginscreen.style.display = 'flex';
    signupButton.style.display = 'flex';
    signupscreen.style.display = 'none';
    forgotPW1.style.display = 'none';
}


/**
*Wechselt zur vorherigen Ansicht (Passwort ändern).
*/
function  backChange(){
    forgotPW1.style.display = 'flex';
    changePW.style.display = 'none';
}

/**
*Setzt das Passwort zurück.
*/
  function resetPW() {
    let emailInput = document.getElementById('email-forgot');
    let emailValue = emailInput.value;
  
    if (emailValue !== '' && isValidEmail(emailValue)) {
      document.getElementById('email-forgot').value=''
      emailCheck()
  
      animationInfo.addEventListener('animationend', function() {
        animationInfo.style.display = 'none';
      }, { once: true });
    } else {
        alert('bitte eine gültige email eingeben')
    }
  }

  /**
*Überprüft die E-Mail und zeigt Animationen an.
*/
function emailCheck() {
  let animationInfo = document.getElementById('animation-info');
  animationInfo.style.display = 'flex';
  forgotPW1.style.display = 'none';
  loginscreen.style.display = 'none';
  signupButton.style.display = 'none';
  changePW.style.display = 'flex';

  // Füge den Event-Listener für 'animationend' hinzu
  animationInfo.addEventListener('animationend', function() {
    // Animation ist abgeschlossen
    animationInfo.style.display = 'none';
  }, { once: true }); // { once: true } sorgt dafür, dass der Event-Listener nur einmalig ausgeführt wird
}


/**
*Überprüft das eingegebene Passwort und führt entsprechende Aktionen aus.
*/
  function checkPW() {
    let newPasswordInput = document.getElementById('new-password');
    let confirmPasswordInput = document.getElementById('confirm-password');
  
    let newPassword = newPasswordInput.value;
    let confirmPassword = confirmPasswordInput.value;
  
    if (newPassword !== '' && confirmPassword !== '' && newPassword === confirmPassword) {
      let animationReset = document.getElementById('animation-reset');

      confirmPasswordInput.value = ''
      newPasswordInput.value = ''

      animationReset.style.display = 'flex';
      changePW.style.display = 'none';
      loginscreen.style.display = 'flex';
      signupButton.style.display = 'flex';
  
      animationReset.addEventListener('animationend', function() {
        animationReset.style.display = 'none';
      }, { once: true });
    } else {
      alert('Bitte geben Sie gültige Passwörter ein.');
    }
  }
 
  
/**
*Überprüft den Login und führt entsprechende Aktionen aus.
*/
  function checkLogin() {
    let emailInput = document.getElementById('log-in-email');
    let passwordInput = document.getElementById('log-in-pw');
    let email = emailInput.value;
    let password = passwordInput.value;
    let foundUser = user.find(function (user) {
      return user.email === email && user.password === password;
    });
  
    if (foundUser) {
        userCheck(foundUser, emailInput, passwordInput)
    } else {
      alert('Die E-Mail-Adresse oder das Passwort ist ungültig.');
    }
  }


/**
Überprüft den Benutzer.
*/
  function userCheck(foundUser, emailInput, passwordInput){
    document.getElementById('current-user').textContent = '';
    document.getElementById('current-user').textContent = 'Angemeldet ist der Benutzer: ' + foundUser.name;
    console.log('Name des Benutzers:', foundUser.name);
    alert(`user " ${foundUser.name} " ist angemeldet`)
    localStorage.setItem('username', foundUser.name);
    localStorage.setItem('login', true);
    emailInput.value = '';
    passwordInput.value = '';
    window.location.href = "./summary/summary.html";
  }
  

document.addEventListener('DOMContentLoaded', function () {
  let nameInput = document.getElementById('name');
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  let registerBtn = document.getElementById('registerBtn');

  /**
 * Registriert einen neuen Benutzer.
 */
  async function register() {
    if (nameInput.value === '' || email.value === '' || password.value === '') {
      alert('Bitte füllen Sie alle Felder aus.');
      return;
    }

    if (!isValidEmail(email.value)) {
      alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return;
    }

    if (isUserAlreadyRegistered(nameInput.value, email.value)) {
      alert('Der Name oder die E-Mail-Adresse ist bereits vergeben.');
      return;
    }

    registerBtn.disabled = true;

    user.push({
      name: nameInput.value,
      email: email.value,
      password: password.value,
    });

    await setItem('user', JSON.stringify(user));
    resetForm();
    loadUser();
    back();
  }

  /**
 * Setzt das Formular zurück.
 */
  function resetForm() {
    nameInput.value = '';
    email.value = '';
    password.value = '';
    registerBtn.disabled = false;
  }

/**
 * Überprüft, ob ein Benutzer bereits registriert ist.
 */
  function isUserAlreadyRegistered(name, email) {
    for (let i = 0; i < user.length; i++) {
      if (user[i].name === name || user[i].email === email) {
        return true;
      }
    }
    return false;
  }

  registerBtn.addEventListener('click', register);
});

/**
 * Zeige und verberge das Passwort.
 */
function showPW(pages){

  let passwordInput = document.getElementById(pages);
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  } else if (passwordInput.type === 'text') {
    passwordInput.type = 'password';
  }
}

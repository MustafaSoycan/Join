function openPage(page) {
    if (page === "log-in") {
        checkLogin()
    } else  if (page === "summary") {
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

function checkLogin() {
    let emailInput = document.getElementById('log-in-email');
    let passwordInput = document.getElementById('log-in-pw');
  
    let email = emailInput.value;
    let password = passwordInput.value;
  
    let foundUser = user.find(function (user) {
      return user.email === email && user.password === password;
    });
  
    if (foundUser) {
        document.getElementById('current-user').textContent = '';
        document.getElementById('current-user').textContent = 'Angemeldet ist der Benutzer: ' + foundUser.name;
        console.log('Name des Benutzers:', foundUser.name);
        emailInput.value = '';
        passwordInput.value = '';
        window.location.href = "./summary/summary.html";

    } else {
      alert('Die E-Mail-Adresse oder das Passwort ist ungültig.');
    }
  }
  

function loadSignUp() {
    let loginscreen = document.getElementById('login-screen');
    loginscreen.style.display = 'none';
    let signupscreen = document.getElementById('sign-up-screen');
    signupscreen.style.display = 'flex';
}

function forgotPW() {
    let loginscreen = document.getElementById('login-screen');
    loginscreen.style.display = 'none';
    let forgotPW = document.getElementById('forgotPW');
    forgotPW.style.display = 'flex';
}

function back() {
    let loginscreen = document.getElementById('login-screen');
    loginscreen.style.display = 'flex';
    let signupscreen = document.getElementById('sign-up-screen');
    signupscreen.style.display = 'none';
    let forgotPW = document.getElementById('forgotPW');
    forgotPW.style.display = 'none';
}


function  backChange(){
    let forgotPW = document.getElementById('forgotPW');
    forgotPW.style.display = 'flex';
    let changePW = document.getElementById('changePW');
    changePW.style.display = 'none';

}
function resetPW() {
    let emailInput = document.getElementById('email-forgot');
    let emailValue = emailInput.value;
  
    if (emailValue !== '' && isValidEmail(emailValue)) {
      let animationInfo = document.getElementById('animation-info');
      animationInfo.style.display = 'flex';
  
      let forgotPW = document.getElementById('forgotPW');
      forgotPW.style.display = 'none';
  
      let loginscreen = document.getElementById('login-screen');
      loginscreen.style.display = 'none';
  
      let changePW = document.getElementById('changePW');
      changePW.style.display = 'flex';
  
      animationInfo.addEventListener('animationend', function() {
        animationInfo.style.display = 'none';
      }, { once: true });
    } else {
        alert('bitte eine gültige email eingeben')
    }
  }
  
  function isValidEmail(email) {
    return email.includes('@');
  }
  
  

  function checkPW() {
    let newPasswordInput = document.getElementById('new-password');
    let confirmPasswordInput = document.getElementById('confirm-password');
  
    let newPassword = newPasswordInput.value;
    let confirmPassword = confirmPasswordInput.value;
  
    if (newPassword !== '' && confirmPassword !== '' && newPassword === confirmPassword) {
      let animationReset = document.getElementById('animation-reset');
      animationReset.style.display = 'flex';
  
      let changePW = document.getElementById('changePW');
      changePW.style.display = 'none';
  
      let loginscreen = document.getElementById('login-screen');
      loginscreen.style.display = 'flex';
  
      animationReset.addEventListener('animationend', function() {
        animationReset.style.display = 'none';
      }, { once: true });
    } else {
      alert('Bitte geben Sie gültige Passwörter ein.');
    }
  }
  
  
  


let user = [];

async function init() {
    loadUser();
}

async function loadUser() {
    try {
        user = JSON.parse(await getItem('user'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}




document.addEventListener('DOMContentLoaded', function () {
  let nameInput = document.getElementById('name');
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  let registerBtn = document.getElementById('registerBtn');

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

  function resetForm() {
    nameInput.value = '';
    email.value = '';
    password.value = '';
    registerBtn.disabled = false;
  }

  function isValidEmail(email) {
    return email.includes('@');
  }

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



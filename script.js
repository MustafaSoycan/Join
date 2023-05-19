function openPage(page) {
    if (page === "summary") {
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
function resetPW(){
    let animationInfo = document.getElementById('animation-info');
    animationInfo .style.display = 'flex';
    let forgotPW = document.getElementById('forgotPW');
    forgotPW.style.display = 'none';
    let loginscreen = document.getElementById('login-screen');
    loginscreen.style.display = 'none';
    let changePW = document.getElementById('changePW');
    changePW.style.display = 'flex';

    animationInfo.addEventListener('animationend', function() {
        animationInfo.style.display = 'none';
      }, { once: true });
}

function checkPW(){
    let animationReset = document.getElementById('animation-reset');
    animationReset .style.display = 'flex';
    let changePW = document.getElementById('changePW');
    changePW.style.display ='none';
    let loginscreen = document.getElementById('login-screen');
    loginscreen.style.display = 'flex';

    animationReset.addEventListener('animationend', function() {
        animationReset.style.display = 'none';
      }, { once: true });
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


    registerBtn.addEventListener('click', register);
});



function openPage(page) {
    if (page === "summary") {
        window.location.href = "./summary/summary.html";
    } else if (page === "sign-up") {
        loadSignUp();
    } else if (page === "back") {
        back();
    } else if (page === "forgotPW") {
        forgotPW();
    }
}

function loadSignUp(){
    let loginscreen = document.getElementById('login-screen');
    loginscreen.style.display = 'none';
    let signupscreen = document.getElementById('sign-up-screen');
    signupscreen.style.display = 'flex';
}

function forgotPW(){
    let loginscreen = document.getElementById('login-screen');
    loginscreen.style.display = 'none';
    let forgotPW = document.getElementById('forgotPW');
    forgotPW.style.display = 'flex';
}

function back(){
    let loginscreen = document.getElementById('login-screen');
    loginscreen.style.display = 'flex';
    let signupscreen = document.getElementById('sign-up-screen');
    signupscreen.style.display = 'none';
    let forgotPW = document.getElementById('forgotPW');
    forgotPW.style.display = 'none';
}
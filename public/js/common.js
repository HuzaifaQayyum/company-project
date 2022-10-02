function logout() { 
    console.log("LOGOUT")
    localStorage.removeItem('authToken');
    window.location.href = '/';
}

let isLoggedIn = false;

window.addEventListener('load', () => { 

    document.querySelector('#main-header').addEventListener('click', () => window.location.href = '/');

    if (localStorage.getItem('authToken'))
        isLoggedIn = true;
    
    const logoutBtn = document.querySelector('#logout');
    if (isLoggedIn) {
        logoutBtn.style.display = 'inline-block';
        logoutBtn.addEventListener('click', logout);
    }
});
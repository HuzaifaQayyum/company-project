const submitBtn = document.querySelector('#submit');
const authMode = document.querySelector('#auth_form').getAttribute('auth-type')
const formGroupErrors = document.querySelector('#form-errors__group');

const createErrorListItem = msg => { 
    const li = document.createElement('li');
    li.textContent = msg;
    return li;
}

const displayErrors = errors => { 
    for (const error of errors)
        formGroupErrors.append(createErrorListItem(error))
    formGroupErrors.style.display = 'block';
    submitBtn.removeAttribute('disabled')
}

const resetErrors = () => { 
    errorsList = [];
    formGroupErrors.innerHTML = '';
    formGroupErrors.style.display = 'none';
}


const handleErrors = (username, password) => { 
    let errorsList = [ ]

    if (!validator.isLength(username, { min: 3 }))
        errorsList.push('Username must be at least 3 characters.');

    if(!validator.matches(username, /^[a-zA-Z_]+[a-zA-Z0-9_]*$/))
        errorsList.push('Username must contain only alphabets, numbers and underscores and start with letter/underscore');


    if (!validator.isLength(password, { min: 8 }))
        errorsList.push('Password must be between at least 8 characters long.');

    return errorsList;
}


const saveTokenAndRedirect = async res => { 
    const token = (await res.json()).jwt;
    if (!token) return alert('Something went wrong, login again please.');
    localStorage.setItem('authToken', token);
    window.location.href = '/'
}


const authenticate = async auth_body => { 
    const res = await fetch(authMode == 'signup' ? API_AUTH_SIGNUP_URL : API_AUTH_LOGIN_URL, { 
        method: 'POST',
        headers: { 
            'content-type': 'application/json'
        },
        body: JSON.stringify(auth_body)
    });

    if (res.status === 401)
        displayErrors([ 'Invalid Credentials.' ])
    else if(res.status === 409) 
        displayErrors([ 'User Already Exists. Login Instead.' ])
    else
        saveTokenAndRedirect(res);
}

submitBtn.addEventListener('click', async () => {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    submitBtn.setAttribute('disabled', 'disabled');
    formGroupErrors.style.display = 'none';
    formGroupErrors.innerHTML = '';


    const errorsList = handleErrors(username, password);
    if (errorsList.length !== 0) {
        displayErrors(errorsList);
        return
    } else
        resetErrors()


    if (authMode == 'signup') {
        navigator.geolocation.getCurrentPosition(async geolocation => {
            const {latitude, longitude } = geolocation.coords
            const coordinates = `${latitude},${longitude}`;
            await authenticate({ username, password, coordinates });
        }, err => alert('Location Permission is needed for account creation!'))
    } else
        await authenticate({ username, password})
});
import { authHeader } from './auth-header';
import { getEndpoint } from './endpoint';

export const userService = {
    getAllUsers,
    getUserByType,
    logout,
    register,
    editUser
};

const ackremittancesServiceEndpoint = getEndpoint();

async function getAllUsers() {
    var requestOptions = {
        method: 'GET',
        headers: authHeader(),
        redirect: 'follow'
    };

    return fetch(`${ackremittancesServiceEndpoint}/users`, requestOptions)
        .then(handleResponse)
        .then(result => {
            return result;
        })
        .catch(error => console.log('An error occurred', error));
}

async function getUserByType(type) {
    var requestOptions = {
        method: 'GET',
        headers: authHeader(),
        redirect: 'follow'
    };

    return fetch(`${ackremittancesServiceEndpoint}/users/?userType=${type}`, requestOptions)
        .then(handleResponse)
        .then(result => {
            return result;
        })
        .catch(error => console.log('An error occurred', error));
}

async function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
        redirect: 'follow'
    };

    return fetch(`${ackremittancesServiceEndpoint}/registration/agent`, requestOptions)
        .then(handleResponse)
        .then(result => {
            return result;
        })
        .catch(error => console.log('error', error));
}

async function editUser(user) {
    var myHeaders = new Headers();
    let accessToken = JSON.parse(localStorage.getItem('access_token'));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", 'Bearer ' + accessToken);
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(user),
        redirect: 'follow'
    };

    return fetch(`${ackremittancesServiceEndpoint}/user/update`, requestOptions)
        .then(handleResponse)
        .then(result => {
            return result;
        })
        .catch(error => console.log('error', error));
}

function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    localStorage.removeItem('businessConditions');
}

function handleResponse(response) {
    var errorMsg = '';
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                // auto logout if 401 response returned from api

                // logout();
                // location.reload(true);
                errorMsg = 'Please signin again';
            }
            if (data.message == undefined || data == undefined || data.error_message == '' || data.error_message == undefined) {
                errorMsg = 'An unexpected error occured.';
            } else {
                errorMsg = (data && data.message) || response.statusText || data.error_message;
            }

            return Promise.reject(errorMsg);
        }
        if (response.status == "FAILED") {
            errorMsg = data.message;
        }
        return data;
    });
}
import { authHeader } from './auth-header';
import { getEndpoint } from './endpoint';

export const shopService = {
    getAllShops,
    logout,
    registerShop,
    editShop
};

export const state = { status: false };

const ackremittancesServiceEndpoint = getEndpoint();

async function getAllShops() {

    var requestOptions = {
        method: 'GET',
        headers: authHeader(),
        redirect: 'follow'
    };

    return fetch(`${ackremittancesServiceEndpoint}/shops`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        })
        .catch(error => console.log('An error occurred', error));
}

function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    localStorage.removeItem('businessConditions');
}

async function registerShop(shop) {
    var myHeaders = new Headers();
    let accessToken = JSON.parse(localStorage.getItem('access_token'));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", 'Bearer ' + accessToken);
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(shop),
        redirect: 'follow'
    };
    return fetch(`${ackremittancesServiceEndpoint}/shop/save`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        })
        .catch(error => console.log('error', error));
}

async function editShop(shop) {
    var myHeaders = new Headers();
    let accessToken = JSON.parse(localStorage.getItem('access_token'));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", 'Bearer ' + accessToken);
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(shop),
        redirect: 'follow'
    };
    return fetch(`${ackremittancesServiceEndpoint}/shop/edit`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        })
        .catch(error => console.log('error', error));
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
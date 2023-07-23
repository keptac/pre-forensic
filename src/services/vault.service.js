import { authHeader } from './auth-header';
import { getEndpoint } from './endpoint';

export const vaultService = {
    logout,
    fundVault,
    closeVault,
    tillClosureRequests,
    tillFundingRequests,
    tellerActivity,
    supervisorActivity
};


export const state = { status: false };

const ackremittancesServiceEndpoint = getEndpoint();

function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    localStorage.removeItem('businessConditions');
}

async function fundVault(requestBody) {
    var myHeaders = new Headers();
    let accessToken = JSON.parse(localStorage.getItem('access_token'));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", 'Bearer ' + accessToken);
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(requestBody),
        redirect: 'follow'
    };
    return fetch(`${ackremittancesServiceEndpoint}/shop/fund`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        })
        .catch(error => console.log('error', error));
}

async function closeVault(requestBody) {
    var myHeaders = new Headers();
    let accessToken = JSON.parse(localStorage.getItem('access_token'));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", 'Bearer ' + accessToken);
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(requestBody),
        redirect: 'follow'
    };
    return fetch(`${ackremittancesServiceEndpoint}/shop/close`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        })
        .catch(error => console.log('error', error));
}

async function tellerActivity(requestBody) {
    var myHeaders = new Headers();
    let accessToken = JSON.parse(localStorage.getItem('access_token'));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", 'Bearer ' + accessToken);
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(requestBody),
        // redirect: 'follow'
    };
    return fetch(`${ackremittancesServiceEndpoint}/teller/updateActivity`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        })
        .catch(error => console.log('error', error));
}

async function supervisorActivity(transaction) {
    var myHeaders = new Headers();
    let accessToken = JSON.parse(localStorage.getItem('access_token'));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", 'Bearer ' + accessToken);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(transaction),
        // redirect: 'follow'
    };

    return fetch(`${ackremittancesServiceEndpoint}/supervisor/updateActivity`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        })
        .catch(error => console.log('error', error));
}

async function tillClosureRequests(shopId) {
    var myHeaders = new Headers();
    let accessToken = JSON.parse(localStorage.getItem('access_token'));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", 'Bearer ' + accessToken);
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
        redirect: 'follow'
    };
    return fetch(`${ackremittancesServiceEndpoint}/report/pendingAuthorisation/${shopId}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        })
        .catch(error => console.log('error', error));
}

async function tillFundingRequests(tellerId) {
    var myHeaders = new Headers();
    let accessToken = JSON.parse(localStorage.getItem('access_token'));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", 'Bearer ' + accessToken);
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
        redirect: 'follow'
    };
    return fetch(`${ackremittancesServiceEndpoint}/report/pendingTellerAuthorisation/${tellerId}`, requestOptions)
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
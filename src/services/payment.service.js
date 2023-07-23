import { authHeader } from './auth-header';
import { getEndpoint } from './endpoint';

export const paymentService = {
    getAllTransactions,
    logout,
    authorizeTransaction,
    getTransactionByReference,
    authorizeTransactionReversal,
    initiateTransaction,
    getAllReversals
};

export const state = { status: false };

const ackremittancesServiceEndpoint = getEndpoint();

async function getAllTransactions() {

    var requestOptions = {
        method: 'GET',
        headers: authHeader(),
        redirect: 'follow'
    };

    return fetch(`${ackremittancesServiceEndpoint}/transactions`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        })
        .catch(error => console.log('An error occurred', error));
}

async function getTransactionByReference(reference) {
    var requestOptions = {
        method: 'GET',
        headers: authHeader(),
        redirect: 'follow'
    };

    return fetch(`${ackremittancesServiceEndpoint}/transactions/${reference}`, requestOptions)
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

async function initiateTransaction(transaction) {
    var myHeaders = new Headers();
    let accessToken = JSON.parse(localStorage.getItem('access_token'));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", 'Bearer ' + accessToken);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(transaction),
    };

    return fetch(`${ackremittancesServiceEndpoint}/transaction/save`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        })
        .catch(error => console.log('error', error));
}

async function authorizeTransaction(transaction) {
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

    return fetch(`${ackremittancesServiceEndpoint}/teller/updateActivity`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        })
        .catch(error => console.log('error', error));
}

async function authorizeTransactionReversal(transaction) {
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

async function getAllReversals() {

    var requestOptions = {
        method: 'GET',
        headers: authHeader(),
        redirect: 'follow'
    };

    return fetch(`${ackremittancesServiceEndpoint}/transactions/reversals`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        })
        .catch(error => console.log('An error occurred', error));
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
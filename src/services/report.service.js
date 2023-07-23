import { authHeader } from './auth-header';
import { getEndpoint } from './endpoint';

export const reportService = {
    getGlobalDashboard,
    searchTransactions,
    getGlobalTransactionReport,
    getUserAuditResponse,
    logout,
    getTellerDashboard,
};

export const state = { status: false };

const ackremittancesServiceEndpoint = getEndpoint();

async function getGlobalDashboard(id) {

    var requestOptions = {
        method: 'GET',
        headers: authHeader(),
        redirect: 'follow'
    };

    return fetch(`${ackremittancesServiceEndpoint}/report/dashboard/${id}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        })
        .catch(error => console.log('An error occurred', error));
}

async function getTellerDashboard(tellerId) {

    var requestOptions = {
        method: 'GET',
        headers: authHeader(),
        redirect: 'follow'
    };

    return fetch(`${ackremittancesServiceEndpoint}/report/dashboard/teller/${tellerId}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        })
        .catch(error => console.log('An error occurred', error));
}

async function getGlobalTransactionReport() {

    var endpoint = "";

    if(JSON.parse(localStorage.getItem('accessRights')).some(access => access.groupName === 'Teller Dashboard')){
        endpoint = "teller/";
    }

    var requestOptions = {
        method: 'GET',
        headers: authHeader(),
        redirect: 'follow'
    };

    return fetch(`${ackremittancesServiceEndpoint}/transactions/${endpoint}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        })
        .catch(error => console.log('An error occurred', error));
}

async function getUserAuditResponse() {

    var requestOptions = {
        method: 'GET',
        headers: authHeader(),
        redirect: 'follow'
    };

    return fetch(`${ackremittancesServiceEndpoint}/users/activity/`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        })
        .catch(error => console.log('An error occurred', error));
}

async function searchTransactions(searchParams) {
    var requestOptions = {
        method: 'GET',
        headers: authHeader(),
        redirect: 'follow'
    };

    var endpoint = "";

    if(JSON.parse(localStorage.getItem('accessRights')).some(access => access.groupName === 'Teller Dashboard')){
        endpoint = "teller/";
    }


    console.log(searchParams);

    if(searchParams.shopId=="" && searchParams.endDate=="" && searchParams.startDate==""){
        endpoint = endpoint+"";
    }else if(searchParams.shopId=="" && searchParams.startDate!="" && searchParams.endDate!=""){
        endpoint = endpoint+"period/"+searchParams.startDate+"/"+searchParams.endDate;
    }else if(searchParams.shopId!=="" && searchParams.endDate!=="" && searchParams.startDate!==""){
        endpoint = endpoint+searchParams.shopId+"/"+searchParams.startDate+"/"+searchParams.endDate
    }else if(searchParams.shopId!=="" && searchParams.endDate=="" && searchParams.startDate=="" ){
        endpoint = endpoint+searchParams.shopId
    }else{
        endpoint = endpoint+"";
    }


    return fetch(`${ackremittancesServiceEndpoint}/transactions/${endpoint}`, requestOptions)
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
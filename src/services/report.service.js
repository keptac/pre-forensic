import { authHeader } from './auth-header';
import { getEndpoint } from './endpoint';

const S3 = require('aws-sdk/clients/s3');

var s3 = new S3({
    accessKeyId: 'AKIAXVFKDDIKDCP2FJGX',
    secretAccessKey: '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',
    region: 'af-south-1'
});


export const reportService = {
    getAlls3Data,
    getGlobalDashboard,
    searchTransactions,
    getGlobalTransactionReport,
    getUserAuditResponse,
    logout,
    getTellerDashboard
    
};

export const state = { status: false };

const ackremittancesServiceEndpoint = getEndpoint();

async function getAlls3Data() {

    // input_internal_data
    s3.getObject({
        Bucket : 'preforensic-data',
        Key: 'input_internal_data_json.json'
    }).on('success', function(response) {
        localStorage.setItem('input_internal_data', JSON.stringify(JSON.parse(response.data.Body)));
        return response;
    }).send();

    //external_data_json.json
    s3.getObject({
        Bucket : 'preforensic-data',
        Key: 'external_data_json.json'
    }).on('success', function(response) {
        localStorage.setItem('external_data_count', JSON.parse(response.data.Body).length);
        localStorage.setItem('external_data', JSON.stringify(JSON.parse(response.data.Body)));
        return response;
    }).send();

    
    // keyword_data_json.json
    s3.getObject({
        Bucket : 'preforensic-data',
        Key: 'key_words_data_body.json'
    }).on('success', function(response) {
        localStorage.setItem('keyword_data_count', JSON.parse(response.data.Body).length);
        localStorage.setItem('keyword_data', JSON.stringify(JSON.parse(response.data.Body).slice(0,30)));
        return response;
    }).send();

    // recommendations.json
    s3.getObject({
        Bucket : 'preforensic-data',
        Key: 'recommendations.json'
    }).on('success', function(response) {
        localStorage.setItem('recommendations', JSON.stringify(JSON.parse(response.data.Body).slice(0,30)));
        return response;
    }).send();

    // entity_data.json
    s3.getObject({
        Bucket : 'preforensic-data',
        Key: 'entity_data.json'
    }).on('success', function(response) {
        localStorage.setItem('entity_data_count', JSON.parse(response.data.Body).length);
        localStorage.setItem('entity_data', JSON.stringify(JSON.parse(response.data.Body).slice(0,30)));
        return response;
    }).send();


      //case_data.json
      s3.getObject({
        Bucket : 'preforensic-data',
        Key: 'case_data.json'
    }).on('success', function(response) {
        localStorage.setItem('case_data_count', JSON.parse(response.data.Body).length);
        localStorage.setItem('case_data', JSON.stringify(JSON.parse(response.data.Body).slice(0,30)));
        return response;
    }).send();


       //all_results.json
       s3.getObject({
        Bucket : 'preforensic-data',
        Key: 'all_results.json'
    }).on('success', function(response) {
        localStorage.setItem('all_results_count', JSON.parse(response.data.Body).length);
        localStorage.setItem('all_results', JSON.stringify(JSON.parse(response.data.Body).slice(0,30)));
        return response;
    }).send();
}

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
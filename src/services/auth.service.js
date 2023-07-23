import { getEndpoint, getAuthEndpoint } from './endpoint';

export const authService = {
    login,
    logout,
    activateCustomerAccount,
    activateAgentAccount,
    passwordReset,
    forgotPassword
};

const ackremittancesServiceEndpoint = getEndpoint();
const ackremittancesVerificationEndpoint = getAuthEndpoint();


async function login(username, password) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "operation": "login",
        "accessToken": "",
        "requestBody": {
            "username": username,
            "password": password,
        }
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(`${ackremittancesVerificationEndpoint}/login`, requestOptions)
        .then(handleResponse)
        .then(result => {
            return result;
        })
        .catch(error => console.log('error', error));
}



async function activateAgentAccount(token,password) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(
        {
            "operation" : "activate agent",
            "accessToken" : "",
            "requestBody" :
                {
                    "token" : token,
                    "password" : password
                }
        });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(`${ackremittancesServiceEndpoint}/registration/activate/agent`, requestOptions)
        .then(handleResponse)
        .then(result => { return result; })
        .catch(error => console.log('error', error));

}

async function activateCustomerAccount(token) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(`${ackremittancesServiceEndpoint}/registration/confirm?token=${token}`, requestOptions)
        .then(handleResponse)
        .then(result => { return result; })
        .catch(error => console.log('error', error));

}

async function forgotPassword(email) {

    var myHeaders = new Headers();
    // let accessToken =  JSON.parse(localStorage.getItem('access_token'));
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Authorization", 'Bearer ' + accessToken);

    var raw = JSON.stringify({
        "operation": "ResetPasswordRequest",
        // "accessToken": accessToken,
        "requestBody": {
            "userName": email,
        }
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(`${ackremittancesServiceEndpoint}/user/resetUserPassword`, requestOptions)
        .then(handleResponse)
        .then(result => {
            return result;
        })
        .catch(error => console.log('error', error));
}

async function passwordReset(userName, otp, newPassword) {

    var myHeaders = new Headers();
    // let accessToken = JSON.parse(localStorage.getItem('access_token'));
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Authorization", 'Bearer ' + accessToken);
    var raw = JSON.stringify({
        "operation": "resetPasswordInitiate",
        // "accessToken": accessToken,
        "requestBody": {
            "userName": userName,
            "otp": otp,
            "password":newPassword
        }
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(`${ackremittancesServiceEndpoint}/user/setNewUserPassword`, requestOptions)
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
                // logout();
                // location.reload(true);
            }
            if (data == undefined || data.message == undefined) {
                errorMsg = 'An error occured. Please try again later';
            } else {
                errorMsg = (data && data.message) || response.statusText || response.error;
            }

            return Promise.reject(errorMsg);
        }
        if (response.status == "FAILED") {
            errorMsg = data.message;
        }

        return data;
    });
}
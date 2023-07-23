export function authHeader() {
    // return authorization header with jwt token
    let accessToken = JSON.parse(localStorage.getItem('access_token'));

    var myHeaders = new Headers();
    myHeaders.append("Authorization", 'Bearer ' + accessToken);

    if (accessToken) {
        return myHeaders;
    } else {
        return {};
    }
}
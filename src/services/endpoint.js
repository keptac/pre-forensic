import dotenv from 'dotenv';
dotenv.config();

export function getEndpoint() {
    const apiUrl = process.env.VUE_APP_BACKEND_API_URL;
    return apiUrl+"api/v1";
}

export function getAuthEndpoint() {
    const apiUrl = process.env.VUE_APP_BACKEND_API_URL;
    return apiUrl+"api/v3";

}
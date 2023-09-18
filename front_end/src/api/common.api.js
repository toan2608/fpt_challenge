import { API_URL, JWT_TOKEN } from "../configs/configs";
import { setLocalStorage, clearLocalStorage, getLocalStorage, removeLocalStorage} from "../utils/storageUtils";
import { axiosRequest, axiosMethod} from "../utils/axios";

export const httpPostData = (url, data) => {
    const token = getLocalStorage(JWT_TOKEN);
    return new Promise((resolve, reject) => {
        axiosRequest(API_URL+url, axiosMethod.POST, token, data)
        .then((response) => {
            resolve(response)
        })
        .catch((error) => {
            console.log('error post data', error);
            // checkErrorReturn(error);
            if(error.response.status === 401 || error.response.status === 403){
                removeLocalStorage('token');
                removeLocalStorage('username');
                removeLocalStorage('idUsername');
                window.location.href = '/login';
                // reject(error)
            }
        })
    })
}

export const httpGetData = (url, data) => {
    const token = getLocalStorage(JWT_TOKEN);
    return new Promise((resolve, reject) => {
        axiosRequest(API_URL + url, axiosMethod.GET, token, data)
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            console.log('error get data', error)
            if(error.response.status === 401 || error.response.status === 403){
                removeLocalStorage('token');
                removeLocalStorage('username');
                removeLocalStorage('idUsername');
                window.location.href = '/login';
                // reject(error)
            }
            // checkErrorReturn(error);
        })
    })
}
export const httpUpdateData = (url, data) => {
    const token = getLocalStorage(JWT_TOKEN);
    return new Promise((resolve, reject) => {
        axiosRequest(API_URL + url, axiosMethod.PUT, token, data)
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            console.log('error get data', error)
            if(error.response.status === 401 || error.response.status === 403){
                removeLocalStorage('token');
                removeLocalStorage('username');
                removeLocalStorage('idUsername');
                window.location.href = '/login';
                // reject(error)
            }
            // checkErrorReturn(error);
            // reject(error)
        })
    })
}

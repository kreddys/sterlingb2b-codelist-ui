import config from '../config/config.json';
import base64 from 'base-64';

const apiUrl = config.b2b_rest_endpoint_codelistcodes;

async function b2bAuthenticate (url, username, password){
    let headers = new Headers({ Accept: 'application/json' });
    headers.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));

    let response = await fetch(url, {headers});
    let data = await response.json();

    return data;

}

export default {
    // called when the user attempts to log in
    login: ({ username, password }) =>  {
        return b2bAuthenticate(apiUrl, username, password)
                .then(data => {
                    if(data.errorCode){
                        throw new Error(data.errorDescription);
                    }
                    localStorage.setItem('AuthHeader', 'Basic ' + base64.encode(username + ":" + password));
                });
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem('AuthHeader');
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('AuthHeader');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem('AuthHeader')
            ? Promise.resolve()
            : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => {
        return Promise.resolve()
    }
};
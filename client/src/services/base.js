import 'isomorphic-fetch';

const AUTH_TOKEN_KEY = 'authtoken';
let authToken = '';

function setAuthToken(token) {
    authToken = `Bearer ${token}`;
    if (localStorage) {
        localStorage.setItem(AUTH_TOKEN_KEY, authToken);
    }
}

function clearAuthToken() {
    authToken = '';
    if (localStorage) {
        localStorage.removeItem(AUTH_TOKEN_KEY);
    }
}

function populateAuthToken() {
    if (localStorage) {
        let token = localStorage.getItem(AUTH_TOKEN_KEY);
        if (token && token !== null) {
            authToken = token;
        }
    }
}

function makeFetch(url, info) {
    return fetch(url, info);
}

function json(url, method = 'GET', payload = {}) {
    let data = {
        method,
        body: JSON.stringify(payload),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': authToken
        })
    };
    if (method === 'GET') {
        delete data.body;
    }
    return makeFetch(url, data)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw response;
        }
    });
}

function get(url) {
    return json(url);
}

function post(url, payload) {
    return json(url, 'POST', payload);
}

function put(url, payload) {
    return json(url, 'PUT', payload);
}

function destroy(url, payload) {
    return json(url, 'DELETE', payload);
}

export {
    setAuthToken,
    populateAuthToken,
    clearAuthToken,
    get,
    post,
    put,
    destroy,
    makeFetch
};
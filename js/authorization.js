'use strict'

function updateOptions(options) {
    const update = { ...options };
    update.mode = 'cors';
    update.headers = { ... options.headers };
    update.headers['Content-Type'] = 'application/json';
    const user = restoreUser();
    if(user) {
        update.headers['Authorization'] = 'Basic ' + btoa(user.username + ':' + user.password);
    }
    return update;
}

function saveUser(user) {
    const userAsJSON = JSON.stringify(user);
    localStorage.setItem('user', userAsJSON);
}

function restoreUser() {
    const userAsJSON = localStorage.getItem('user');
    const user = JSON.parse(userAsJSON);
    return user;
}

function fetchAuthorised(url, options) {
    const settings = options || {};
    return fetch(url, updateOptions(settings));
}

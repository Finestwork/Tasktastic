import axios from 'axios';

export default class Auth {
    static #CSRF_TOKEN = document.querySelector('input[name="_token"]').value;

    // Get the currently logged-in user
    static checkUser(options = {}) {
        const HEADERS = Object.assign(Auth.#defaultOptions(), options);
        return axios.post('/check-user', {}, { headers: HEADERS });
    }

    // Login user
    static login(data, options = {}) {
        const HEADERS = Object.assign(Auth.#defaultOptions(), options);
        return axios.post('/login', data, { headers: HEADERS });
    }

    // Signs up user
    static signup(data, options = {}) {
        const HEADERS = Object.assign(Auth.#defaultOptions(), options);
        return axios.post('/signup', data, { headers: HEADERS });
    }

    /*
     * ================
     * Helpers
     * ================
     */

    // Get default options
    static #defaultOptions() {
        return {
            'X-CSRF-TOKEN': Auth.#CSRF_TOKEN,
        };
    }

    /*
     * ================
     * Getters & Setters
     * ================
     */

    static get csrfToken() {
        return Auth.#CSRF_TOKEN;
    }
}

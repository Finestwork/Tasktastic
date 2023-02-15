import axios from 'axios';

export default class Auth {
    // Get the currently logged-in user
    static checkUser(options = {}) {
        const HEADERS = Object.assign(Auth.#defaultOptions(), options);
        return axios.post('/check-user', {}, { headers: HEADERS });
    }

    // Signs up user
    static signup(data, options = {}) {
        const HEADERS = Object.assign(Auth.#defaultOptions(), options);
        return axios.post('/signup', data, { headers: HEADERS });
    }

    // Get default options
    static #defaultOptions() {
        const TOKEN = document.querySelector('input[name="_token"]').value;

        return {
            'X-CSRF-TOKEN': TOKEN,
        };
    }
}

import axios from 'axios';

export default class Todo {
    static #CSRF_TOKEN = document.querySelector('input[name="_token"]').value;

    // Create a todo-list
    static create(data, options = {}) {
        const OPTIONS = Object.assign(Todo.#defaultHeaders(), options);
        return axios.post('/todo/create', data, OPTIONS);
    }

    /*
     * ================
     * Helpers
     * ================
     */

    // Get default options
    static #defaultHeaders() {
        return {
            headers: {
                'X-CSRF-TOKEN': Todo.#CSRF_TOKEN,
            },
        };
    }
}

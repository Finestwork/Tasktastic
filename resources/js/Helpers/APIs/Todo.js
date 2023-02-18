import axios from 'axios';

export default class Todo {
    static #CSRF_TOKEN = document.querySelector('input[name="_token"]').value;

    // Create a todo-list
    static create(data, options = {}) {
        const OPTIONS = Object.assign(Todo.#defaultHeaders(), options);
        return axios.post('/todo/create', data, OPTIONS);
    }

    // Update todo list progress
    static updateProgress(data, options = {}) {
        const OPTIONS = Object.assign(Todo.#defaultHeaders(), options);
        return axios.post('/todo/personal/update-progress', data, OPTIONS);
    }

    // Fetch all personal tasks
    static fetchAllPersonalTasks(options = {}) {
        const OPTIONS = Object.assign(Todo.#defaultHeaders(), options);
        return axios.post('/todo/personal/all', {}, OPTIONS);
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

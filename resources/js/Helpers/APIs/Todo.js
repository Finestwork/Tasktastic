import axios from 'axios';

export default class Todo {
    static #CSRF_TOKEN = document.querySelector('input[name="_token"]').value;

    // Creates a personal todo
    static create(data, options = {}) {
        const OPTIONS = Object.assign(Todo.#defaultHeaders(), options);
        return axios.post('/todo/create', data, OPTIONS);
    }

    // Deletes a personal todo
    static delete(todoId, options = {}) {
        const OPTIONS = Object.assign(Todo.#defaultHeaders(), options);
        return axios.post('/todo/personal/delete', { todoId }, OPTIONS);
    }

    // Update a personal todo progress
    static updatePersonalProgress(data, options = {}) {
        const OPTIONS = Object.assign(Todo.#defaultHeaders(), options);
        return axios.post('/todo/personal/update-progress', data, OPTIONS);
    }

    // Update a personal todo
    static updatePersonalTask(DATA, options = {}) {
        const OPTIONS = Object.assign(Todo.#defaultHeaders(), options);
        return axios.post('/todo/personal/update', DATA, OPTIONS);
    }

    // Update a personal todo
    static browsePersonalTask(data, options = {}) {
        const OPTIONS = Object.assign(Todo.#defaultHeaders(), options);
        return axios.post('/todo/personal/browse', data, OPTIONS);
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

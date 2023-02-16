export default class BootstrapMediaQuery {
    static #DEFAULT_MEDIA_QUERIES = {
        xsm: 320,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1400,
    };

    /*
     * ======================
     * Getters & Setters
     * ======================
     */

    static get mediaQuery() {
        return BootstrapMediaQuery.#DEFAULT_MEDIA_QUERIES;
    }
}

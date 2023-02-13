export default class TypeChecker {
    // Checks if parameter is in json format
    static isJson(json) {
        try {
            const PARSED_JSON = JSON.parse(JSON.stringify(json));
            return (
                typeof PARSED_JSON === 'object' &&
                Object.getPrototypeOf(PARSED_JSON) === Object.prototype
            );
        } catch (e) {
            return false;
        }
    }
}

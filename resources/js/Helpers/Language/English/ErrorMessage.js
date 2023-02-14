export default class ErrorMessage {
    static required = 'This field is required, avoid leaving it blank.';
    static email = 'This field must enter a valid email address.';
    static min = (min) => `Characters must be at least ${min}.`;
    static max = (max) => `Characters must be greater than ${max}.`;
    static sameWith = (field) =>
        `This field must be the same to ${field} field.`;
}

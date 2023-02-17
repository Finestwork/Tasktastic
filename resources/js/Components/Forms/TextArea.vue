<template>
    <div :class="getRootWrapperClass">
        <label :for="options.inputSettings.id" v-if="shouldShowLabel">{{
            options.labelSettings.text
        }}</label>

        <div class="text-area__wrapper">
            <textarea
                ref="input"
                :placeholder="options.inputSettings.placeholder"
                :id="options.inputSettings.id"
                v-model="textInputValue"
                @blur="onBlur"
                @keyup="onKeyup"
                @keydown="onKeydown"
            ></textarea>
        </div>

        <!-- Errors -->
        <ul class="errors" v-auto-animate>
            <li class="error__item" v-for="prop in errors" :key="prop">
                {{ Object.values(prop)[0] }}
            </li>
        </ul>

        <!-- Addons -->
        <slot name="addons"></slot>
    </div>
</template>

<script>
/*
 * TODO:
 *  [x] variant: 'flat', 'underlined', 'outlined'
 * [x] error state
 * [x] disabled state
 */

// Helpers
import ErrorMessage from '../../Helpers/Language/English/ErrorMessage';

// NPM
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/es/lib/isEmail';

export default {
    props: {
        /**
         * @options: {variant, colorScheme, inputSettings, labelSettings, validations}
         * @variant: 'faded'
         * @colorScheme: 'primary', 'secondary'
         * @inputSettings: {placeholder: String, id: String}
         * @labelSettings: {text: String}
         * @validations: {
         *     required: Boolean
         *     email: Boolean
         *     max: Integer
         *     min: Integer
         *     sameWith: {element: CSS valid selector, fieldName: String}
         * }
         */
        options: {
            type: Object,
            required: true,
        },

        // Text input's default value
        defaultValue: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            // Text input value
            textInputValue: this.defaultValue,

            // Collected validation functions
            validations: [],

            // Contains possible errors
            errors: [],
        };
    },
    mounted() {
        this.getPossibleValidations();
    },
    methods: {
        // Collect all possible validations
        getPossibleValidations() {
            if (!this.options.hasOwnProperty('validations')) return;

            // Function that checks if a validation property contains a specific validation type
            const hasABooleanProperty = (type) =>
                this.options.validations.hasOwnProperty(type) &&
                this.options.validations[type];
            const hasAnIntegerProperty = (type) =>
                this.options.validations.hasOwnProperty(type) &&
                Number.isInteger(this.options.validations[type]);
            const hasAStringProperty = (type) =>
                this.options.validations.hasOwnProperty(type) &&
                this.options.validations[type].length !== 0;
            const hasAnObjectProperty = (type) =>
                this.options.validations.hasOwnProperty(type) &&
                Object.keys(this.options.validations[type]).length !== 0;

            // Collect all possible validation functions
            if (hasABooleanProperty('required'))
                this.validations.push(this.isRequired);
            if (hasABooleanProperty('email'))
                this.validations.push(this.isEmail);
            if (hasAnIntegerProperty('min')) this.validations.push(this.isMin);
            if (hasAnIntegerProperty('max')) this.validations.push(this.isMax);
        },

        // Run all collected validation functions
        runValidation() {
            this.validations.forEach((fn) => {
                fn();
            });
        },

        // Adds error to the array
        addError(errorType, msg) {
            // Only add errorObj if it is not in the error array
            const IND = this.errors.findIndex((obj) =>
                obj.hasOwnProperty(errorType)
            );
            if (IND === -1) {
                this.errors = [
                    ...this.errors,
                    {
                        [errorType]: msg,
                    },
                ];
            }
        },

        // Removes error to the array
        removeError(errorType) {
            // If error contains the message remove it
            const IND = this.errors.findIndex((obj) =>
                obj.hasOwnProperty(errorType)
            );
            if (IND !== -1) this.errors.splice(IND, 1);
        },

        /*
         * ======================
         * Emits
         * ======================
         */

        onBlur(e) {
            this.runValidation();
            this.$emit('onBlur', e);
        },

        onKeyup(e) {
            this.runValidation();
            this.$emit('onKeyup', e);
        },

        onKeydown(e) {
            this.$emit('onKeydown', e);
        },

        /*
         * ======================
         * Validations
         * ======================
         */

        // Checks if input is required
        isRequired() {
            if (isEmpty(this.textInputValue)) {
                const MSG = `• ${ErrorMessage.required}`;
                this.addError('required', MSG);
            } else {
                this.removeError('required');
            }
        },

        // Checks if input should be in an email format or not
        isEmail() {
            if (
                !isEmpty(this.textInputValue) &&
                !isEmail(this.textInputValue)
            ) {
                const MSG = `• ${ErrorMessage.email}`;
                this.addError('email', MSG);
            } else {
                this.removeError('email');
            }
        },

        // Verifies if the value of the input is less than the specified minimum value
        isMin() {
            if (
                !isEmpty(this.textInputValue) &&
                this.textInputValue.length < this.options.validations.min
            ) {
                const MSG = `• ${ErrorMessage.min(
                    this.options.validations.min
                )}`;
                this.addError('min', MSG);
            } else {
                this.removeError('min');
            }
        },

        // Verifies if the value of the input is greater than the specified maximum value
        isMax() {
            if (
                !isEmpty(this.textInputValue) &&
                this.textInputValue.length > this.options.validations.max
            ) {
                const MSG = `• ${ErrorMessage.max(
                    this.options.validations.max
                )}`;
                this.addError('max', MSG);
            } else {
                this.removeError('max');
            }
        },
    },
    computed: {
        getRootWrapperClass() {
            console.log(this.options);
            let baseClass = `text-area--${this.options.variant}--${this.options.colorScheme}`;

            if (this.errors.length !== 0) baseClass += ' form--error';
            return baseClass;
        },
        shouldShowLabel() {
            return (
                this.options.hasOwnProperty('labelSettings') &&
                Object.keys(this.options.labelSettings).length !== 0
            );
        },
    },
};
</script>

<style lang="scss">
@use '../../../scss/5-Components/forms/text-areas/primary';
@use '../../../scss/5-Components/forms/text-areas/secondary';
</style>

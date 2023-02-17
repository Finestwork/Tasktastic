<template>
    <div :class="getRootWrapperClass">
        <label :for="options.inputSettings.id" v-if="shouldShowLabel">{{
            options.labelSettings.text
        }}</label>

        <div :class="getTextInputWrapperClass">
            <input
                ref="input"
                :type="options.inputSettings.type"
                :placeholder="options.inputSettings.placeholder"
                :id="options.inputSettings.id"
                :autocomplete="hasAutoComplete ? null : 'off'"
                v-model="textInputValue"
                @blur="onBlur"
                @keyup="onKeyup"
                @keydown="onKeydown"
            />
            <span
                class="text-input__leading-icon"
                v-html="options.leadingIcon"
                v-if="shouldDisplayLeadingIcon"
            ></span>
            <span
                class="text-input__trailing-icon"
                v-html="options.trailingIcon"
                v-if="shouldDisplayTrailingIcon"
            ></span>
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
         * @options: {variant, colorScheme, inputSettings, labelSettings, leadingIcon, trailingIcon, validations}
         * @variant: 'faded'
         * @colorScheme: 'primary', 'secondary'
         * @inputSettings: {type: String, placeholder: String, id: String}
         * @labelSettings: {text: String}
         * @leadingIcon: SVG wrapped in String
         * @trailingIcon: Same with @leadingIcon
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

            // A text input field with which the value of this component will be compared
            sameWithElement: null,
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
            if (hasAnObjectProperty('sameWith')) {
                this.sameWithElement = document.querySelector(
                    this.options.validations.sameWith.element
                );

                // Attach all events to same with element
                ['blur', ' keydown', 'keyup'].forEach((ev) => {
                    this.sameWithElement.addEventListener(ev, this.sameWith);
                });

                // Save the validation function
                this.validations.push(this.sameWith);
            }
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

        // Checks if the value of this component is equal to the value of the sameWith element
        sameWith() {
            if (
                !isEmpty(this.textInputValue) &&
                !isEmpty(this.sameWithElement.value) &&
                this.textInputValue !== this.sameWithElement.value
            ) {
                const MSG = `• ${ErrorMessage.sameWith(
                    this.options.validations.sameWith.fieldName
                )}`;
                this.addError('sameWith', MSG);
            } else {
                this.removeError('sameWith');
            }
        },
    },
    computed: {
        getRootWrapperClass() {
            let baseClass = `text-input--${this.options.variant}--${this.options.colorScheme}`;

            if (this.errors.length !== 0) baseClass += ' form--error';
            return baseClass;
        },
        getTextInputWrapperClass() {
            let inputWrapperClass = 'text-input__wrapper';

            if (this.shouldDisplayLeadingIcon)
                inputWrapperClass += ' add-leading-icon';

            if (this.shouldDisplayTrailingIcon)
                inputWrapperClass += ' add-trailing-icon';

            return inputWrapperClass;
        },
        shouldDisplayLeadingIcon() {
            return (
                this.options.hasOwnProperty('leadingIcon') &&
                this.options.leadingIcon !== ''
            );
        },
        shouldDisplayTrailingIcon() {
            return (
                this.options.hasOwnProperty('trailingIcon') &&
                this.options.trailingIcon !== ''
            );
        },
        shouldShowLabel() {
            return (
                this.options.hasOwnProperty('labelSettings') &&
                Object.keys(this.options.labelSettings).length !== 0
            );
        },
        hasAutoComplete() {
            return (
                !!this.options.inputSettings &&
                this.options.inputSettings.hasOwnProperty('autocomplete') &&
                this.options.inputSettings.autocomplete
            );
        },
    },
};
</script>

<style lang="scss">
@use '../../../scss/5-Components/forms/text-input-fields/primary';
@use '../../../scss/5-Components/forms/text-input-fields/secondary';
</style>

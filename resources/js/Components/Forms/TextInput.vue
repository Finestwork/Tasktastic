<template>
    <div :class="getRootWrapperClass">
        <label :for="options.inputSettings.id" v-if="shouldShowLabel">{{
            options.labelSettings.text
        }}</label>

        <div :class="getTextInputWrapperClass">
            <input
                :type="options.inputSettings.type"
                :placeholder="options.inputSettings.placeholder"
                :id="options.inputSettings.id"
                :autocomplete="hasAutoComplete ? null : 'off'"
                v-model="textInputValue"
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
    </div>
</template>

<script>
/*
 * TODO:
 *  [x] variant: 'faded', 'underlined', 'outlined'
 * [x] error state
 * [x] disabled state
 */
export default {
    props: {
        /**
         * @options: {variant, colorScheme, inputSettings, labelSettings, leadingIcon, trailingIcon}
         * @variant: 'flat'
         * @colorScheme: 'primary', 'secondary'
         * @inputSettings: {type: String, placeholder: String, id: String}
         * @labelSettings: {text: String}
         * @leadingIcon: SVG wrapped in String
         * @trailingIcon: Same with @leadingIcon
         */
        options: {
            type: Object,
            required: true,
        },

        defaultValue: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            textInputValue: this.defaultValue,
        };
    },
    computed: {
        getRootWrapperClass() {
            return `text-input--${this.options.variant}--${this.options.colorScheme}`;
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

<template>
    <p :class="getRootClass">
        <span class="alert__text" v-html="options.alertSettings.text"></span>
    </p>
</template>

<script>
export default {
    props: {
        /**
         * @options: {colorScheme, variant, alertSettings}
         * @colorScheme: 'danger', 'success'
         * @variant: 'flat'
         * @alertSettings: {text: String, leadingIcon: Svg wrapped in string, trailingIcon: Same with leadingIcon}
         */
        options: {
            type: Object,
            required: true,
        },
    },
    computed: {
        getRootClass() {
            return `inline-alert--list--${this.options.variant}--${this.options.colorScheme}`;
        },
    },
};
</script>

<style lang="scss">
@use '../../../../scss/5-Components/alerts/inline/single-line/success';
@use '../../../../scss/5-Components/alerts/inline/single-line/danger';
</style>

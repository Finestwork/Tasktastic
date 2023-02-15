<template>
    <ul :class="getRootClass">
        <li v-for="item in items" :key="item" v-html="item"></li>
    </ul>
</template>

<script>
export default {
    props: {
        /**
         * @options: {colorScheme, variant}
         * @colorScheme: 'danger'
         * @variant: 'outline'
         */
        options: {
            type: Object,
            required: true,
        },

        items: {
            type: Array,
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
@use '../../../../scss/5-Components/alerts/inline/list/danger';
</style>

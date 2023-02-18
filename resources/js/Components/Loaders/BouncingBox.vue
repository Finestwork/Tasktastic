<template>
    <div class="loader--bouncing-box">
        <span class="loader__animation"></span>

        <h2 class="loader__title" v-html="options.title"></h2>
        <p class="loader__msg" v-html="options.msg"></p>
    </div>
</template>

<script>
export default {
    props: {
        /**
         * @options: {title, msg}
         */
        options: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss">
@use '../../../scss/5-Components/loaders/bouncing-box';
</style>

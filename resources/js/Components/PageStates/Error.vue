<template>
    <div class="page-state--error">
        <span class="error__img" v-if="shouldDisplayImage">
            <img :src="options.img.src" :alt="options.img.alt" />
        </span>

        <h2 class="error__title" v-if="shouldDisplayTitle">
            {{ options.title }}
        </h2>
        <p class="error__msg" v-if="shouldDisplayMsg">
            {{ options.msg }}
        </p>

        <slot name="addons"></slot>
    </div>
</template>

<script>
export default {
    props: {
        /**
         * @options: {title, msg, img}
         * @title: String
         * @msg: String
         * @img: {src: String, alt: String}
         */
        options: {
            type: Object,
            default: {},
        },
    },
    computed: {
        shouldDisplayImage() {
            return (
                Object.keys(this.options).length !== 0 &&
                this.options.hasOwnProperty('img') &&
                Object.keys(this.options.img).length !== 0
            );
        },
        shouldDisplayTitle() {
            return (
                Object.keys(this.options).length !== 0 &&
                this.options.hasOwnProperty('title') &&
                this.options.title !== ''
            );
        },
        shouldDisplayMsg() {
            return (
                Object.keys(this.options).length !== 0 &&
                this.options.hasOwnProperty('msg') &&
                this.options.msg !== ''
            );
        },
    },
};
</script>

<style lang="scss">
@use '../../../scss/5-Components/page-states/error';
</style>

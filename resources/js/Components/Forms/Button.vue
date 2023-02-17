<template>
    <button
        :class="getRootWrapperClass"
        :type="getBtnType"
        :disabled="isLoading"
        @click="onClick"
    >
        <span class="btn__main-content" v-if="!isLoading">
            <span
                class="btn__leading-icon"
                v-html="options.leadingIcon"
                v-if="shouldShowLeadingIcon"
            ></span>
            <span class="">{{ options.btnSettings.text }}</span>
            <span
                class="btn__trailing-icon"
                v-html="options.trailingIcon"
                v-if="shouldShowTrailingIcon"
            ></span>
        </span>
        <span class="btn__loader" v-if="isLoading">
            <span class="loader__icon" ref="loaderIcon"></span>
            <span class="loader__text">{{ getLoaderText }}</span>
        </span>
    </button>
</template>

<script>
import RotatingCircle from '../../../js/LottieFiles/RotatingCircle.json';

// NPM
import lottie from 'lottie-web';
import TypeChecker from '../../Helpers/Validators/TypeChecker';

/*
 * TODO:
 *  variant: 'faded', 'playful', 'ghost', 'outlined'
 */
export default {
    props: {
        /**
         * @options: {variant, colorScheme, btnSettings, leadingIcon, trailingIcon, loadingSettings}
         * @variant: 'flat'
         * @colorScheme: 'primary', 'secondary'
         * @btnSettings: {
         *     type: String,
         *     text: String
         * }
         * @leadingIcon: SVG wrapped in a String,
         * @trailingIcon: SVG wrapped in a String,
         * loadingSettings: {icon: JSON or lottie format, text: String}
         */
        options: {
            type: Object,
            required: true,
        },
        isLoading: {
            type: Boolean,
        },
    },
    data() {
        return {
            lottie: null,
        };
    },
    emits: ['onClick'],
    methods: {
        onClick() {
            this.$emit('onClick');
        },
    },
    computed: {
        getRootWrapperClass() {
            let BASE_CLASS = `btn--${this.options.variant}--${this.options.colorScheme}`;
            if (this.isLoading) BASE_CLASS += ' btn--loading';
            return BASE_CLASS;
        },
        isBtnSettingsEmpty() {
            return (
                !this.options.hasOwnProperty('btnSettings') ||
                (this.options.hasOwnProperty('btnSettings') &&
                    Object.keys(this.options).length === 0)
            );
        },
        getLoaderText() {
            return this.options.hasOwnProperty('loadingSettings') &&
                this.options.loadingSettings.hasOwnProperty('text') &&
                this.options.loadingSettings.text !== ''
                ? this.options.loadingSettings.text
                : 'Loading';
        },
        getLoaderIcon() {
            return this.options.hasOwnProperty('loadingSettings') &&
                this.options.loadingSettings.hasOwnProperty('icon') &&
                TypeChecker.isJson(this.options.loadingSettings.icon)
                ? this.options.loadingSettings.icon
                : RotatingCircle;
        },
        shouldShowLeadingIcon() {
            return (
                this.options.hasOwnProperty('leadingIcon') &&
                this.options.leadingIcon !== ''
            );
        },
        shouldShowTrailingIcon() {
            return (
                this.options.hasOwnProperty('trailingIcon') &&
                this.options.trailingIcon !== ''
            );
        },
        getBtnType() {
            const IS_VALID =
                !this.isBtnSettingsEmpty &&
                this.options.btnSettings.hasOwnProperty('type') &&
                this.options.btnSettings.type !== '';
            return IS_VALID ? this.options.btnSettings.type : 'button';
        },
    },
    watch: {
        isLoading: {
            handler(newVal) {
                if (newVal) {
                    this.$nextTick(() => {
                        this.lottie = lottie.loadAnimation({
                            container: this.$refs.loaderIcon,
                            renderer: 'svg',
                            loop: true,
                            autoplay: true,
                            animationData: this.getLoaderIcon,
                        });
                    });
                } else {
                    if (!!this.lottie) this.lottie.pause();
                }
            },
            immediate: true,
        },
    },
};
</script>

<style lang="scss">
@use '../../../scss/5-Components/forms/buttons/primary';
@use '../../../scss/5-Components/forms/buttons/secondary';
</style>

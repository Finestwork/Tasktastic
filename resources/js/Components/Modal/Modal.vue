<template>
    <div class="modal" v-if="showModal">
        <span class="modal__bg"></span>
        <div class="modal__main-content-wrapper">
            <div class="modal__main-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        showModal: {
            type: Boolean,
            required: true,
        },
    },
    watch: {
        showModal: {
            handler(showModal) {
                if (showModal) {
                    document.body.style.overflowY = 'hidden';
                } else {
                    document.body.style.overflowY = null;
                }
            },
            immediate: true,
        },
    },
};
</script>

<style lang="scss">
@use '../../../scss/5-Components/modal/modal';
</style>

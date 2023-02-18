<template>
    <div class="loader--load-indicator">
        <span
            class="load-indicator__progress"
            ref="progress"
            v-if="shouldShowProgress"
        ></span>
    </div>
</template>

<script>
import anime from 'animejs';

export default {
    props: {
        // In percentage
        progressWidth: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            progressAnimationId: null,
            shouldShowProgress: false,
        };
    },
    emits: ['progressDone'],
    watch: {
        progressWidth(width) {
            if (width === 0) return;
            this.shouldShowProgress = true;
            if (!!this.progressAnimationId) this.progressAnimationId.pause();

            this.$nextTick(() => {
                this.progressAnimationId = anime({
                    targets: this.$refs.progress,
                    easing: 'linear',
                    duration: 350,
                    width: `${width}%`,
                    complete: () => {
                        this.$refs.progress.style = null;
                        this.shouldShowProgress = false;
                        this.progressAnimationId = null;
                        this.$emit('progressDone');
                    },
                });
            });
        },
    },
};
</script>

<style lang="scss">
@use '../../../scss/5-Components/loaders/load-indicator';
</style>

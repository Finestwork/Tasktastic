<template>
    <div class="landing-page">
        <div class="forms" ref="formWrapper">
            <div class="header" ref="formHeader">
                <span class="header__logo">
                    <img
                        src="/assets/images/logos/logo.svg"
                        alt="Tasktastic's Logo"
                    />
                </span>
                <p class="header__tagline">
                    Spark your productivity with a tasty to-do list!
                </p>
            </div>
            <transition
                @beforeEnter="onBeforeEnter"
                @enter="onEnter"
                @beforeLeave="onBeforeLeave"
                @leave="onLeave"
            >
                <LoginPage v-if="shouldDisplayLoginPage" />
                <SignupPage v-else-if="shouldDisplaySignupPage" />
            </transition>
        </div>
    </div>
</template>

<script>
import LoginPage from './Partials/LoginPage';
import SignupPage from './Partials/SignupPage';

// NPM
import anime from 'animejs';
import NodeHelpers from '../../Helpers/TypeHelpers/NodeHelpers';

export default {
    components: {
        LoginPage,
        SignupPage,
    },
    data() {
        return {
            animationId: null,
        };
    },
    methods: {
        onBeforeEnter(el) {
            Object.assign(el.style, {
                opacity: '0',
                transform: 'scale(0)',
                display: 'none',
            });
        },
        onEnter(el, done) {
            this.animationId.finished.then(() => {
                el.style.display = null;

                anime({
                    targets: el,
                    easing: 'easeOutQuint',
                    duration: 500,
                    opacity: 1,
                    scale: 1,
                    complete: () => done(),
                });
            });
        },
        onBeforeLeave(el) {
            Object.assign(el.style, {
                opacity: '1',
                transform: 'scale(1)',
            });
        },
        onLeave(el, done) {
            this.animationId = anime({
                targets: el,
                easing: 'easeOutQuint',
                duration: 500,
                opacity: 0,
                scale: 0,
                complete: () => done(),
            });
        },
    },
    computed: {
        shouldDisplayLoginPage() {
            return this.$route.name === 'LoginPage';
        },
        shouldDisplaySignupPage() {
            return this.$route.name === 'SignupPage';
        },
    },
};
</script>

<style lang="scss">
@use 'sass:map';
@use '../../../scss/1-Settings/css-properties/font-size/major-second';
@use '../../../scss/1-Settings/css-properties/colors/main';
@use '../../../scss/1-Settings/css-properties/colors/text';
@use '../../../scss/2-Tools/mixins/css-properties/padding';
@use '../../../scss/2-Tools/mixins/css-properties/margin';
@use '../../../scss/2-Tools/mixins/css-properties/font-size';
@use '../../../scss/2-Tools/mixins/css-properties/width-and-height';

// prettier-ignore
.landing-page{
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('/assets/images/landing-page/bg.svg') no-repeat fixed center;
    background-size: cover;
    @include padding.vertical((
        xsm: 10
    ));

    .forms{
        width: 95%;
        max-width: 450px;
        background-color: white;
        border-radius: 15px;
        overflow: hidden;
        position: relative;
        box-shadow: inset 0 -6px lighten(map.get(main.$primary, 200), 0);
        @include padding.all-sides((
            xsm: [25, 12, 20, 12]
        ));
    }
    .header{
        &__logo{
            display: flex;
            @include width-and-height.set((
                xsm: (width: 25px)
            ));
            img{
                width: 100%;
            }
        }
        &__tagline{
            font-weight: 500;
            color: map.get(main.$primary, 900);
            @include font-size.responsive((
                xsm: map.get(major-second.$scale, 2)
            ));
            @include margin.top((
                xsm: 7
            ));
        }
    }
}
</style>

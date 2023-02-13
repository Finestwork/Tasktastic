<template>
    <div class="landing-page">
        <LoginForm />
    </div>
</template>

<script>
import LoginForm from './Partials/LoginForm/LoginForm';

export default {
    components: {
        LoginForm,
    },
};
</script>

<style lang="scss">
@use '../../../scss/2-Tools/mixins/css-properties/padding';

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
}
</style>

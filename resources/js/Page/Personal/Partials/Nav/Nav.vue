<template>
    <nav class="nav">
        <Left />
        <Right />
    </nav>
</template>

<script>
import Left from './Partials/Left';
import Right from './Partials/Right';

export default {
    components: {
        Left,
        Right,
    },
};
</script>

<style lang="scss">
@use 'sass:map';
@use '../../../../../scss/1-Settings/css-properties/colors/safety';
@use '../../../../../scss/2-Tools/mixins/css-properties/padding';

// prettier-ignore
.main-content .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    background-color: map.get(safety.$danger, 50);
    @include padding.all-sides((
        xsm: 10
    ));
}
</style>

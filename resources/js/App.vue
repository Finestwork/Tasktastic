<template>
    <router-view/>
</template>

<style lang="scss">
@use '../scss/3-Generics/reset-space';
@use '../scss/3-Generics/normalize';
@use '../scss/3-Generics/reset-form-fields';

html{
    font-size: 62.5%; // 10px
    box-sizing: border-box;
}
body{
    position: relative;
    overflow-x: hidden;
    font-size: 1.6rem; // 16px
    line-height: 1.5;
    font-family: Poppins, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
</style>

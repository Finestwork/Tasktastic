<template>
    <div class="left">
        <button type="button" class="left__hamburger-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                    d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"
                />
            </svg>
        </button>

        <div class="left__logo">
            <span class="logo__img">
                <img
                    src="/assets/images/logos/logo.svg"
                    alt="Tasktastic logo"
                />
            </span>
            <span class="logo__text">Tasktastic</span>
        </div>
    </div>
</template>

<style lang="scss">
@use 'sass:map';
@use '../../../../../../scss/1-Settings/css-properties/font-size/major-second';
@use '../../../../../../scss/1-Settings/css-properties/colors/text';
@use '../../../../../../scss/1-Settings/css-properties/colors/main';
@use '../../../../../../scss/2-Tools/mixins/css-properties/padding';
@use '../../../../../../scss/2-Tools/mixins/css-properties/font-size';
@use '../../../../../../scss/2-Tools/mixins/css-properties/margin';

// prettier-ignore
.main-content .nav {

    .left {
        display: flex;
        align-items: center;

        &__hamburger-btn {
            cursor: pointer;
            background-color: transparent;
            border-radius: 50%;
            border: none;
            width: 35px;
            height: 35px;
            @include padding.all-sides((
                xsm: 7
            ));
            @include margin.right((
                xsm: 15
            ));

            svg {
                display: block;
                width: 100%;
                height: 100%;
                fill: map.get(text.$main, 900)
            }
        }
        &__logo{
            display: flex;
            align-items: center;
            .logo{
                &__img {
                    display: flex;
                    align-items: center;
                    width: 25px;
                    @include margin.right((
                        xsm: 5
                    ));

                    img {
                        width: 100%;
                    }
                }
                &__text{
                    font-weight: 700;
                    color: map.get(main.$primary, 900);
                    @include font-size.responsive((
                        xsm: map.get(major-second.$scale, 4)
                    ));
                }
            }
        }
    }
}
</style>

<template>
    <div class="landing-page">
        <form class="form">
            <FormHeader />
            <FormFields />
        </form>
    </div>
</template>

<script>
import FormHeader from './Partials/FormHeader';
import FormFields from './Partials/FormFields';

export default {
    components: {
        FormHeader,
        FormFields,
    },
};
</script>

<style lang="scss">
@use 'sass:map';
@use '../../../scss/1-Settings/css-properties/font-size/major-second';
@use '../../../scss/1-Settings/css-properties/colors/main';
@use '../../../scss/2-Tools/mixins/css-properties/width-and-height';
@use '../../../scss/2-Tools/mixins/css-properties/font-size';
@use '../../../scss/2-Tools/mixins/css-properties/padding';
@use '../../../scss/2-Tools/mixins/css-properties/margin';

// prettier-ignore
.landing-page{
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('/assets/images/landing-page/bg.svg') no-repeat center;
    background-size: cover;

    .form{
        width: 95%;
        max-width: 1000px;
        background-color: white;
        border-radius: 15px;
        box-shadow: inset 0 -6px lighten(map.get(main.$primary, 200), 0);
        @include padding.all-sides((
            xsm: [10, 10, 25, 10]
        ));

        &__header{
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
        &__fields{
            @include margin.top((
                xsm: 15
            ));

            .text-input--faded--primary{
                @include margin.top((
                    xsm: 15
                ));
                &:last-of-type{
                    margin-bottom: 0;
                }
            }
        }
    }
}
</style>

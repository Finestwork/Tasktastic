<template>
    <div class="right">
        <VDropdown class="right__dropdown" :popper-class="'nav-dropdown'">
            <button type="button" class="dropdown__btn" v-close-popper>
                <span class="btn__text">{{ getUserFirstName }}</span>
                <span class="btn__icon"
                    ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                    >
                        <path
                            d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"
                        /></svg
                ></span>
            </button>

            <template #popper>
                <form action="/logout" method="POST">
                    <input type="hidden" name="_token" :value="csrfToken" />
                    <button type="submit" v-close-popper>Logout</button>
                </form>
            </template>
        </VDropdown>
    </div>
</template>

<script>
import Auth from '../../../../../Helpers/APIs/Auth';

export default {
    data() {
        return {
            csrfToken: '',
        };
    },
    mounted() {
        this.csrfToken = Auth.csrfToken;
    },
    computed: {
        getUserFirstName() {
            return this.$store.getters.getUserFullName;
        },
    },
};
</script>

<style lang="scss">
@use 'sass:map';
@use '../../../../../../scss/1-Settings/css-properties/colors/main';
@use '../../../../../../scss/1-Settings/css-properties/font-size/major-second';
@use '../../../../../../scss/2-Tools/mixins/css-properties/padding';
@use '../../../../../../scss/2-Tools/mixins/css-properties/font-size';
@use '../../../../../../scss/2-Tools/mixins/css-properties/width-and-height';
@use '../../../../../../scss/2-Tools/mixins/css-properties/margin';
@import '~floating-vue/dist/style.css';

// prettier-ignore
.main-content .nav .right {
    &__dropdown {
        .dropdown__btn {
            display: flex;
            font-family: inherit;
            cursor: pointer;
            border: none;
            border-radius: 6px;
            background-color: transparent;
            @include padding.all-sides((
                xsm: 7
            ));


            &:focus {
                outline: none;
            }

            &:hover {
                background-color: map.get(main.$primary, 200);
            }

            .btn{
                &__text{
                    font-weight: 500;
                    color: map.get(main.$primary, 900);
                    @include font-size.responsive((
                        xsm: map.get(major-second.$scale, 3)
                    ));
                    @include margin.right((
                        xsm: 7
                    ));
                }
                &__icon{
                    @include width-and-height.set((
                        xsm: (width: 12px)
                    ));
                    svg{
                        display: block;
                        width: 100%;
                        height: 100%;
                        fill: map.get(main.$primary, 900)
                    }
                }
            }
        }
    }
}

.nav-dropdown {
}
</style>

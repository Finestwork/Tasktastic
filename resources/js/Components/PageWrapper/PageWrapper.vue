<template>
    <div class="page-wrapper">
        <!-- Navbar -->
        <nav ref="nav" class="floated-navbar">
            <div class="logo">
                <span class="logo__img">
                    <img
                        src="/assets/images/logos/logo.svg"
                        alt="Tasktastic logo"
                    />
                </span>
                <span class="logo__text">Tasktastic</span>
            </div>
            <div class="right">
                <VDropdown
                    class="right__dropdown"
                    :popper-class="'nav-dropdown'"
                >
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
                            <input
                                type="hidden"
                                name="_token"
                                :value="csrfToken"
                            />
                            <button
                                class="dropdown__btn"
                                type="submit"
                                v-close-popper
                            >
                                <span class="btn__icon">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                    >
                                        <path
                                            d="M182.6 361.4L109.3 288H288c17.69 0 32-14.31 32-32s-14.31-32-32-32H109.3l73.38-73.38C188.9 144.4 192 136.2 192 128S188.9 111.6 182.6 105.4c-12.5-12.5-32.75-12.5-45.25 0l-128 128c-12.5 12.5-12.5 32.75 0 45.25l128 128c12.5 12.5 32.75 12.5 45.25 0S195.1 373.9 182.6 361.4zM384 96v320c0 17.69 14.31 32 32 32s32-14.31 32-32V96c0-17.69-14.31-32-32-32S384 78.31 384 96z"
                                        />
                                    </svg>
                                </span>
                                <span class="btn__text">Logout</span>
                            </button>
                        </form>
                    </template>
                </VDropdown>
            </div>
        </nav>

        <main class="main-content" ref="mainContent">
            <slot></slot>
        </main>
    </div>
</template>

<script>
// Helpers
import BootstrapMediaQuery from '../../Helpers/MediaQueries/BootstrapMediaQuery';
import Auth from '../../Helpers/APIs/Auth';

// NPM
import anime from 'animejs';

export default {
    data() {
        return {
            csrfToken: '',
        };
    },
    mounted() {
        this.csrfToken = Auth.csrfToken;
        this.adjustWrapper();
    },
    methods: {
        adjustWrapper() {
            const MAIN_CONTENT = this.$refs.mainContent;
            const adjustFromNav = () => {
                const NAV = this.$refs.nav;
                const HEIGHT = NAV.getBoundingClientRect().height;
                const CONTENT_HEIGHT =
                    ((window.innerHeight - HEIGHT) / window.innerHeight) * 100;
                Object.assign(MAIN_CONTENT.style, {
                    height: `${CONTENT_HEIGHT}%`,
                    marginTop: `${HEIGHT}px`,
                });
            };

            adjustFromNav();
            window.addEventListener('resize', adjustFromNav);
        },
        toggleSidebar() {
            if (window.innerWidth >= BootstrapMediaQuery.mediaQuery.xl) return;

            this.canShowSidebar = !this.canShowSidebar;
            const SIDEBAR = this.$refs.sidebar;

            if (this.canShowSidebar) {
                Object.assign(SIDEBAR.style, {
                    width: '0',
                });

                anime({
                    targets: SIDEBAR,
                    width: `${185}px`,
                    duration: 350,
                    easing: 'easeOutCirc',
                });
            } else {
                anime({
                    targets: SIDEBAR,
                    width: '0',
                    duration: 350,
                    easing: 'easeOutCirc',
                    complete: () => {
                        Object.assign(SIDEBAR.style, {
                            width: '0',
                        });
                    },
                });
            }
        },
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
@use '../../../scss/1-Settings/css-properties/colors/main';
@use '../../../scss/1-Settings/css-properties/colors/text';
@use '../../../scss/1-Settings/css-properties/font-size/major-second';
@use '../../../scss/2-Tools/mixins/css-properties/padding';
@use '../../../scss/2-Tools/mixins/css-properties/margin';
@use '../../../scss/2-Tools/mixins/css-properties/font-size';
@use '../../../scss/2-Tools/mixins/css-properties/display';
@use '../../../scss/2-Tools/mixins/css-properties/width-and-height';
@use '../../../scss/2-Tools/mixins/css-properties/all-properties';
@import '~floating-vue/dist/style.css';

// prettier-ignore
.page-wrapper {
    position: relative;
    width: 100%;
    height: 100vh;
    @include padding.top((
        xsm: .1
    ));
    background-color: lighten(map.get(main.$primary, 50), 1.5%);

    .floated-navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 99;
        background-color: lighten(map.get(main.$primary, 50), 1.5%);
        @include padding.all-sides((
            xsm: [10],
            xl: [10, 10, 35, 10]
        ));

        .logo{
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
        .right{
            @include display.set((
                xsm: none,
                xl: flex
            ));
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

        &.navbar--active{
            .left__hamburger-btn{
                background-color: map.get(main.$primary, 500);
                svg{
                    fill: white;
                }
            }
        }
    }
}

// prettier-ignore
.nav-dropdown{
    .v-popper__inner{
        @include padding.all-sides((
            xsm: 5
        ));
    }
    .dropdown__btn{
        display: flex;
        border: none;
        font-family: inherit;
        background-color: white;
        cursor: pointer;
        @include padding.all-sides((
            xsm: 10
        ));
        &:focus{
            outline: none;
        }
        &:hover{
            background-color: map.get(main.$primary, 50);
        }

        .btn__icon{
            @include width-and-height.set((
                xsm: (width: 13px)
            ));
            @include margin.right((
                xsm: 7
            ));

            svg{
                display: block;
                width: 100%;
                height: 100%;
                fill: map.get(main.$primary, 900);
            }
        }
        .btn__text{
            font-weight: 600;
            color: map.get(main.$primary, 900);
            @include font-size.responsive((
                xsm: map.get(major-second.$scale, 3)
            ));
        }
    }
}
</style>

<template>
    <div class="page-wrapper">
        <!-- Navbar -->
        <nav
            ref="nav"
            class="floated-navbar"
            :class="{ 'navbar--active': canShowSidebar }"
        >
            <div class="left">
                <button
                    type="button"
                    class="left__hamburger-btn"
                    @click="toggleSidebar"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
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

        <!-- Sidebar -->
        <aside ref="sidebar" class="floated-sidebar">
            <router-link :to="{ name: 'Personal' }" class="sidebar__link">
                <span class="link__icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                    >
                        <path
                            d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"
                        />
                    </svg>
                </span>
                <span class="link__text">Personal</span>
            </router-link>
            <a href="#" class="sidebar__link">
                <span class="link__icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                    >
                        <path
                            d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3c-95.73 0-173.3 77.6-173.3 173.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM479.1 320h-73.85C451.2 357.7 480 414.1 480 477.3C480 490.1 476.2 501.9 470 512h138C625.7 512 640 497.6 640 479.1C640 391.6 568.4 320 479.1 320zM432 256C493.9 256 544 205.9 544 144S493.9 32 432 32c-25.11 0-48.04 8.555-66.72 22.51C376.8 76.63 384 101.4 384 128c0 35.52-11.93 68.14-31.59 94.71C372.7 243.2 400.8 256 432 256z"
                        />
                    </svg>
                </span>
                <span class="link__text">Collaboration</span>
            </a>
            <a href="#" class="sidebar__link">
                <span class="link__icon"
                    ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path
                            d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c39.77 0 72 32.24 72 72S295.8 272 256 272c-39.76 0-72-32.24-72-72S216.2 128 256 128zM256 448c-52.93 0-100.9-21.53-135.7-56.29C136.5 349.9 176.5 320 224 320h64c47.54 0 87.54 29.88 103.7 71.71C356.9 426.5 308.9 448 256 448z"
                        /></svg
                ></span>
                <span class="link__text">Profile</span>
            </a>
        </aside>

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
            canShowSidebar: false,
        };
    },
    mounted() {
        this.csrfToken = Auth.csrfToken;
        this.adjustSidebar();
        this.adjustWrapper();
    },
    methods: {
        adjustSidebar() {
            const adjustSidebarFn = () => {
                const NAVBAR = this.$refs.nav;
                const NAVBAR_RIGHT_PART = NAVBAR.querySelector('.right');
                const SIDEBAR = this.$refs.sidebar;
                const NAV_HEIGHT = NAVBAR.getBoundingClientRect().height;
                const IS_DISPLAYED =
                    window.innerWidth >= BootstrapMediaQuery.mediaQuery.xl;

                if (IS_DISPLAYED) {
                    Object.assign(SIDEBAR.style, {
                        top: `${NAV_HEIGHT}px`,
                        width: 'auto',
                        left: 0,
                    });
                } else {
                    this.canShowSidebar = false;
                    Object.assign(SIDEBAR.style, {
                        top: `${NAV_HEIGHT}px`,
                        width: '0',
                        left: '0',
                    });
                }
            };

            adjustSidebarFn();
            window.addEventListener('resize', adjustSidebarFn);
        },
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
            const adjustFromSidebar = () => {
                const SIDEBAR = this.$refs.sidebar;
                const SIDEBAR_WIDTH = SIDEBAR.getBoundingClientRect().width;
                const CONTENT_WIDTH =
                    ((window.innerWidth - SIDEBAR_WIDTH) / window.innerWidth) *
                    100;
                const IS_DISPLAYED =
                    window.innerWidth >= BootstrapMediaQuery.mediaQuery.xl;

                if (IS_DISPLAYED) {
                    Object.assign(MAIN_CONTENT.style, {
                        marginLeft: `${SIDEBAR_WIDTH}px`,
                        width: `${CONTENT_WIDTH}%`,
                    });
                } else {
                    Object.assign(MAIN_CONTENT.style, {
                        marginLeft: `0`,
                        width: `100%`,
                    });
                }
            };

            adjustFromNav();
            adjustFromSidebar();

            window.addEventListener('resize', () => {
                adjustFromSidebar();
                adjustFromNav();
            });
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
        background-color: lighten(map.get(main.$primary, 50), 1.5%);
        @include padding.all-sides((
            xsm: [10],
            xl: [10, 10, 35, 10]
        ));

        .left {
            @include all-properties.init((
                xsm: (
                    display: flex,
                    justify-content: space-between,
                    align-items: center,
                    width: 100%,
                ),
                xl: (
                    width: auto
                )
            ));

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

    .floated-sidebar {
        display: flex;
        overflow: hidden;
        flex-direction: column;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        background-color: lighten(map.get(main.$primary, 50), 1.5%);
        @include all-properties.init((
            xsm: (
                box-shadow: 3px 0 #d8d4d4
            ),
            xl: (
                box-shadow: none
            )
        ));

        .sidebar__link{
            display: flex;
            align-items: center;
            text-decoration: none;
            border-radius: 7px;
            @include padding.all-sides((
                xsm: [10]
            ));
            @include margin.horizontal((
                xsm: 10
            ));
            @include margin.bottom((
                xsm: 4
            ));
            &:hover{
                background-color: map.get(main.$primary, 500);
                .link__icon svg{
                    fill: white;
                }
                .link__text{
                    color: white;
                }
            }
            &:focus{
                outline: none;
            }

            &.router-link-active{
                background-color: map.get(main.$primary, 500);
                &:hover{
                    background-color: darken(map.get(main.$primary, 500), 3%);
                }
                .link__icon svg{
                    fill: white;
                }
                .link__text{
                    color: white;
                }
            }

            .link{
                &__icon{
                    display: flex;
                    width: 15px;
                    height: 15px;
                    flex-shrink: 0;
                    @include margin.right((
                        xsm: 8
                    ));
                    svg{
                        display: block;
                        width: 100%;
                        height: 100%;
                        fill: map.get(main.$primary, 900);
                    }
                }
                &__text{
                    font-weight: 600;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: map.get(main.$primary, 900);
                    @include font-size.responsive((
                        xsm: map.get(major-second.$scale, 3)
                    ));
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

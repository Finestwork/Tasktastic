<template>
    <div class="page-wrapper">
        <!-- Navbar -->
        <nav ref="nav" class="floated-navbar">
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
                            <button type="submit" v-close-popper>Logout</button>
                        </form>
                    </template>
                </VDropdown>
            </div>
        </nav>

        <!-- Sidebar -->
        <aside ref="sidebar" class="floated-sidebar">
            <a href="#">Personal</a>
            <a href="#">Collaboration</a>
            <a href="#">Profile</a>
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
                const SIDEBAR_WIDTH =
                    NAVBAR_RIGHT_PART.getBoundingClientRect().width;
                const SIDEBAR = this.$refs.sidebar;
                const NAV_HEIGHT = NAVBAR.getBoundingClientRect().height;
                const IS_DISPLAYED =
                    window.innerWidth >= BootstrapMediaQuery.mediaQuery.xl;

                if (IS_DISPLAYED) {
                    Object.assign(SIDEBAR.style, {
                        top: `${NAV_HEIGHT}px`,
                        width: `${SIDEBAR_WIDTH}px`,
                        left: 0,
                    });
                } else {
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
                    width: '130px',
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

// prettier-ignore
.page-wrapper {
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: map.get(main.$primary, 50);

    .floated-navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        background-color: map.get(main.$primary, 50);
        @include padding.all-sides((
            xsm: 10,
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
    }

    .floated-sidebar {
        display: flex;
        overflow: hidden;
        flex-direction: column;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        background-color: map.get(main.$primary, 50);
        @include all-properties.init((
            xsm: (
                box-shadow: 3px 0 #d8d4d4
            ),
            xl: (
                box-shadow: none
            )
        ));
    }
}
</style>

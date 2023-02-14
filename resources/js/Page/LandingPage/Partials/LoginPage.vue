<template>
    <form class="form login-form">
        <div class="form__fields">
            <TextInput :options="emailOptions" />
            <TextInput :options="passwordOptions">
                <template #addons>
                    <button type="button" class="form__forgot-pw-btn">
                        Forgot Password?
                    </button>
                </template>
            </TextInput>
            <FlatButton
                :options="submitBtnOptions"
                :isLoading="isLoginBtnLoading"
                @click="login"
            />
        </div>
        <p class="form__no-account">
            Not registered yet? Create an account
            <router-link :to="{ name: 'SignupPage' }">here</router-link>
        </p>
    </form>
</template>

<script>
import TextInput from '../../../Components/Forms/TextInput';
import FlatButton from '../../../Components/Forms/Button';

export default {
    components: {
        TextInput,
        FlatButton,
    },
    data() {
        return {
            emailOptions: {
                colorScheme: 'primary',
                variant: 'faded',
                leadingIcon:
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z"/></svg>',
                labelSettings: {
                    text: 'Email:',
                },
                inputSettings: {
                    type: 'text',
                    placeholder: 'Place your email here',
                    id: 'loginEmailTxtInput',
                    autocomplete: false,
                },
            },
            passwordOptions: {
                colorScheme: 'primary',
                variant: 'faded',
                leadingIcon:
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"/></svg>',
                labelSettings: {
                    text: 'Password:',
                },
                inputSettings: {
                    type: 'password',
                    placeholder: 'Place your password here',
                    id: 'loginPasswordTxtInput',
                },
            },
            submitBtnOptions: {
                colorScheme: 'primary',
                variant: 'flat',
                btnSettings: {
                    text: 'Login',
                },
            },
            isLoginBtnLoading: false,
        };
    },
    methods: {
        login() {
            this.isLoginBtnLoading = true;
            setTimeout(() => {
                this.isLoginBtnLoading = false;
            }, 1000);
        },
    },
};
</script>

<style lang="scss">
@use 'sass:map';
@use '../../../../scss/1-Settings/css-properties/font-size/major-second';
@use '../../../../scss/1-Settings/css-properties/colors/main';
@use '../../../../scss/1-Settings/css-properties/colors/text';
@use '../../../../scss/2-Tools/mixins/css-properties/width-and-height';
@use '../../../../scss/2-Tools/mixins/css-properties/font-size';
@use '../../../../scss/2-Tools/mixins/css-properties/padding';
@use '../../../../scss/2-Tools/mixins/css-properties/margin';

// prettier-ignore
.login-form.form{
    @include margin.top((
        xsm: 25
    ));
    .form{
        &__fields{
            .text-input--faded--primary{
                @include margin.top((
                    xsm: 15
                ));
                &:last-of-type{
                    margin-bottom: 0;
                }
            }

            .btn--flat--primary{
                display: flex;
                justify-content: center;
                width: 100%;
                max-width: 150px;
                margin-left: auto;
                margin-right: auto;
                transition: all .15s ease-in-out;
                background-color: map.get(main.$primary, 900);
                box-shadow: 0 6px rgba(map.get(main.$primary, 900), 0.4);
                @include padding.vertical((
                    xsm: 15
                ));
                @include margin.top((
                    xsm: 60,
                    md: 35
                ));
                &:hover{
                    background-color: lighten(map.get(main.$primary, 900), 5%);
                }

                &.btn--loading{
                    background-color: rgba(map.get(main.$primary, 900), 0.3);
                }

                &:focus,
                &.btn--loading{
                    transform: translateY(4px);
                    box-shadow: 0 2px rgba(map.get(main.$primary, 900), 0.4);
                }
            }
        }
        &__forgot-pw-btn{
            font-weight: 600;
            background-color: white;
            font-family: inherit;
            border: none;
            cursor: pointer;
            color: map.get(main.$primary, 900);
            @include font-size.responsive((
                xsm: map.get(major-second.$scale, 2) - 1
            ));
            &:focus{
                outline: none;
            }

            &:focus,
            &:hover{
                text-decoration: underline;
                color: lighten(map.get(main.$primary, 900), 15%);
            }
        }
        &__no-account{
            font-weight: 500;
            color: map.get(text.$main, 900);
            @include margin.top((
                xsm: 30
            ));
            @include font-size.responsive((
                xsm: map.get(major-second.$scale, 2)
            ));

            a{
                color: map.get(main.$primary, 500);
                &:focus{
                    outline: none;
                    text-decoration: underline;
                }
                &:hover{
                    color: darken(map.get(main.$primary, 500), 15%);
                }
            }
        }
    }
}
</style>

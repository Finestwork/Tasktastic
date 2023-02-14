<template>
    <div class="signup-form">
        <FlatButton
            class="form__login-btn"
            :options="goBackBtnOptions"
            @click="goToLoginPage"
        />
        <span class="form__greet">Sign up to continue</span>
        <TextInput :options="firstNameOptions" />
        <TextInput :options="lastNameOptions" />
        <TextInput :options="emailOptions" />
        <TextInput ref="password" :options="passwordOptions" />
        <TextInput ref="confirmPassword" :options="confirmPasswordOptions" />
        <FlatButton class="form__register-btn" :options="submitBtnOptions" />
    </div>
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
            goBackBtnOptions: {
                colorScheme: 'primary',
                variant: 'ghost',
                leadingIcon:
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z"/></svg>',
                btnSettings: {
                    text: 'Login',
                },
            },
            firstNameOptions: {
                colorScheme: 'primary',
                variant: 'faded',
                labelSettings: {
                    text: 'First Name:',
                },
                inputSettings: {
                    type: 'text',
                    placeholder: 'Place your first name here',
                    id: 'signupFirstNameTxtInput',
                },
                validations: {
                    required: true,
                },
            },
            lastNameOptions: {
                colorScheme: 'primary',
                variant: 'faded',
                labelSettings: {
                    text: 'Last Name:',
                },
                inputSettings: {
                    type: 'text',
                    placeholder: 'Place your last name here',
                    id: 'signupLastNameTxtInput',
                },
                validations: {
                    required: true,
                },
            },
            emailOptions: {
                colorScheme: 'primary',
                variant: 'faded',
                labelSettings: {
                    text: 'Email:',
                },
                inputSettings: {
                    type: 'text',
                    placeholder: 'Place your email here',
                    id: 'signupEmailTxtInput',
                    autocomplete: false,
                },
                validations: {
                    required: true,
                    email: true,
                },
            },
            passwordOptions: {
                colorScheme: 'primary',
                variant: 'faded',
                labelSettings: {
                    text: 'Password:',
                },
                inputSettings: {
                    type: 'password',
                    placeholder: 'Place your password here',
                    id: 'signupPasswordTxtInput',
                },
                validations: {
                    required: true,
                    min: 8,
                    sameWith: {
                        element: '#signupConfirmPasswordTxtInput',
                        fieldName: 'confirm password',
                    },
                },
            },
            confirmPasswordOptions: {
                colorScheme: 'primary',
                variant: 'faded',
                labelSettings: {
                    text: 'Confirm Password:',
                },
                inputSettings: {
                    type: 'password',
                    placeholder: 'Confirm your password here',
                    id: 'signupConfirmPasswordTxtInput',
                },
                validations: {
                    required: true,
                    min: 8,
                    sameWith: {
                        element: '#signupPasswordTxtInput',
                        fieldName: 'password',
                    },
                },
            },
            submitBtnOptions: {
                colorScheme: 'primary',
                variant: 'flat',
                btnSettings: {
                    text: 'Register',
                },
            },
        };
    },
    methods: {
        goToLoginPage() {
            this.$router.push({ name: 'LoginPage' });
        },
    },
};
</script>

<style lang="scss">
@use 'sass:map';
@use '../../../../scss/1-Settings/css-properties/font-size/major-second';
@use '../../../../scss/1-Settings/css-properties/colors/text';
@use '../../../../scss/2-Tools/mixins/css-properties/font-size';
@use '../../../../scss/2-Tools/mixins/css-properties/margin';
@use '../../../../scss/2-Tools/mixins/css-properties/padding';

// prettier-ignore
.signup-form {
    @include margin.top((
        xsm: 20
    ));
    .form {
        &__login-btn {
            display: inline-flex;
        }
        &__greet{
            display: flex;
            font-weight: 600;
            justify-content: center;
            color: map.get(text.$main, 600);
            @include font-size.responsive((
                xsm: map.get(major-second.$scale, 2)
            ));
            @include margin.top((
                xsm: 20
            ));
            @include margin.bottom((
                xsm: 10
            ));
        }

        &__register-btn{
            display: flex;
            width: 100%;
            max-width: 150px;
            justify-content: center;
            margin-left: auto;
            margin-right: auto;
            @include margin.top((
                xsm: 35
            ));
            @include margin.bottom((
                xsm: 5
            ));
            @include padding.vertical((
                xsm: 15
            ));
        }
    }

    .text-input--faded--primary{
        @include margin.bottom((
            xsm: 15
        ));
    }
}
</style>

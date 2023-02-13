<template>
    <div class="form__fields">
        <TextInput :options="emailOptions" :defaultValue="''" />
        <TextInput :options="passwordOptions" :defaultValue="''" />
        <Button
            :options="submitBtnOptions"
            :isLoading="isLoginBtnLoading"
            @click="login"
        />
    </div>
</template>

<script>
import TextInput from '../../../Components/Forms/TextInput';
import Button from '../../../Components/Forms/Button';

export default {
    components: {
        TextInput,
        Button,
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
                    id: 'emailTxtInput',
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
                    id: 'passwordTxtInput',
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

<template>
    <div class="landing-page">
        <Forms
            @successfullyRegistered="successfullyRegistered"
            v-if="shouldDisplayForms"
        />
        <Error500 :options="error500Options" v-if="isError500" />
    </div>
</template>

<script>
import Forms from './Partials/Forms/Forms';
import Error500 from '../../Components/PageStates/Error';

// Helpers
import Auth from '../../Helpers/APIs/Auth';

export default {
    components: {
        Forms,
        Error500,
    },
    data() {
        return {
            error500Options: {
                title: 'Server Error',
                msg: "We're sorry, but something went wrong on our end and we're unable to fulfill your request at this time. Our team has been notified of the issue and is working to resolve it as quickly as possible. Please try again later or contact our support team if you continue to experience this issue. Thank you for your patience and understanding.",
                img: {
                    src: '/assets/images/error-states/server-error.svg',
                    alt: 'Illustration of Error Server Code 500 ',
                },
            },
            shouldDisplayForms: false,
            isError500: false,
        };
    },
    mounted() {
        // Functions to handle the result
        const handleResult = (res) => {
            const DATA = res.data;

            if (Object.keys(DATA).length !== 0) {
                this.$router.push({ name: 'Dashboard' });
            } else {
                this.shouldDisplayForms = true;
            }
        };
        const handleErr = () => {
            this.isError500 = true;
        };

        // Send the request to the server
        Auth.checkUser().then(handleResult).catch(handleErr);
    },
    methods: {
        successfullyRegistered() {
            this.shouldDisplayForms = false;
        },
    },
};
</script>

<style lang="scss">
@use '../../../scss/2-Tools/mixins/css-properties/padding';

// prettier-ignore
.landing-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('/assets/images/landing-page/bg.svg') no-repeat fixed center;
    background-size: cover;
    @include padding.vertical(
        (
            xsm: 10,
        )
    );

    .page-state--error {
        width: 95%;
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
        background-color: white;
        border-radius: 35px;
        box-shadow: 0 3px  0px 5px rgba(0,0,0,0.2);
        @include padding.all-sides((
            xsm: [25, 45]
        ))
    }
}
</style>

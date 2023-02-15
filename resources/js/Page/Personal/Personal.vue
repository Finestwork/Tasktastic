<template>
    <main class="main-content">
        <Nav />
    </main>
</template>

<script>
import Nav from './Partials/Nav/Nav';
import Auth from '../../Helpers/APIs/Auth';

export default {
    components: {
        Nav,
    },
    mounted() {
        this.fetchUser();
    },
    methods: {
        fetchUser() {
            if (this.$store.getters.hasUserInfo) return;

            // Functions to handle the result
            const handleResult = (res) => {
                const DATA = res.data;

                if (Object.keys(DATA).length !== 0) {
                    this.$store.commit('setUserInfo', DATA);
                } else {
                    this.$router.push({ name: 'LoginPage' });
                }
            };
            const handleErr = () => {
                this.$router.push({ name: 'LoginPage' });
            };

            // Send the request to the server
            Auth.checkUser().then(handleResult).catch(handleErr);
        },
    },
};
</script>

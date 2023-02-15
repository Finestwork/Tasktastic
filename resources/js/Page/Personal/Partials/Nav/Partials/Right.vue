<template>
    <div class="right">
        <VDropdown>
            <button type="button" v-close-popper>{{ getUserFirstName }}</button>

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
@import '~floating-vue/dist/style.css';
</style>

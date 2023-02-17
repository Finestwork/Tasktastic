<template>
    <PageWrapper class="personal-page">
        <div class="page-wrapper__main-content">
            <AddTaskButton />
            <Tasks />
            <Teleport to="body">
                <AddModal />
            </Teleport>
        </div>
    </PageWrapper>
</template>

<script>
import PageWrapper from '../../Components/PageWrapper/PageWrapper';
import AddTaskButton from './Partials/AddTaskButton';
import Tasks from './Partials/Tasks';
import AddModal from './Partials/AddModal/AddModal';

// Helpers
import Auth from '../../Helpers/APIs/Auth';

export default {
    components: {
        PageWrapper,
        AddTaskButton,
        Tasks,
        AddModal,
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

<style lang="scss">
@use '../../../scss/2-Tools/mixins/css-properties/padding';

// prettier-ignore
.page-wrapper__main-content {
    background-color: white;
    width: 100%;
    height: 100%;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    @include padding.all-sides((
        xsm: 25
    ));
}
</style>

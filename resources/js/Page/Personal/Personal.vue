<template>
    <PageWrapper class="personal-page">
        <div class="page-wrapper__main-content">
            <!-- Main Content -->
            <div v-if="shouldDisplayMainContent">
                <AddTaskButton @showAddTaskModal="showAddTaskModal" />
                <Tasks />
                <Teleport to="body">
                    <AddModal
                        :showModal="canShowAddTaskModal"
                        @cancelAddingTask="hideAddTaskModal"
                    />
                </Teleport>
            </div>

            <BouncingBox
                class="page-wrapper__task-loader"
                :options="loaderOptions"
                v-if="shouldDisplayLoader"
            />

            <TaskError
                class="page-wrapper__task-failed-display"
                :options="taskErrorOptions"
                v-if="shouldDisplayTaskError"
            />
        </div>
    </PageWrapper>
</template>

<script>
import PageWrapper from '../../Components/PageWrapper/PageWrapper';
import TaskError from '../../Components/PageStates/Error';
import BouncingBox from '../../Components/Loaders/BouncingBox';
import AddTaskButton from './Partials/AddTaskButton';
import Tasks from './Partials/Tasks';
import AddModal from './Partials/AddModal/AddModal';

// Helpers
import Auth from '../../Helpers/APIs/Auth';

export default {
    components: {
        PageWrapper,
        TaskError,
        BouncingBox,
        AddTaskButton,
        Tasks,
        AddModal,
    },
    data() {
        return {
            taskErrorOptions: {
                title: 'Unable to Retrieve Your Task from the Server',
                msg: "We apologize for the inconvenience, but we're currently unable to retrieve your task from the server. Our technical team is working on resolving the issue and we'll update you as soon as possible.",
                img: {
                    src: '/assets/images/error-states/server-error.svg',
                    alt: 'Server Error Illustration',
                },
            },
            loaderOptions: {
                title: 'Hang Tight! Your Task is on its Way!',
                msg: 'Please wait while we retrieve your task from the server',
            },
            canShowAddTaskModal: false,
            canDisplayTaskError: false,
            canDisplayLoader: true,
        };
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
                    // Functions to handle the request
                    const handleResult = () => {
                        this.canDisplayLoader = false;
                    };
                    const handleError = () => {
                        this.canDisplayLoader = false;
                        this.canDisplayTaskError = true;
                    };

                    // Send request to the server
                    this.$store
                        .dispatch('PersonalTaskModule/fetchAll')
                        .then(handleResult)
                        .catch(handleError);
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
        showAddTaskModal() {
            this.canShowAddTaskModal = true;
        },
        hideAddTaskModal() {
            this.canShowAddTaskModal = false;
        },
    },
    computed: {
        shouldDisplayMainContent() {
            return !this.canDisplayTaskError && !this.canDisplayLoader;
        },
        shouldDisplayTaskError() {
            return this.canDisplayTaskError && !this.canDisplayLoader;
        },
        shouldDisplayLoader() {
            return this.canDisplayLoader && !this.canDisplayTaskError;
        },
    },
};
</script>

<style lang="scss">
@use '../../../scss/2-Tools/mixins/css-properties/padding';

// prettier-ignore
.personal-page .page-wrapper{
    &__main-content{
        background-color: white;
        width: 100%;
        height: 100%;
        border-top-left-radius: 50px;
        border-top-right-radius: 50px;
        @include padding.all-sides((
            xsm: 25
        ));
    }

    &__task-failed-display{
        height: 100%;

        .error__msg{
            max-width: 550px;
        }
    }

    &__task-loader{
        height: 100%;
    }
}
</style>

<template>
    <PageWrapper class="personal-page" ref="pageWrapper">
        <div class="page-wrapper__main-content">
            <!-- Main Content -->
            <div v-if="shouldDisplayMainContent">
                <AddTaskButton @showAddTaskModal="showAddTaskModal" />
                <Tasks @viewCard="showViewTaskModal" />
                <Teleport to="body">
                    <AddModal
                        :showModal="canShowAddTaskModal"
                        @cancelAddingTask="hideAddTaskModal"
                    />
                </Teleport>
                <Teleport to="body">
                    <ViewModal
                        :showModal="canShowViewTaskModal"
                        :editTodoId="editTodoId"
                        :progressId="editProgressId"
                        @cancelAddingTask="hideViewTaskModal"
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
import ViewModal from './Partials/ViewModal/ViewModal';

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
        ViewModal,
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
            canShowViewTaskModal: false,
            editTodoId: 0,
            editProgressId: -1,
        };
    },
    mounted() {
        this.fetchUser();

        this.$nextTick(() => {
            document.body.style.overflowY = 'hidden';
        });
    },
    methods: {
        fetchUser() {
            if (this.$store.getters.hasUserInfo) {
                this.fetchAllTasks();
                return;
            }

            // Functions to handle the result
            const handleResult = (res) => {
                const DATA = res.data;

                if (Object.keys(DATA).length !== 0) {
                    this.$store.commit('setUserInfo', DATA);
                    this.fetchAllTasks();
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
        fetchAllTasks() {
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
        },
        showAddTaskModal() {
            this.canShowAddTaskModal = true;
            this.$refs.pageWrapper.$el.style.overflowY = 'hidden';
        },
        hideAddTaskModal() {
            this.canShowAddTaskModal = false;
            this.$refs.pageWrapper.$el.style.overflowY = null;
        },
        showViewTaskModal({ todoId, progressId }) {
            this.canShowViewTaskModal = true;
            this.editTodoId = parseInt(todoId);
            this.editProgressId = parseInt(progressId);
        },
        hideViewTaskModal() {
            this.canShowViewTaskModal = false;
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
        overflow-y: scroll;
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

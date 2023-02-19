<template>
    <Modal class="add-todo-modal" :showModal="showModal">
        <div v-if="shouldShowMainContent">
            <AlertList
                :items="errors"
                :options="{ colorScheme: 'danger', variant: 'outline' }"
                v-if="errors.length !== 0"
            />
            <AlertSingleLine
                :options="successAlertOptions"
                v-if="shouldShowSuccessAlert"
            />
            <AlertSingleLine
                :options="errorAlertOptions"
                v-if="shouldShowErrorAlert"
            />
            <Header
                :isSaveBtnLoading="isSaveBtnLoading"
                :clearForms="clearForms"
                :todoTitle="todoTitle"
                :todoDescription="todoDescription"
                @cancelAddingTask="cancelAddingTask"
                @saveTask="saveTask"
            />
            <Checklist
                ref="checklist"
                :clearForms="clearForms"
                :todoItems="todoItems"
                @addChecklist="addTodoItems"
                @removeChecklist="removeTodoItems"
            />
        </div>

        <BouncingBox
            :options="bouncingBoxOptions"
            v-if="shouldShowLoaderComponent"
        />
    </Modal>
</template>

<script>
import Modal from '../../../../Components/Modal/Modal';
import AlertList from '../../../../Components/Alerts/Inline/List';
import AlertSingleLine from '../../../../Components/Alerts/Inline/SingleLine';
import BouncingBox from '../../../../Components/Loaders/BouncingBox';
import Header from './Partials/Header';
import Checklist from './Partials/Checklist';

// Helpers
import Todo from '../../../../Helpers/APIs/Todo';

export default {
    components: {
        Checklist,
        Modal,
        Header,
        AlertList,
        AlertSingleLine,
        BouncingBox,
    },
    props: {
        showModal: {
            type: Boolean,
            required: true,
        },
        editTodoId: {
            type: Number,
            required: true,
        },
        progressId: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            successAlertOptions: {
                variant: 'flat',
                colorScheme: 'success',
                alertSettings: {
                    text: 'You have successfully created a todo list!',
                },
            },
            errorAlertOptions: {
                variant: 'flat',
                colorScheme: 'danger',
                alertSettings: {
                    text: 'We apologize, but it appears that there was an issue with your task. Please try again later as we work to resolve the problem. Thank you for your understanding and patience.',
                },
            },
            bouncingBoxOptions: {
                title: 'Retrieving Data from Server',
                msg: 'Please wait while we get the data from the server',
            },
            errors: [],
            isSaveBtnLoading: false,
            clearForms: false,
            shouldShowSuccessAlert: false,
            shouldShowErrorAlert: false,
            componentHasErrors: false,
            isComponentLoading: true,
            todoTitle: '',
            todoDescription: '',
            todoItems: [],
        };
    },
    emits: ['cancelAddingTask'],
    methods: {
        addTodoItems(value) {
            this.todoItems.push(value);
        },
        removeTodoItems(ind) {
            this.todoItems.splice(ind, 1);
        },
        cancelAddingTask() {
            this.errors = [];
            this.isSaveBtnLoading = false;
            this.clearForms = false;
            this.shouldShowSuccessAlert = false;
            this.shouldShowErrorAlert = false;
            this.componentHasErrors = false;
            this.isComponentLoading = true;
            this.todoTitle = '';
            this.todoDescription = '';
            this.todoItems = [];
            this.$emit('cancelAddingTask');
        },

        /*
         * TODO:
         *  Clear forms should be removed
         */
        saveTask(taskObj) {
            this.isSaveBtnLoading = true;
            this.clearForms = false;
            this.shouldShowSuccessAlert = false;
            this.shouldShowErrorAlert = false;
            this.errors = [];

            if (taskObj.title === '') {
                this.errors.push('• Please add a title');
            }

            if (taskObj.description === '') {
                this.errors.push('• Please add a description');
            }

            if (this.todoItems.length === 0) {
                this.errors.push('• Add at least 1 todo');
            }

            if (this.errors.length !== 0) {
                this.isSaveBtnLoading = false;
                return;
            }

            const DATA = Object.assign(taskObj, {
                todoId: this.editTodoId,
                title: taskObj.title,
                description: taskObj.description,
                checklist: this.$refs.checklist.todoItems,
            });

            // Functions to handle the request
            const handleResult = () => {
                location.reload();
            };
            const handleErr = () => {
                this.isSaveBtnLoading = false;
                this.shouldShowErrorAlert = true;
            };

            // Send the request to the server
            Todo.updatePersonalTask(DATA).then(handleResult).catch(handleErr);
        },
    },
    computed: {
        shouldShowMainContent() {
            return !this.isComponentLoading && !this.componentHasErrors;
        },
        shouldShowLoaderComponent() {
            return this.isComponentLoading && !this.componentHasErrors;
        },
    },
    watch: {
        /**
         * TODO:
         * Error
         * Empty State
         */
        showModal(showModal) {
            if (showModal) {
                const DATA = {
                    todoId: this.editTodoId,
                };
                // Functions to handle the request
                const handleResult = (res) => {
                    const DATA = res.data;

                    if (Object.keys(DATA).length !== 0) {
                        this.isComponentLoading = false;

                        this.todoTitle = DATA.title;
                        this.todoDescription = DATA.description;
                        this.todoItems = DATA.checklists.map(
                            (checklist) => checklist.name
                        );
                    } else {
                        this.isComponentLoading = false;
                        // Empty
                    }
                };
                const handleError = (err) => {
                    this.isComponentLoading = false;
                    console.log(err);
                };

                // Send the request to the server
                Todo.browsePersonalTask(DATA)
                    .then(handleResult)
                    .catch(handleError);
            }
        },
    },
};
</script>

<style lang="scss">
@use 'sass:map';
@use '../../../../../scss/1-Settings/css-properties/font-size/major-second';
@use '../../../../../scss/2-Tools/mixins/css-properties/padding';
@use '../../../../../scss/2-Tools/mixins/css-properties/margin';
@use '../../../../../scss/2-Tools/mixins/css-properties/font-size';

// prettier-ignore
.add-todo-modal {
    .modal {
        &__main-content {
            width: 95%;
            max-width: 500px;
            max-height: 95%;
            @include padding.all-sides((
                xsm: [15]
            ));

            .inline-alert--list--outline--danger {
                @include margin.bottom((
                    xsm: 25
                ));
            }

            .inline-alert--list--flat--success,
            .inline-alert--list--flat--danger {
                @include font-size.responsive((
                    xsm: map.get(major-second.$scale, 2)
                ));
                @include margin.bottom((
                    xsm: 15
                ));
            }
        }
    }

    .loader--bouncing-box {
        @include padding.all-sides((
            xsm: [15, 10]
        ));

        .loader {
            &__title {
                @include font-size.responsive((
                    xsm: map.get(major-second.$scale, 3)
                ));
                @include margin.top((
                    xsm: 35
                ));
            }

            &__msg {
                @include font-size.responsive((
                    xsm: map.get(major-second.$scale, 2)
                ));
            }
        }
    }
}
</style>

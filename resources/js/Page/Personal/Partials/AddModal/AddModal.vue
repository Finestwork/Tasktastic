<template>
    <Modal class="add-todo-modal" :show-modal="showModal">
        <AlertList
            :items="errors"
            :options="{ colorScheme: 'danger', variant: 'outline' }"
            v-if="errors.length !== 0"
        />
        <AlertSingleLine
            :options="successAlertOptions"
            v-if="shouldShowSuccessAlert"
        />
        <Header
            :isSaveBtnLoading="isSaveBtnLoading"
            :clearForms="clearForms"
            @cancelAddingTask="cancelAddingTask"
            @saveTask="saveTask"
        />
        <Checklist ref="checklist" :clearForms="clearForms" />
    </Modal>
</template>

<script>
import Modal from '../../../../Components/Modal/Modal';
import AlertList from '../../../../Components/Alerts/Inline/List';
import AlertSingleLine from '../../../../Components/Alerts/Inline/SingleLine';
import Header from './Partials/Header';
import Checklist from './Partials/Checklist';
import Todo from '../../../../Helpers/APIs/Todo';

export default {
    components: {
        Checklist,
        Modal,
        Header,
        AlertList,
        AlertSingleLine,
    },
    props: {
        showModal: {
            type: Boolean,
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
            errors: [],
            isSaveBtnLoading: false,
            clearForms: false,
            shouldShowSuccessAlert: false,
        };
    },
    emits: ['cancelAddingTask'],
    methods: {
        cancelAddingTask() {
            this.errors = [];
            this.isSaveBtnLoading = false;
            this.clearForms = false;
            this.shouldShowSuccessAlert = false;
            this.$emit('cancelAddingTask');
        },

        saveTask(taskObj) {
            this.isSaveBtnLoading = true;
            this.clearForms = false;
            this.shouldShowSuccessAlert = false;
            this.errors = [];

            if (taskObj.title === '') {
                this.errors.push('• Please add a title');
            }

            if (taskObj.description === '') {
                this.errors.push('• Please add a description');
            }

            if (this.$refs.checklist.todos.length === 0) {
                this.errors.push('• Add at least 1 todo');
            }

            if (this.errors.length !== 0) {
                this.isSaveBtnLoading = false;
                return;
            }

            const DATA = Object.assign(taskObj, {
                todos: this.$refs.checklist.todos,
            });

            // Functions to handle the request
            const handleResult = () => {
                this.isSaveBtnLoading = false;
                this.clearForms = true;
                this.shouldShowSuccessAlert = true;
            };
            const handleErr = (err) => {
                console.log(err);
                this.isSaveBtnLoading = false;
            };

            // Send the request to the server
            Todo.create(DATA).then(handleResult).catch(handleErr);
        },
    },
};
</script>

<style lang="scss">
@use '../../../../../scss/2-Tools/mixins/css-properties/padding';
@use '../../../../../scss/2-Tools/mixins/css-properties/margin';

// prettier-ignore
.add-todo-modal .modal{
    &__main-content{
        width: 95%;
        max-width: 500px;
        max-height: 95%;
        @include padding.all-sides((
            xsm: [15]
        ));

        .inline-alert--list--outline--danger{
            @include margin.bottom((
                xsm: 25
            ));
        }

        .inline-alert--list--flat--success{
            @include margin.bottom((
                xsm: 15
            ));
        }
    }
}
</style>
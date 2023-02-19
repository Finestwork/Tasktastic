<template>
    <div class="modal__header">
        <div class="header__top">
            <h3 class="header__title">To Do</h3>

            <div class="header__controls">
                <FlatButton
                    class="control__cancel"
                    :options="cancelBtnOptions"
                    @click="cancelAddingTask"
                />
                <FlatButton
                    class="control__save"
                    :options="saveBtnOptions"
                    :isLoading="isSaveBtnLoading"
                    @click="saveTask"
                />
            </div>
        </div>

        <div class="header__forms">
            <TextInput
                ref="titleInput"
                :options="titleTxtInputOptions"
                :defaultValue="taskTitle"
            />
            <TextArea
                ref="descriptionInput"
                :options="descriptionTxtInputOptions"
                :default-value="taskDescription"
            />
        </div>
    </div>
</template>

<script>
import TextInput from '../../../../../Components/Forms/TextInput';
import TextArea from '../../../../../Components/Forms/TextArea';
import FlatButton from '../../../../../Components/Forms/Button';
export default {
    components: {
        TextInput,
        TextArea,
        FlatButton,
    },
    props: {
        isSaveBtnLoading: {
            type: Boolean,
            required: true,
        },
        clearForms: {
            type: Boolean,
            required: true,
        },
        todoTitle: {
            type: String,
            required: true,
        },
        todoDescription: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            titleTxtInputOptions: {
                colorScheme: 'primary',
                variant: 'faded',
                labelSettings: {
                    text: 'Task Title:',
                },
                inputSettings: {
                    type: 'text',
                    id: 'addModalTitle',
                    placeholder: 'Place task title here',
                },
            },
            descriptionTxtInputOptions: {
                colorScheme: 'primary',
                variant: 'faded',
                labelSettings: {
                    text: 'Task Description:',
                },
                inputSettings: {
                    id: 'addModalDescription',
                    placeholder: 'Add description here',
                },
            },
            cancelBtnOptions: {
                colorScheme: 'primary',
                variant: 'ghost',
                btnSettings: {
                    text: 'Cancel',
                },
            },
            saveBtnOptions: {
                colorScheme: 'primary',
                variant: 'flat',
                btnSettings: {
                    text: 'Update',
                },
            },
            taskTitle: this.todoTitle,
            taskDescription: this.todoDescription,
        };
    },
    emits: ['cancelAddingTask', 'saveTask'],
    methods: {
        cancelAddingTask() {
            this.$emit('cancelAddingTask');
        },
        saveTask() {
            const TITLE = this.$refs.titleInput.textInputValue;
            const DESCRIPTION = this.$refs.descriptionInput.textInputValue;

            this.$emit('saveTask', {
                title: TITLE,
                description: DESCRIPTION,
            });
        },
    },
    watch: {
        clearForms(clearForms) {
            if (clearForms) {
                this.$refs.titleInput.textInputValue = '';
                this.$refs.descriptionInput.textInputValue = '';
            }
        },
    },
};
</script>

<style lang="scss">
@use 'sass:map';
@use '../../../../../../scss/1-Settings/css-properties/colors/text';
@use '../../../../../../scss/1-Settings/css-properties/colors/main';
@use '../../../../../../scss/1-Settings/css-properties/font-size/major-second';
@use '../../../../../../scss/2-Tools/mixins/css-properties/font-size';
@use '../../../../../../scss/2-Tools/mixins/css-properties/padding';
@use '../../../../../../scss/2-Tools/mixins/css-properties/margin';

// prettier-ignore
.add-todo-modal .modal {
    &__header {

        .header{
            &__top{
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            &__title{
                font-weight: 700;
                color: map.get(text.$main, 700);
                @include font-size.responsive((
                    xsm: map.get(major-second.$scale, 4)
                ));
            }
            &__controls{
                .control__cancel{
                    @include margin.right((
                        xsm: 7
                    ));
                }

                .control__cancel,
                .control__save{
                    @include font-size.responsive((
                        xsm: map.get(major-second.$scale, 2)
                    ));
                }
            }
            &__forms{
                @include margin.top((
                    xsm: 15
                ));
                .text-input--faded--primary{
                    @include margin.bottom((
                        xsm: 15
                    ));
                }
                .text-area--faded--primary{
                    textarea{
                        resize: none;
                        height: 100px;
                    }
                }

            }
        }
    }
}
</style>

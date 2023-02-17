<template>
    <div class="modal__header">
        <div class="header__top">
            <h3 class="header__title">Add To Do</h3>

            <div class="header__controls">
                <button type="button" class="control__cancel">Cancel</button>
                <button type="button" class="control__save">Save</button>
            </div>
        </div>

        <div class="header__forms">
            <TextInput :options="titleTxtInputOptions" />
            <TextArea :options="descriptionTxtInputOptions" />
        </div>
    </div>
</template>

<script>
import TextInput from '../../../../../Components/Forms/TextInput';
import TextArea from '../../../../../Components/Forms/TextArea';

export default {
    components: {
        TextInput,
        TextArea,
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
                validations: {
                    required: true,
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
                validations: {
                    required: true,
                },
            },
        };
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
                    color: map.get(main.$primary, 500);
                    background-color: transparent;
                    @include margin.right((
                        xsm: 7
                    ));
                    &:focus,
                    &:hover{
                        background-color: map.get(main.$primary, 100);
                    }
                }
                .control__save{
                    color: white;
                    background-color: map.get(main.$primary, 500);
                    &:focus,
                    &:hover{
                        background-color: darken(map.get(main.$primary, 500), 5%);
                    }
                }

                .control__cancel,
                .control__save{
                    font-weight: 600;
                    border-radius: 5px;
                    cursor: pointer;
                    border: none;
                    font-family: inherit;
                    @include font-size.responsive((
                        xsm: map.get(major-second.$scale, 2)
                    ));
                    @include padding.all-sides((
                        xsm: 10
                    ));
                    &:focus{
                        outline: none;
                    }
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

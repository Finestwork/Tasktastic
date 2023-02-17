<template>
    <div class="modal__checklist">
        <div class="checklist__header">
            <h4 class="header__title">Let's Get it Done</h4>
        </div>

        <div class="checklist__items" ref="todoItems">
            <div class="todos" v-auto-animate>
                <div
                    class="todo__wrapper"
                    v-for="(todo, ind) in todos"
                    :key="todo"
                    :data-todo-ind="ind"
                >
                    <input
                        type="text"
                        :placeholder="todo.text"
                        :value="todo.text"
                    />
                    <button type="button" @click="removeTodo">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path
                                d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <TextInput
                ref="addTodoTxtInput"
                :options="addItemsOptions"
                class="add-todo-text-input"
                @keydown="addTodo"
            />
        </div>
    </div>
</template>

<script>
import TextInput from '../../../../../Components/Forms/TextInput';

// NPM
import anime from 'animejs';

export default {
    components: {
        TextInput,
    },
    props: {
        clearForms: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            addItemsOptions: {
                colorScheme: 'primary',
                variant: 'faded',
                leadingIcon:
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/></svg>',
                inputSettings: {
                    type: 'text',
                    id: 'addModalTodo',
                    placeholder: 'Add todo here',
                },
            },
            areTodosHidden: false,
            todos: [],
        };
    },
    methods: {
        addTodo(e) {
            if (e.key !== 'Enter') return;

            const INPUT = e.target;
            const VALUE = INPUT.value.trim();
            this.todos.push({ text: VALUE });
            INPUT.value = '';
        },
        removeTodo(e) {
            const BTN = e.currentTarget;
            const IND = parseInt(BTN.parentElement.dataset.todoInd);

            this.todos.splice(IND, 1);
        },
    },
    watch: {
        clearForms(clearForms) {
            if (clearForms) {
                this.todos = [];
                const ADD_TODO_TXT_INPUT =
                    this.$refs.addTodoTxtInput.$refs.input;
                ADD_TODO_TXT_INPUT.value = '';
                ADD_TODO_TXT_INPUT.blur();
            }
        },
    },
};
</script>

<style lang="scss">
@use 'sass:map';
@use '../../../../../../scss/1-Settings/css-properties/font-size/major-second';
@use '../../../../../../scss/1-Settings/css-properties/colors/text';
@use '../../../../../../scss/1-Settings/css-properties/colors/safety';
@use '../../../../../../scss/1-Settings/css-properties/colors/main';
@use '../../../../../../scss/2-Tools/mixins/css-properties/font-size';
@use '../../../../../../scss/2-Tools/mixins/css-properties/width-and-height';
@use '../../../../../../scss/2-Tools/mixins/css-properties/margin';
@use '../../../../../../scss/2-Tools/mixins/css-properties/padding';

// prettier-ignore
.add-todo-modal .modal{
    &__checklist{
        @include margin.top((
            xsm: 25
        ));

        .checklist{
            &__header{
                display: flex;
                justify-content: space-between;

                .header{
                    &__title{
                        font-weight: 700;
                        color: map.get(text.$main, 700);
                        @include font-size.responsive((
                            xsm: map.get(major-second.$scale, 3)
                        ));
                    }
                }
            }
            &__items{
                overflow: hidden;
                .todos{
                    .todo__wrapper{
                        position: relative;
                        @include margin.bottom((
                            xsm: 10
                        ));
                        input[type="text"]{
                            width: 100%;
                            background-color: white;
                            border: none;
                            font-weight: 500;
                            border-bottom: 2px solid map.get(text.$main, 200);
                            color: map.get(text.$main, 500);
                            @include padding.all-sides((
                                xsm: [7, 35, 7, 7]
                            ));
                            @include font-size.responsive((
                                xsm: map.get(major-second.$scale, 2)
                            ));
                            &:focus{
                                outline: none;
                            }
                            &:hover,
                            &:focus{
                                border-color: map.get(main.$primary, 500);
                            }
                        }
                        button{
                            cursor: pointer;
                            width: 20px;
                            height: 20px;
                            position: absolute;
                            top: 50%;
                            right: 0;
                            border: none;
                            border-radius: 5px;
                            background-color: map.get(safety.$danger, 100);
                            transform: translateY(-50%);
                            @include padding.all-sides((
                                xsm: 4
                            ));;
                            &:focus{
                                outline: none;
                            }

                            &:focus,
                            &:hover{
                                background-color: darken(map.get(safety.$danger, 100), 5%);
                            }

                            svg{
                                display: block;
                                width: 100%;
                                height: 100%;
                                fill: map.get(safety.$danger, 500);
                            }
                        }
                    }
                }
                .add-todo-text-input{
                    @include margin.all-sides((
                        xsm: [12, 5, 5, 5]
                    ));
                }
            }
        }


    }
}
</style>

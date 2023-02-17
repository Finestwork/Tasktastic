<template>
    <div class="modal__checklist">
        <div class="checklist__header">
            <h4 class="header__title">Let's Get it Done</h4>
            <button type="button" class="header__btn" @click="hideTodos">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path
                        d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"
                    />
                </svg>
            </button>
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
        hideTodos() {
            const baseAnimationFn = (animObj) => {
                const ANIM_OBJ = Object.assign(
                    {
                        targets: this.$refs.todoItems,
                        transition: 150,
                        easing: 'easeOutExpo',
                    },
                    animObj
                );
                anime(ANIM_OBJ);
            };

            if (!this.areTodosHidden) {
                baseAnimationFn({
                    height: '0',
                });
            } else {
                const HEIGHT = this.$refs.todoItems.scrollHeight;
                baseAnimationFn({
                    height: `${HEIGHT}px`,
                    complete: () => {
                        this.$refs.todoItems.style = null;
                    },
                });
            }

            this.areTodosHidden = !this.areTodosHidden;
        },
        addTodo(e) {
            if (e.key !== 'Enter') return;

            const INPUT = e.target;
            const VALUE = INPUT.value;
            this.todos.push({ text: VALUE });
            INPUT.value = '';
            INPUT.blur();
        },
        removeTodo(e) {
            const BTN = e.currentTarget;
            const IND = parseInt(BTN.parentElement.dataset.todoInd);

            this.todos.splice(IND, 1);
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
                    &__btn{
                        cursor: pointer;
                        background-color: white;
                        border-radius: 5px;
                        border: none;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        @include width-and-height.set((
                            xsm: (width: 20px, height: 20px)
                        ));
                        &:focus{
                            outline: none;
                        }
                        &:focus,
                        &:hover{
                            background-color: map.get(text.$main, 200);
                        }
                        svg{
                            display: block;
                            width: 100%;
                            height: 100%;
                            fill: map.get(text.$main, 500);
                        }
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
                                xsm: map.get(major-second.$scale, 3)
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

<template>
    <div class="task-card">
        <VDropdown
            class="task__option-btn-wrapper"
            :popper-class="'task-card-dropdown'"
        >
            <button class="task__option-btn" type="button" v-close-popper>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                        d="M120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200C94.93 200 120 225.1 120 256zM280 256C280 286.9 254.9 312 224 312C193.1 312 168 286.9 168 256C168 225.1 193.1 200 224 200C254.9 200 280 225.1 280 256zM328 256C328 225.1 353.1 200 384 200C414.9 200 440 225.1 440 256C440 286.9 414.9 312 384 312C353.1 312 328 286.9 328 256z"
                    />
                </svg>
            </button>

            <template #popper>
                <button type="button" v-close-popper>Edit</button>
                <button type="button" v-close-popper>Delete</button>
            </template>
        </VDropdown>
        <h3 class="task__group-title">{{ task.title }}</h3>
        <p class="task__group-description">{{ task.description }}</p>
        <div class="task__tag-wrapper">
            <span class="task__tag">Web Development</span>
            <span class="task__tag">Web Development</span>
            <span class="task__tag">Web Development</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        /**
         * @taskObj: {title, description}
         */
        task: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss">
@use 'sass:map';
@use '../../../scss/1-Settings/css-properties/colors/text';
@use '../../../scss/1-Settings/css-properties/colors/main';
@use '../../../scss/1-Settings/css-properties/font-size/major-second';
@use '../../../scss/2-Tools/mixins/css-properties/font-size';
@use '../../../scss/2-Tools/mixins/css-properties/padding';
@use '../../../scss/2-Tools/mixins/css-properties/margin';
@use '../../../scss/2-Tools/mixins/css-properties/width-and-height';

// prettier-ignore
.task-card {
    border-radius: 15px;
    background-color: white;
    position: relative;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(map.get(text.$main, 600), 0.1);
    @include padding.all-sides((
        xsm: 10
    ));

    .task{
        &__option-btn-wrapper{
            display: flex;
            margin-left: auto;
            @include width-and-height.set((
                xsm: (width: 20px, height: 20px)
            ));
        }
        &__option-btn{
            display: flex;
            cursor: pointer;
            border: none;
            border-radius: 5px;
            background-color: white;
            @include padding.all-sides((
                xsm: 3
            ));
            &:focus,
            &:hover{
                background-color: map.get(text.$main, 100);
            }

            &:focus{
                outline: none;
            }
            svg{
                display: block;
                width: 100%;
                height: 100%;
                fill: map.get(text.$main, 600);
            }
        }
        &__group-title{
            font-weight: 700;
            color: map.get(text.$main, 900);
            @include font-size.responsive((
                xsm: map.get(major-second.$scale, 3)
            ));
        }
        &__group-description{
            font-weight: 500;
            color: map.get(text.$main, 500);
            @include font-size.responsive((
                xsm: map.get(major-second.$scale, 2)
            ));
        }
        &__tag-wrapper{
            display: flex;
            flex-wrap: wrap;
            @include margin.top((
                xsm: 30
            ));
        }
        &__tag{
            font-weight: 600;
            border-radius: 7px;
            background-color: map.get(main.$primary, 50);
            color: map.get(main.$primary, 400);
            @include font-size.responsive((
                xsm: map.get(major-second.$scale, 1)
            ));
            @include padding.all-sides((
                xsm: 7
            ));
            @include margin.right((
                xsm: 7
            ));
            @include margin.bottom((
                xsm: 7
            ));
        }
    }

    &.sortable-ghost{
        opacity: 0;
        > *{
            cursor: grabbing !important;
        }
    }

    &.sortable-fallback {
        opacity: 1 !important;
    }
}

// prettier-ignore
.task-card-dropdown{
    .v-popper__inner{
        > div{
            display: flex;
            flex-direction: column;
        }
    }
    button{
        background-color: white;
        border: none;
        font-family: inherit;
        cursor: pointer;
        font-weight: 600;
        color: map.get(text.$main, 500);
        @include font-size.responsive((
            xsm: map.get(major-second.$scale, 2)
        ));
        @include padding.all-sides((
            xsm: 7
        ));
        &:focus,
        &:hover{
            background-color: map.get(text.$main, 100);
        }

        &:focus{
            outline: none;
        }
    }
}
</style>

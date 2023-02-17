<template>
    <div class="row tasks">
        <section class="col-xsm-12 col-lg-4">
            <h2 class="task__row-title">Started</h2>
            <div ref="startedWrapper">
                <TaskCard v-for="task in test" :task="task" />
            </div>
        </section>
        <section class="col-xsm-12 col-lg-4">
            <h2 class="task__row-title">In Progress</h2>
            <div ref="inProgressWrapper">
                <TaskCard v-for="task in test" :task="task" />
            </div>
        </section>
        <section class="col-xsm-12 col-lg-4">
            <h2 class="task__row-title">Completed</h2>
        </section>
    </div>
</template>

<script>
import TaskCard from '../../../Components/TaskCard/TaskCard';

// NPM
import Sortable from 'sortablejs/modular/sortable.complete.esm.js';

export default {
    components: {
        TaskCard,
    },
    data() {
        return {
            sortable: null,
            sortableOptions: {
                forceFallback: true,
                animation: 250,
            },
            test: [
                {
                    id: 12,
                    title: 'Entitled 1',
                    description: 'This is a description',
                },
                {
                    id: 14,
                    title: 'Entitled 2',
                    description: 'This is a description',
                },
                {
                    id: 15,
                    title: 'Entitled 3',
                    description: 'This is a description',
                },
                {
                    id: 16,
                    title: 'Entitled 4',
                    description: 'This is a description',
                },
                {
                    id: 17,
                    title: 'Entitled 5',
                    description: 'This is a description',
                },
                {
                    id: 1,
                    title: 'Entitled 6',
                    description: 'This is a description',
                },
                {
                    id: 2,
                    title: 'Entitled 7',
                    description: 'This is a description',
                },
                {
                    id: 3,
                    title: 'Entitled 8',
                    description: 'This is a description',
                },
                {
                    id: 4,
                    title: 'Entitled 9',
                    description: 'This is a description',
                },
                {
                    id: 5,
                    title: 'Entitled 10',
                    description: 'This is a description',
                },
            ],
            drag: false,
        };
    },
    mounted() {
        this.initSort();
    },
    methods: {
        initSort() {
            Sortable.create(this.$refs.startedWrapper, {
                group: {
                    name: 'started',
                    put: ['in-progress'],
                },
                ...this.sortableOptions,
            });
            Sortable.create(this.$refs.inProgressWrapper, {
                group: {
                    name: 'in-progress',
                    put: ['started'],
                },
                ...this.sortableOptions,
            });
        },
    },
};
</script>

<style lang="scss">
@use 'sass:map';
@use '../../../../scss/1-Settings/css-properties/colors/main';
@use '../../../../scss/1-Settings/css-properties/colors/text';
@use '../../../../scss/1-Settings/css-properties/font-size/major-second';
@use '../../../../scss/2-Tools/mixins/css-properties/font-size';
@use '../../../../scss/2-Tools/mixins/css-properties/padding';
@use '../../../../scss/2-Tools/mixins/css-properties/margin';
@use '../../../../scss/4-Layout/columns';

// prettier-ignore
.personal-page .tasks {
    .task {
        &__row-title {
            font-weight: 700;
            border-bottom: 2px solid map.get(text.$main, 200);
            color: map.get(text.$main, 600);
            @include padding.bottom((
                xsm: 7
            ));
            @include margin.bottom((
                xsm: 25
            ));
            @include font-size.responsive((
                xsm: map.get(major-second.$scale, 3),
            ));
        }
    }

    .task-card {
        @include margin.bottom((
            xsm: 25
        ));

        &:last-of-type {
            margin-bottom: 0;
        }
    }
}
</style>

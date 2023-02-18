<template>
    <div class="row tasks">
        <section class="col-xsm-12 col-lg-4">
            <h2 class="task__row-title">Started</h2>
            <div ref="startedWrapper">
                <TaskCard v-for="task in getStartedTasks" :task="task" />
            </div>
        </section>
        <section class="col-xsm-12 col-lg-4">
            <h2 class="task__row-title">In Progress</h2>
            <div ref="inProgressWrapper">
                <!--                <TaskCard v-for="task in test" :task="task" />-->
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
            drag: false,
        };
    },
    mounted() {
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
    emits: ['failedToDisplayTasks', 'taskRetrieved'],
    methods: {},
    computed: {
        getStartedTasks() {
            return this.$store.state['PersonalTaskModule'].started;
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
    @include padding.bottom((
        xsm: 45
    ));
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

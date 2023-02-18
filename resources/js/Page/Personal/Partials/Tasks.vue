<template>
    <div class="row tasks">
        <section class="col-xsm-12 col-lg-4">
            <h2 class="task__row-title">Started</h2>
            <div class="task__items" ref="startedWrapper" data-progress-id="1">
                <TaskCard
                    v-for="task in getStartedTasks"
                    :task="task"
                    :data-todo-id="task.id"
                />
            </div>
        </section>
        <section class="col-xsm-12 col-lg-4">
            <h2 class="task__row-title">In Progress</h2>
            <div
                class="task__items"
                ref="inProgressWrapper"
                data-progress-id="2"
            >
                <TaskCard
                    v-for="task in getInProgressTasks"
                    :task="task"
                    :data-todo-id="task.id"
                />
            </div>
        </section>
        <section class="col-xsm-12 col-lg-4">
            <h2 class="task__row-title">Completed</h2>
            <div
                ref="completedWrapper"
                class="task__items"
                data-progress-id="3"
            >
                <TaskCard
                    v-for="task in getCompletedTasks"
                    :task="task"
                    :data-todo-id="task.id"
                />
            </div>
        </section>
        <span ref="placeholder" class="task__placeholder"></span>
    </div>

    <Teleport to="body">
        <LoadIndicators
            :progressWidth="loadingIndicatorWidth"
            @progressDone="resetProgressData"
        />
    </Teleport>
</template>

<script>
import TaskCard from '../../../Components/TaskCard/TaskCard';
import LoadIndicators from '../../../Components/Loaders/LoadIndicators';

// NPM
import Sortable from 'sortablejs/modular/sortable.complete.esm.js';
import { useToast } from 'vue-toastification';

export default {
    components: {
        TaskCard,
        LoadIndicators,
    },
    data() {
        return {
            sortableOptions: {
                forceFallback: true,
                animation: 250,
            },
            sortable: null,
            drag: false,
            loadingIndicatorWidth: 0,
        };
    },
    mounted() {
        this.initSortable(this.$refs.startedWrapper, {
            name: 'started',
            put: ['in-progress', 'completed'],
        });
        this.initSortable(this.$refs.inProgressWrapper, {
            name: 'in-progress',
            put: ['started', 'completed'],
        });
        this.initSortable(this.$refs.completedWrapper, {
            name: 'completed',
            put: ['started', 'in-progress'],
        });
    },

    methods: {
        initSortable(wrapper, group) {
            // Functions to handle group
            const onStart = (ev) => {
                const IND = ev.oldIndex;
                const PARENT = ev.target;
                const TARGET = PARENT.children[IND];

                const {
                    offsetHeight: HEIGHT,
                    offsetWidth: WIDTH,
                    offsetLeft: LEFT,
                    offsetTop: TOP,
                } = TARGET;

                Object.assign(this.$refs.placeholder.style, {
                    display: 'block',
                    height: `${HEIGHT}px`,
                    width: `${WIDTH}px`,
                    top: `${TOP}px`,
                    left: `${LEFT}px`,
                });
            };
            const onEnd = () => {
                this.$refs.placeholder.style = null;
            };
            const onAdd = (ev) => {
                const TARGET_LIST = ev.to;
                const PREVIOUS_LIST = ev.from;
                const PREVIOUS_PROGRESS_ID = PREVIOUS_LIST.dataset.progressId;
                const CURRENT_PROGRESS_ID = TARGET_LIST.dataset.progressId;
                const TODO_ID = ev.item.dataset.todoId;
                const DATA = {
                    todoId: TODO_ID,
                    currentProgressId: CURRENT_PROGRESS_ID,
                    previousProgressId: PREVIOUS_PROGRESS_ID,
                };
                this.loadingIndicatorWidth = 20;

                // Functions to handle the request
                const handleRequest = () => {
                    this.loadingIndicatorWidth = 100;
                };
                const handleError = () => {
                    const toast = useToast();
                    toast.error("Can't update task, please do it later.", {
                        position: 'bottom-right',
                        timeout: 3000,
                        closeOnClick: false,
                        pauseOnFocusLoss: true,
                        pauseOnHover: true,
                        draggable: true,
                    });

                    const CHILD = ev.item;
                    // Put back the last inserted item
                    PREVIOUS_LIST.insertBefore(
                        CHILD,
                        PREVIOUS_LIST.children[ev.oldIndex]
                    );
                };

                // Send request to the server
                this.$store
                    .dispatch('PersonalTaskModule/updateProgress', DATA)
                    .then(handleRequest)
                    .catch(handleError);
            };
            const onMove = (ev, originalEvent) => {
                const {
                    offsetHeight: HEIGHT,
                    offsetWidth: WIDTH,
                    offsetLeft: LEFT,
                    offsetTop: TOP,
                } = originalEvent.target;

                Object.assign(this.$refs.placeholder.style, {
                    display: 'block',
                    height: `${HEIGHT}px`,
                    width: `${WIDTH}px`,
                    top: `${TOP}px`,
                    left: `${LEFT}px`,
                });
            };

            // Initialize options for sorting
            const OPTIONS = {
                group,
                ...this.sortableOptions,
                onStart,
                onEnd,
                onMove,
                onAdd,
            };

            Sortable.create(wrapper, OPTIONS);
        },
        resetProgressData() {
            this.loadingIndicatorWidth = 0;
        },
    },
    computed: {
        getStartedTasks() {
            return this.$store.state['PersonalTaskModule'].started;
        },
        getInProgressTasks() {
            return this.$store.state['PersonalTaskModule'].inProgress;
        },
        getCompletedTasks() {
            return this.$store.state['PersonalTaskModule'].completed;
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
@use '../../../../scss/2-Tools/mixins/css-properties/width-and-height';
@use '../../../../scss/4-Layout/columns';

// prettier-ignore
.personal-page .tasks {
    position: relative;
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
        &__items{
            height: 100%;
        }
        &__placeholder{
            position: absolute;
            transition: all .15s linear;
            display: none;
            border-radius: 15px;
            background-color: map.get(text.$main, 200);
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

.loader--load-indicator {
    z-index: 999;
}

// prettier-ignore
.Vue-Toastification__container .Vue-Toastification__toast{
    min-height: 0;
    @include padding.all-sides((
        xsm: 10
    ));

    .Vue-Toastification__icon{
        @include margin.right((
            xsm: 10
        ));
        @include width-and-height.set((
            xsm: (width: 15px)
        ));
    }

    .Vue-Toastification__toast-body{
        font-weight: 600;
        @include font-size.responsive((
            xsm: map.get(major-second.$scale, 3)
        ));
    }

    .Vue-Toastification__progress-bar{
        bottom: -1px;
    }
}
</style>

import Todo from '../../Helpers/APIs/Todo';

export default {
    namespaced: true,
    state: {
        started: [],
        inProgress: [],
        completed: [],
    },
    mutations: {
        setStartedTask(state, startedArr) {
            state.started = startedArr;
        },
        setInProgressTask(state, inProgressArr) {
            state.inProgress = inProgressArr;
        },
        setCompletedTask(state, completedArr) {
            state.completed = completedArr;
        },
        addStartedTask(state, data) {
            state.started.push(data);
        },
        addInProgressTask(state, data) {
            state.inProgress.push(data);
        },
        addCompletedTask(state, data) {
            state.completed.push(data);
        },
        updateProgressTask(
            state,
            { todoId, currentProgressId, previousProgressId }
        ) {
            const getState = (stateId) => {
                return stateId === 0
                    ? state.started
                    : stateId === 1
                    ? state.inProgress
                    : stateId === 2
                    ? state.completed
                    : [];
            };

            const PREVIOUS_STATE = getState(previousProgressId);
            const NEXT_STATE = getState(currentProgressId);
            const IND = PREVIOUS_STATE.findIndex(
                (task) => task.id === parseInt(todoId)
            );
            if (IND === -1) return;

            // Transfer the item
            NEXT_STATE.push(Object.assign({}, PREVIOUS_STATE[IND]));

            // Finally remove the item from the previous state
            PREVIOUS_STATE.splice(IND, 1);
        },
    },
    actions: {
        // Fetch all personal tasks (started, in-progress, completed)
        fetchAll(state) {
            const REQUEST = Todo.fetchAllPersonalTasks();

            REQUEST.then((res) => {
                const DATA = res.data;

                state.commit('setStartedTask', DATA.started);
                state.commit('setInProgressTask', DATA.in_progress);
                state.commit('setCompletedTask', DATA.completed);
            });

            return REQUEST;
        },

        // Create a todo task
        create({ commit }, data) {
            const REQUEST = Todo.create(data);

            REQUEST.then((res) => {
                const DATA = res.data;
                commit('addStartedTask', DATA);
            });

            return REQUEST;
        },

        // Udpate todo list progress
        updateProgress(
            { commit },
            { todoId, currentProgressId, previousProgressId }
        ) {
            const REQUEST = Todo.updateProgress({
                todoId,
                progressId: currentProgressId,
            });

            REQUEST.then(() => {
                commit('updateProgressTask', {
                    todoId,
                    currentProgressId,
                    previousProgressId,
                });
            });
            return REQUEST;
        },
    },
};

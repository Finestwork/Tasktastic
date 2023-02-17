<template>
    <Button :options="addTaskBtn" class="add-task-btn"></Button>
</template>

<script>
import Button from '../../../Components/Forms/Button';
export default {
    components: {
        Button,
    },
    data() {
        return {
            addTaskBtn: {
                colorScheme: 'primary',
                variant: 'flat',
                btnSettings: {
                    type: 'button',
                    text: 'Add Task',
                },
            },
        };
    },
};
</script>

<style lang="scss">
.personal-page .add-task-btn {
    display: flex;
    margin-left: auto;
}
</style>

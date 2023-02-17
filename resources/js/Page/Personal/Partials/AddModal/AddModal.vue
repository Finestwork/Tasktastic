<template>
    <Modal class="add-todo-modal" :show-modal="true">
        <Header />
        <Checklist />
    </Modal>
</template>

<script>
import Modal from '../../../../Components/Modal/Modal';
import Header from './Partials/Header';
import Checklist from './Partials/Checklist';

export default {
    components: {
        Checklist,
        Modal,
        Header,
    },
};
</script>

<style lang="scss">
@use '../../../../../scss/2-Tools/mixins/css-properties/padding';

// prettier-ignore
.add-todo-modal .modal{
    &__main-content{
        width: 95%;
        max-width: 500px;
        max-height: 95%;
        @include padding.all-sides((
            xsm: [15]
        ));
    }
}
</style>

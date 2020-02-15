<template>
  <div class="q-pa-xl">
    <div class="flex">
      <kanBoardTable />
      <taskModal style="margin-right:24px" />
    </div>
  </div>
</template>

<script>
import kanBoardTable from '../components/tasks/kanBoardTable';
import taskModal from '../components/structure/taskModal.vue';

export default {
  name: 'kanBoard',
  meta() {
    return { title: this.$t('kanBoard') };
  },

  components: {
    kanBoardTable,
    taskModal,
  },
};
</script>

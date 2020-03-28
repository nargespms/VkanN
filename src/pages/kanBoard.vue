<template>
  <div class="q-pa-xl">
    <taskModal v-if="$store.state.module1.userData.role !== 'CLIENT'" style="overflow:auto;" />
    <div class="flex mt12">
      <kanBoardTable />
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

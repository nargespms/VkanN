<template>
  <div class="q-pa-xl">
    <div class="flex mt12">
      <kanBoardTable />
    </div>
  </div>
</template>

<script>
import kanBoardTable from '../components/tasks/kanBoardTable';

export default {
  name: 'kanBoard',
  meta() {
    return { title: this.$t('kanBoard') };
  },

  components: {
    kanBoardTable,
  },
};
</script>

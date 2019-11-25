<template >
  <div class="q-pa-lg">
    <div class="userManagementListWrap">
      <tableDataWrap :endpoint="'/statics/tasks.json'" />
    </div>
  </div>
</template>

<script>
import tableDataWrap from '../structure/tableDataWrap.vue';

export default {
  name: 'tasksListCmp',
  components: {
    tableDataWrap,
  },
};
</script>

<style lang="scss">
</style>

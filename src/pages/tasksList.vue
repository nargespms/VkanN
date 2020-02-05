<template >
  <div>
    tasklist page ast
    <tasksListCmp />
  </div>
</template>

<script>
import tasksListCmp from '../components/tasks/tasksListCmp.vue';

export default {
  name: 'tasksList',
  components: {
    tasksListCmp,
  },
};
</script>

<style lang="scss">
</style>

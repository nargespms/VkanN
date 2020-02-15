<template>
  <div>
    tasklist page ast
    <tasksListCmp />
  </div>
</template>

<script>
import tasksListCmp from '../components/tasks/tasksListCmp.vue';

export default {
  name: 'tasksList',
  meta() {
    return { title: this.$t('tasksList') };
  },

  components: {
    tasksListCmp,
  },
};
</script>

<style lang="scss"></style>

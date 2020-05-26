<template>
  <div class="q-pa-xl">
    <addNewTask />
  </div>
</template>

<script>
import addNewTask from '../components/tasks/addNewTask.vue';

export default {
  name: 'addTask',
  meta() {
    return { title: this.$t('addTask') };
  },

  components: {
    addNewTask,
  },
};
</script>

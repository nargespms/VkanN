<template >
  <div>
    <q-btn :label="$t('addNewTask')" color="primary" @click="task = true" icon="add" />
    <q-dialog v-model="task" transition-show="rotate" transition-hide="rotate">
      <addNewTask
        class="bg-white q-pa-lg"
        view="Lhh lpR fff"
        style="width: 1000px; max-width: 80vw;"
        @taskState="taskState"
      />
    </q-dialog>
  </div>
</template>


<script>
import addNewTask from '../tasks/addNewTask.vue';

export default {
  name: 'taskModal',
  components: {
    addNewTask,
  },
  data() {
    return {
      task: false,
    };
  },
  methods: {
    taskState(value) {
      this.task = value;
    },
  },
};
</script>

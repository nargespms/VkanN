<template >
  <div>
    <q-btn :label="$t('addNewTask')" color="primary" @click="task = true" icon="add" class="float" />
    <q-dialog v-model="task" transition-show="rotate" transition-hide="rotate" @hide="hide">
      <addNewTask
        class="bg-white q-pa-lg"
        view="Lhh lpR fff"
        style="width: 1000px; max-width: 80vw;"
        @taskState="taskState"
        :state="'kanboard'"
        :boardData="this.editData"
      />
    </q-dialog>
  </div>
</template>


<script>
import addNewTask from '../tasks/addNewTask.vue';

export default {
  name: 'taskModal',
  props: ['editData', 'edit'],
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
    hide() {
      this.$emit('disable', false);
    },
  },
  watch: {
    edit(newVal) {
      this.task = newVal;
    },
  },
};
</script>

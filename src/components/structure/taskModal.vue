<template >
  <div class="clear">
    <q-btn :label="$t('addNewTask')" color="primary" @click="task = true" icon="add" class="float" />
    <q-dialog v-model="task" transition-show="jump-down" transition-hide="jump-up" @hide="hide">
      <addNewTask
        class="bg-white q-pa-lg"
        view="Lhh lpR fff"
        style="width: 1000px; max-width: 80vw;"
        @taskState="taskState"
        :state="'kanboard'"
        :boardData="this.editData"
        @reloadCmp="reloadCmp"
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
    reloadCmp(value) {
      this.$emit('reloadCmp', value);
      console.log('task modal');
    },
  },
  watch: {
    edit(newVal) {
      this.task = newVal;
    },
  },
};
</script>

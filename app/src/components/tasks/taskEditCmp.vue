<template>
  <div>
    <addNewTask @tabChanged="tabChanged" profileMode="Edit" />
  </div>
</template>

<script>
import addNewTask from './addNewTask.vue';

export default {
  name: 'contractEditCmp',
  components: { addNewTask },
  props: ['data'],
  methods: {
    tabChanged(value) {
      this.$emit('tabChanged', value);
    },
  },
};
</script>

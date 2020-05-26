<template>
  <div class="q-pa-xl">
    <taskProfile :key="componentKey" @reRender="reRender" />
  </div>
</template>

<script>
import taskProfile from '../components/tasks/taskProfile.vue';

export default {
  name: 'task',
  meta() {
    return { title: `${this.$t('task')}` };
  },
  components: {
    taskProfile,
  },
  data() {
    return { componentKey: 0 };
  },
  methods: {
    reRender(value) {
      console.log(value);
      this.componentKey += 1;
    },
  },
};
</script>

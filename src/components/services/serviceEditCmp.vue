<template >
  <div>
    <addservice @tabChanged="tabChanged" profileMode="Edit" />
  </div>
</template>


<script>
import addservice from './addservice.vue';

export default {
  name: 'serviceEditCmp',
  components: {
    addservice,
  },
  props: ['data'],
  methods: {
    tabChanged(value) {
      this.$emit('tabChanged', value);
      console.log('yedune balatar');
    },
  },
};
</script>

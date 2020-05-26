<template >
  <div>
    <addContractCmp @tabChanged="tabChanged" profileMode="Edit" />
  </div>
</template>


<script>
import addContractCmp from './addContractCmp.vue';

export default {
  name: 'contractEditCmp',
  components: { addContractCmp },
  props: ['data'],
  methods: {
    tabChanged(value) {
      this.$emit('tabChanged', value);
    },
  },
};
</script>

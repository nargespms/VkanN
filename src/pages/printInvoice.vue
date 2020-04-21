<template>
  <div>
    <printInvoiceCmp />
  </div>
</template>

<script>
import printInvoiceCmp from '../components/print/printInvoiceCmp.vue';

export default {
  name: 'printInvoice',
  meta() {
    return { title: this.$t('print') };
  },

  components: {
    printInvoiceCmp,
  },
  methods: {},
};
</script>
<style lang="scss">
.returnBut {
  margin: 12px;
  float: right;
}
</style>

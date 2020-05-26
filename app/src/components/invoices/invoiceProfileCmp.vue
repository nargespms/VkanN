<template>
  <div>
    <printInvoiceCmp :printData="printData" />
  </div>
</template>

<script>
import printInvoiceCmp from '../print/printInvoiceCmp.vue';

export default {
  name: 'invoiceProfileCmp',
  components: {
    printInvoiceCmp,
  },
  props: ['printData'],
};
</script>

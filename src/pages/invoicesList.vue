<template>
  <div class="q-pa-xl">
    <invoicesListCmp />
  </div>
</template>

<script>
import invoicesListCmp from '../components/invoices/invoicesListCmp.vue';

export default {
  name: 'invoicesList',
  components: {
    invoicesListCmp,
  },
};
</script>

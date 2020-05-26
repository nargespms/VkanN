<template>
  <div class="q-pa-xl">
    <invoicesListCmp />
  </div>
</template>

<script>
import invoicesListCmp from '../components/invoices/invoicesListCmp.vue';

export default {
  name: 'invoicesList',
  meta() {
    return { title: this.$t('invoicesList') };
  },

  components: {
    invoicesListCmp,
  },
};
</script>

<template>
  <div class="q-pa-xl addInvoicePage">
    <!-- <addInvoiceCmp /> -->
    <addInvoiceTable profileMode="Add" />
  </div>
</template>

<script>
// import addInvoiceCmp from '../components/invoices/addInvoiceCmp.vue';
import addInvoiceTable from '../components/invoices/addInvoiceTable.vue';

export default {
  name: 'addInvoice',
  meta() {
    return { title: this.$t('addInvoice') };
  },

  components: {
    addInvoiceTable,

    // addInvoiceCmp,
  },
};
</script>

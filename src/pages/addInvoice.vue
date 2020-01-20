<template>
  <div class="q-pa-xl">
    <h4 class="headerTitleInPage">
      <span>{{ $t('addInvoice') }}</span>
    </h4>
    <addInvoiceCmp />
  </div>
</template>

<script>
import addInvoiceCmp from '../components/invoices/addInvoiceCmp.vue';

export default {
  name: 'addInvoice',
  components: {
    addInvoiceCmp,
  },
};
</script>

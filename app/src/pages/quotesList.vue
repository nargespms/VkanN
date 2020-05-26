<template>
  <div class="q-pa-xl">
    <quotesListCmp />
  </div>
</template>

<script>
import quotesListCmp from '../components/invoices/quotesListCmp.vue';

export default {
  name: 'quotesList',
  meta() {
    return { title: this.$t('quotesList') };
  },

  components: {
    quotesListCmp,
  },
};
</script>

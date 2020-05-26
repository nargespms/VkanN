<template>
  <div class="q-pa-xl">
    <div class="cardActionWrap">
      <cardsAction :data="invoices.list" />

      <cardsAction
        v-if="$store.state.module1.userData.user.role !== 'CLIENT'"
        :data="invoices.addInvoice"
      />
      <cardsAction :data="invoices.quotesList" />
    </div>
  </div>
</template>

<script>
import cardsAction from '../components/structure/cardsAction.vue';

export default {
  name: 'invoices',
  meta() {
    return { title: this.$t('invoices') };
  },

  components: {
    cardsAction,
  },
  data() {
    return {
      invoices: {
        list: {
          icon: 'fa fa-table',
          bg: '#26A69A',
          cardName: 'invoicesList',
          parentUrl: 'billing/invoices',
        },
        quotesList: {
          icon: 'fa fa-table',
          bg: '#D64367',
          cardName: 'quotesList',
          parentUrl: 'billing/invoices',
        },
        addInvoice: {
          icon: 'fas fa-plus',
          bg: '#ffa900',
          cardName: 'addInvoice',
          parentUrl: 'billing/invoices',
        },
      },
    };
  },
};
</script>

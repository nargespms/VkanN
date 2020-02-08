<template>
  <div class="q-pa-xl">
    <div class="cardActionWrap">
      <cardsAction :data="invoices.list" />

      <cardsAction
        v-if="$store.state.module1.userData.role !== 'CLIENT'"
        :data="invoices.addInvoice"
      />
    </div>
  </div>
</template>

<script>
import cardsAction from '../components/structure/cardsAction.vue';

export default {
  name: 'invoices',
  components: {
    cardsAction,
  },
  data() {
    return {
      invoices: {
        list: {
          number: 15,
          icon: 'fas fa-handshake',
          bg: '#26A69A',
          cardName: 'invoicesList',
          parentUrl: 'billing/invoices',
        },
        addInvoice: {
          icon: 'fas fa-handshake',
          bg: '#ffa900',
          cardName: 'addInvoice',
          parentUrl: 'billing/invoices',
        },
      },
    };
  },
};
</script>

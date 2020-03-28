<template>
  <div class="q-pa-xl">
    <div class="cardActionWrap">
      <cardsAction :data="billing.invoices" />
      <cardsAction :data="billing.contracts" />
    </div>
  </div>
</template>

<script>
import cardsAction from '../components/structure/cardsAction.vue';

export default {
  name: 'billing',
  meta() {
    return { title: this.$t('billing') };
  },

  components: {
    cardsAction,
  },
  data() {
    return {
      billing: {
        invoices: {
          number: 15,
          icon: 'fas fa-file-invoice-dollar',
          bg: '#26A69A',
          cardName: 'invoices',
          parentUrl: 'billing',
        },
        contracts: {
          icon: 'fas fa-handshake',
          bg: '#ffa900',
          cardName: 'contracts',
          parentUrl: 'billing',
        },
      },
    };
  },
};
</script>

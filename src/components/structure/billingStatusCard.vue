<template>
  <div class="dashBoardCardsWrap">
    <cardsAction :data="invoices.expired" />
    <cardsAction :data="invoices.unpaid" />
    <cardsAction :data="invoices.paidInvoiceAmountToday" />
    <cardsAction :data="invoices.paidInvoiceAmountyesterday" />
  </div>
</template>

<script>
import cardsAction from './cardsAction.vue';

export default {
  name: 'billingStatusCard',
  components: {
    cardsAction,
  },
  props: ['data'],
  data() {
    return {
      invoices: {
        expired: {
          number: this.data.expiredinvoice,
          icon: 'fas fa-hourglass-end',
          bg: '#26A69A',
          cardName: 'invoicesList',
          cardLabel: 'expiredInvoices',
          parentUrl: 'billing/invoices',
        },
        unpaid: {
          number: this.data.unpaidinvoice,
          icon: 'fas fa-ban',
          bg: '#D64367',
          cardName: 'invoicesList',
          cardLabel: 'unpaidInvoices',
          parentUrl: 'billing/invoices',
        },
        paidInvoiceAmountToday: {
          number: 15,
          icon: 'attach_money',
          bg: '#3EAE1E',
          cardName: 'invoicesList',
          cardLabel: 'paidInvoiceAmount',
          parentUrl: 'billing/invoices',
        },
        paidInvoiceAmountyesterday: {
          number: 2,
          icon: 'attach_money',
          bg: '#1a667e',
          cardName: 'invoicesList',
          cardLabel: 'paidInvoiceAmount',
          parentUrl: 'billing/invoices',
        },
      },
    };
  },
};
</script>


<style lang="scss">
.dashBoardCardsWrap {
  display: flex;
  justify-content: center;
}
</style>

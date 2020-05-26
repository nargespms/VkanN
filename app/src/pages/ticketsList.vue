<template>
  <div>
    <ticketsListCmp />
  </div>
</template>

<script>
import ticketsListCmp from '../components/tickets/ticketsListCmp.vue';

export default {
  name: 'ticketsList',
  meta() {
    return { title: this.$t('ticketsList') };
  },

  components: {
    ticketsListCmp,
  },
};
</script>

<style lang="scss"></style>

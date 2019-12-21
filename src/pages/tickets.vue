<template>
  <div class="q-pa-xl">
    <div class="cardActionWrap">
      <cardsAction :data="tickets.list" />
      <cardsAction :data="tickets.addTickets" />
    </div>
  </div>
</template>


<script>
import cardsAction from '../components/structure/cardsAction.vue';

export default {
  name: 'tickets',
  components: {
    cardsAction,
  },
  data() {
    return {
      tickets: {
        addTickets: {
          icon: 'fas fa-edit',
          bg: '#ffa900',
          cardName: 'addTicket',
          parentUrl: 'tickets',
        },
        list: {
          number: 18,
          icon: 'system_update_alt',
          bg: '#26A69A',
          cardName: 'ticketsList',
          parentUrl: 'tickets',
        },
      },
    };
  },
};
</script>
<style lang="scss">
</style>

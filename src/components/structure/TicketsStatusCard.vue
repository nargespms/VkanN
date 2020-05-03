<template>
  <div>
    <cardsAction :data="tickets.open" />
    <cardsAction :data="tickets.inProgress" />
    <cardsAction :data="tasks.critical" />
    <cardsAction :data="tasks.expired" />
  </div>
</template>


<script>
import cardsAction from './cardsAction.vue';

export default {
  name: 'openTicketCard',
  components: {
    cardsAction,
  },
  data() {
    return {
      tickets: {
        open: {
          number: 15,
          icon: 'system_update_alt',
          bg: '#26A69A',
          cardName: 'ticketsList',
          cardLabel: 'openTickets',
          parentUrl: 'tickets',
        },
        inProgress: {
          number: 20,
          icon: 'fas fa-cog',
          bg: '#D64367',
          cardName: 'ticketsList',
          cardLabel: 'inprogressTickets',
          parentUrl: 'tickets',
        },
      },
      tasks: {
        critical: {
          number: 15,
          icon: 'warning',
          bg: '#3EAE1E',
          cardName: 'tasksList',
          cardLabel: 'criticalTasks',
          parentUrl: 'tasks',
        },
        expired: {
          number: 2,
          icon: 'fas fa-hourglass-end',
          bg: '#1a667e',
          cardName: 'tasksList',
          cardLabel: 'expiredTasks',
          parentUrl: 'tasks',
        },
      },
    };
  },
};
</script>

<template>
  <div class="dashBoardCardsWrap">
    <cardsAction :data="tickets.open" />
    <cardsAction :data="tickets.inProgress" />
    <cardsAction :data="tasks.critical" />
    <cardsAction unclickable="true" :data="tasks.expired" />
  </div>
</template>


<script>
import cardsAction from './cardsAction.vue';

export default {
  name: 'TicketsStatusCard',
  components: {
    cardsAction,
  },
  props: ['data'],
  data() {
    return {
      tickets: {
        open: {
          number: this.data.openTickets,
          icon: 'system_update_alt',
          bg: '#26A69A',
          cardName: 'ticketsList?status=UNANSWERD',
          cardLabel: 'openTickets',
          parentUrl: 'tickets',
        },
        inProgress: {
          number: this.data.ipTickets,
          icon: 'fas fa-cog',
          bg: '#D64367',
          cardName: 'ticketsList?status=INPROGRESS',
          cardLabel: 'inprogressTickets',
          parentUrl: 'tickets',
        },
      },
      tasks: {
        critical: {
          number: this.data.criticalTask,
          icon: 'warning',
          bg: '#3EAE1E',
          cardName: 'tasksList?priority=CRITICAL',
          cardLabel: 'criticalTasks',
          parentUrl: 'tasks',
        },
        expired: {
          number: this.data.expiredTask,
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
<style lang="scss">
.dashBoardCardsWrap {
  display: flex;
  justify-content: center;
}
</style>

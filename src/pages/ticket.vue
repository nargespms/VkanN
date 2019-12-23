<template >
  <div class="q-pa-xl">
    <div class="ticketWrap">
      <ticketInfo :data="this.ticket" />
      <replyTicket />
    </div>
    <div class="ticketThreadsWrap">
      <ticketThreads :data="this.ticket" />
    </div>
  </div>
</template>


<script>
import ticketInfo from '../components/tickets/ticketInfo.vue';
import replyTicket from '../components/tickets/replyTicket.vue';
import ticketThreads from '../components/tickets/ticketThreads.vue';

export default {
  name: 'ticket',
  components: {
    ticketInfo,
    replyTicket,
    ticketThreads,
  },
  data() {
    return {
      ticket: {},
    };
  },
  mounted() {
    this.$axios.get('/statics/ticket.json').then(Response => {
      this.ticket = Response.data;
    });
  },
};
</script>
<style lang="scss">
.ticketWrap,
.ticketThreadsWrap {
  background-color: #fff;
  width: 85%;
  margin: 8px auto;
  border: 2px solid #d7d7d7;
}
</style>

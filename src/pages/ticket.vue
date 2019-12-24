<template >
  <div class="q-pa-xl">
    <div class="ticketWrap">
      <ticketInfo :data="this.ticket" @editorState="editorState" />
      <template v-if="replyState">
        <replyTicket />
      </template>
    </div>
    <!--  for clients (chat) -->
    <div class="ticketThreadsWrap">
      <ticketThreads :data="this.ticket" />
    </div>
    <div class="ticketThreads2Wrap">
      <ticketThreads2
        @deletedTickets="deletedTickets"
        @changedText="changedText"
        :data="this.ticket"
      />
    </div>
  </div>
</template>


<script>
import ticketInfo from '../components/tickets/ticketInfo.vue';
import replyTicket from '../components/tickets/replyTicket.vue';
import ticketThreads from '../components/tickets/ticketThreads.vue';
import ticketThreads2 from '../components/tickets/ticketThreads2.vue';

export default {
  name: 'ticket',
  components: {
    ticketInfo,
    replyTicket,
    ticketThreads,
    ticketThreads2,
  },
  data() {
    return {
      replyState: false,
      ticket: {},
    };
  },
  methods: {
    editorState() {
      this.replyState = !this.replyState;
    },
    deletedTickets(value) {
      this.ticket.threads = value;
      // and then it should be post to server
      console.log(this.ticket);
    },
    changedText(value) {
      this.ticket.threads = value;
      console.log(this.ticket.threads);
    },
  },
  mounted() {
    this.$axios.get('/statics/ticket.json').then(Response => {
      this.ticket = Response.data;
      console.log(this.ticket);
    });
  },
};
</script>
<style lang="scss">
.ticketWrap,
.ticketThreadsWrap {
  background-color: #fff;
  border: 2px solid #d7d7d7;
  margin: 8px auto;
  width: 85%;
  @media screen and (max-width: 1080px) {
    width: 100%;
  }
}
.ticketThreads2Wrap {
  margin: 8px auto;
  width: 85%;
  @media screen and (max-width: 1080px) {
    width: 100%;
  }
}
</style>

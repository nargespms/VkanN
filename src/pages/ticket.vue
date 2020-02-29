<template >
  <div class="q-pa-xl">
    <div class="ticketWrap">
      <ticketInfo :data="this.ticket" @editorState="editorState" />
      <template v-if="replyState">
        <replyTicket :data="specificThreadToReply" @addToThreads="addToThreads" />
      </template>
    </div>
    <!--  for clients (chat) -->
    <div class="ticketThreadsWrap">
      <ticketThreads :data="this.ticket" />
    </div>
    <!-- for staffs -->
    <div class="ticketThreads2Wrap">
      <ticketThreads2
        :data="this.ticket"
        @replyThreadParent="replyThreadParent"
        :addThread="addThread"
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
  meta() {
    return { title: this.$t('ticket') };
  },

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
      specificThreadToReply: '',
      addThread: {},
    };
  },
  methods: {
    addToThreads(value) {
      console.log(value);
      this.ticket.threads.push({
        desc: value,
        attachments: {},
        date: new Date(),
        // desc:
        // id:
        role: 'staff',
        // status:
        // time:
        // user:
      });
      // post the thread to server
      // console.log(value);
      this.addThread = value;
      this.replyState = false;
      this.specificThreadToReply = '';
    },
    editorState() {
      this.replyState = !this.replyState;
    },
    replyThreadParent(value) {
      this.replyState = true;
      this.specificThreadToReply = value;
      console.log(this.specificThreadToReply);
    },
  },
  mounted() {
    this.$axios
      .get(`/v1/api/vkann/tickets/${this.$route.params.ticketId}`)
      .then(res => {
        console.log(res);
      });
  },
  watch: {
    ticket(newVal) {
      // console.log('updateTicket');
      console.log('watchMe');
      this.ticket = newVal;
    },
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

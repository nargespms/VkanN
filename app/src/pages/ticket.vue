<template >
  <div class="q-pa-xl">
    <div class="ticketWrap">
      <ticketInfo :data="this.ticket" @editorState="editorState" @changeStatus="changeStatus" />
      <template v-if="replyState">
        <replyTicket
          @getUploadedId="getUploadedId"
          :data="specificThreadToReply"
          @addToThreads="addToThreads"
        />
      </template>
    </div>
    <!--  for clients (chat) -->
    <div v-if="$store.state.module1.userData.user.role === 'CLIENT'" class="ticketThreadsWrap">
      <ticketThreads :key="componentKey" :data="this.ticket" />
    </div>
    <!-- for staffs -->
    <div v-else class="ticketThreads2Wrap">
      <ticketThreads2
        :key="componentKey"
        :data="this.ticket"
        @replyThreadParent="replyThreadParent"
        @reloadCmp="reloadCmp"
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
      componentKey: 0,
      attachments: '',
    };
  },
  methods: {
    getUploadedId(value) {
      this.attachments = value;
    },
    addToThreads(value) {
      console.log(value);

      this.$axios
        .post('/v1/api/vkann/threads', {
          ticketId: this.ticket.id,
          description: value,
          attachments: this.attachments,
        })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.getDataTicket();
          }
        });
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
    changeStatus(value) {
      console.log('change status');
      this.$axios.put(`/v1/api/vkann/tickets/${this.$route.params.ticket}`, {
        // eslint-disable-next-line no-underscore-dangle
        serviceId: this.ticket.service._id,
        department: this.ticket.department,
        status: value,
        title: this.ticket.title,
      });
    },
    getDataTicket() {
      this.$axios
        .get(`/v1/api/vkann/tickets/${this.$route.params.ticket}`)
        .then(res => {
          this.ticket = res.data.ticket;
        });
    },
    reloadCmp() {
      this.getDataTicket();
    },
  },
  mounted() {
    this.getDataTicket();
  },
  watch: {
    ticket(newVal) {
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

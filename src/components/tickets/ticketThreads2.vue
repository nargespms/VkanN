<template >
  <div class="ticketThread2">
    <ul>
      <li v-for="ticket in tickets" :key="ticket.id">
        <template v-if="ticket.status !== 'deleted'">
          <ticketReplyEncapsulate
            :data="ticket"
            @deletedTickets="deletedTickets"
            @changedText="changedText"
            @replyThread="replyThread"
          />
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import ticketReplyEncapsulate from './ticketReplyEncapsulate.vue';

export default {
  name: 'ticketThreads2',
  props: ['data', 'addThread'],
  components: {
    ticketReplyEncapsulate,
  },
  data() {
    return {};
  },
  methods: {
    deletedTickets(value) {
      this.tickets = value;
      // and then it should be post to server
      console.log(value.id, value.status);
      // should post value to server to server
    },
    changedText(value) {
      // this.ticket.push(value);
      this.tickets = value;
      // should post value to server
      console.log(value.id, value.desc);
    },
    replyThread(value) {
      this.$emit('replyThreadParent', value);
    },
  },
  computed: {
    tickets: {
      get() {
        return this.data.threads;
      },
      set(newName) {
        return newName;
      },
      // return this.data.threads;
    },
  },
  mounted() {
    if (this.addThread.length > 0) {
      this.tickets.push({
        desc: this.addThread,
        attachments: {},
        date: new Date(),
        // desc:
        // id:
        // role:
        // status:
        // time:
        // user:
      });
      // console.log(this.tickets);
    }
  },
  watch: {
    data(newVal) {
      // console.log('ticketThreads2');
      console.log(newVal);
    },
  },
};
</script>

<style lang="scss">
.ticketThread2 {
  padding: 16px;
}
</style>

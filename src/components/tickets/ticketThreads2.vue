<template >
  <div class="ticketThread2">
    <ul>
      <li v-for="ticket in tickets" :key="ticket.id">
        <template v-if="ticket.status !== 'deleted'">
          <ticketReplyEncapsulate
            :data="ticket"
            @deletedTickets="deletedTickets"
            @changedText="changedText"
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
  props: ['data'],
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
};
</script>

<style lang="scss">
.ticketThread2 {
  padding: 16px;
}
</style>

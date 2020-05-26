<template >
  <div class="ticketThread2">
    <ul>
      <li v-for="ticket in tickets" :key="ticket.id">
        <template v-if="ticket.status !== 'deleted'">
          <ticketReplyEncapsulate
            :data="ticket"
            @deletedTickets="deletedTickets"
            @replyThread="replyThread"
            :service="data.service"
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
      this.$axios.delete(`/v1/api/vkann/threads/${value.id}`).then(res => {
        console.log(res);
      });
      this.$emit('reloadCmp', true);
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
    },
  },
  mounted() {
    console.log(this.data);
  },
  watch: {
    data(newVal) {
      console.log(newVal);
    },
  },
};
</script>

<style lang="scss">
.ticketThread2 .closeReply {
  display: none;
}
</style>

<template>
  <div class="ticketThread">
    <ul>
      <li v-for="ticket in tickets" :key="ticket.id">
        <div v-if="ticket.createdBy.role === 'CLIENT'">
          <q-chat-message
            :name="`${ticket.createdBy.firstName} ${ticket.createdBy.lastName}`"
            avatar="https://cdn.quasar.dev/img/avatar3.jpg"
            :text="[`${ticket.description}`]"
            :stamp="
              `${new Date(ticket.createdAt).toLocaleTimeString(
                `${$route.params.locale}`
              )}
             - ${new Date(ticket.createdAt).toLocaleDateString(
               `${$route.params.locale}`
             )}`
            "
            sent
            bg-color="yellow-2"
          />
        </div>
        <div v-else>
          <q-chat-message
            :name="`${ticket.createdBy.firstName} ${ticket.createdBy.lastName}`"
            avatar="https://cdn.quasar.dev/img/avatar2.jpg"
            :text="[ticket.description]"
            :stamp="
              `${new Date(ticket.createdAt).toLocaleTimeString(
                `${$route.params.locale}`
              )}
             - ${new Date(ticket.createdAt).toLocaleDateString(
               `${$route.params.locale}`
             )}`
            "
            bg-color="light-blue-1"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ticketThreads',
  props: ['data'],
  data() {
    return {
      creationDate: '',
      creationTime: '',
    };
  },

  computed: {
    tickets() {
      return this.data.threads;
    },
  },
  mounted() {
    this.dateCalc();
    this.timeCalc();
  },
  methods: {
    dateCalc() {
      this.creationDate = new Date(this.data.createdAt).toLocaleDateString(
        `${this.$route.params.locale}`
      );
      console.log(this.creationDate);
    },
    timeCalc() {
      this.creationTime = new Date(this.data.createdAt).toLocaleTimeString(
        `${this.$route.params.locale}`
      );
      console.log(this.creationTime);
    },
  },
};
</script>

<style lang="scss">
.ticketThread {
  padding: 16px;
  .q-message-stamp {
    font-size: 15px;
  }
}
.q-message-name {
  padding: 12px;
  color: #5f1791;
}
.ticketThread .closeReply {
  display: none;
}
</style>

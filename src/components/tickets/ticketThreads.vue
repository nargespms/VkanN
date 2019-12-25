<template >
  <div class="ticketThread">
    <ul>
      <li v-for="ticket in tickets" :key="ticket.id">
        <div v-if="ticket.role === 'client'">
          <q-chat-message
            :name="ticket.user"
            avatar="https://cdn.quasar.dev/img/avatar3.jpg"
            :text="[`${ticket.desc}`]"
            :stamp="`${ticket.date}`"
            sent
            bg-color="yellow-2"
          />
        </div>
        <div v-if="ticket.role === 'staff'">
          <q-chat-message
            :name="ticket.user"
            avatar="https://cdn.quasar.dev/img/avatar2.jpg"
            :text="[ticket.desc]"
            :stamp="`${ticket.date}`"
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
    return {};
  },
  computed: {
    tickets() {
      return this.data.threads;
    },
    // stamp() {
    //   return this.data.threads.date.ToString();
    // },
  },
};
</script>

<style lang="scss">
.ticketThread {
  padding: 16px;
}
.q-message-name {
  padding: 12px;
}
</style>

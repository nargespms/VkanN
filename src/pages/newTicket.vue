<template >
  <div class="q-pa-xl">
    <addNewTicket />
  </div>
</template>

<script>
import addNewTicket from '../components/tickets/addNewTicket.vue';

export default {
  name: 'ticket',
  components: {
    addNewTicket,
  },
};
</script>

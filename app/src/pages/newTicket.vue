<template >
  <div class="q-pa-xl">
    <addNewTicket />
  </div>
</template>

<script>
import addNewTicket from '../components/tickets/addNewTicket.vue';

export default {
  name: 'ticket',
  meta() {
    return { title: this.$t('addNewTicket') };
  },

  components: {
    addNewTicket,
  },
};
</script>

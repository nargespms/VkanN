<template>
  <div class="clear">
    <q-btn
      :label="$t('addNewTicket')"
      color="primary"
      @click="ticket = true"
      icon="add"
      class="float"
    />
    <q-dialog
      class="dialogTicket"
      v-model="ticket"
      transition-show="jump-down"
      transition-hide="jump-up"
      @hide="hide"
    >
      <addNewTicket
        class="bg-white q-pa-lg"
        view="Lhh lpR fff"
        style="width: 1000px; max-width:50vw;"
      />
    </q-dialog>
  </div>
</template>

<script>
import addNewTicket from '../tickets/addNewTicket.vue';

export default {
  name: 'TicketModal',
  components: {
    addNewTicket,
  },
  data() {
    return {
      ticket: false,
    };
  },
  methods: {
    hide() {
      this.$emit('disable', false);
    },
  },
};
</script>

<style lang="scss">
.dialogTicket {
  .ticketForm {
    width: 100% !important;
  }
}
</style>

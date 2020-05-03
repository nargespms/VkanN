<template>
  <div class="addNewTicketCmp">
    <!-- choosing departman for ticket -->
    <div class="chooseDep" v-if="!ticketFormStatus">
      <div class="generalButWrap" v-if="$store.state.module1.userData.role === 'CLIENT'">
        <q-btn
          class="optionChooseBut"
          icon="attach_money"
          :label="$t('billing')"
          @click="activeBilling"
        />
        <q-btn
          class="optionChooseBut"
          icon="far fa-life-ring"
          :label="$t('support')"
          @click="activeSupport"
        />
        <q-btn
          class="optionChooseBut"
          icon="fas fa-question-circle"
          :label="$t('information')"
          @click="activeInfo"
        />
      </div>
    </div>
    <div v-if="ticketFormStatus || $store.state.module1.userData.role !== 'CLIENT'">
      <!-- new ticket form -->
      <ticketForm
        :choosedDep="this.$route.query.depid"
        :choosedService="this.$route.query.serviceName"
      />
    </div>
  </div>
</template>

<script>
import ticketForm from './ticketForm.vue';

export default {
  name: 'addNewTicket',
  meta() {
    return { title: this.$t('addTicket') };
  },

  components: {
    ticketForm,
  },
  props: ['locale'],
  data() {
    return {
      ticketFormStatus: false,
      ticket: {
        serviceName: '',
      },
      FilterOption2: this.servicesName,
    };
  },
  methods: {
    activeService() {
      this.ticketFormStatus = !this.ticketFormStatus;
      this.$router.push({
        path: `/${this.$route.params.locale}/tickets/addTicket`,
        query: { serviceName: this.ticket.serviceName },
      });
    },

    // activate billing ticket
    activeBilling() {
      this.ticketFormStatus = !this.ticketFormStatus;
      this.$router.push({
        path: `/${this.$route.params.locale}/tickets/addTicket`,
        query: { depid: 'BILLING' },
      });
      console.log(this.$route.query.depid);
    },
    // activate support ticket
    activeSupport() {
      this.ticketFormStatus = !this.ticketFormStatus;
      this.$router.push({
        path: `/${this.$route.params.locale}/tickets/addTicket`,
        query: { depid: 'TECH' },
      });
    },
    // activate billing ticket
    activeInfo() {
      this.ticketFormStatus = !this.ticketFormStatus;
      this.$router.push({
        path: `/${this.$route.params.locale}/tickets/addTicket`,
        query: { depid: 'INFO' },
      });
    },
  },
};
</script>

<style lang="scss">
.chooseDep {
  width: 80%;
  margin: 32px auto;
  @media screen and (max-width: 480px) {
    width: 95%;
  }
}
.generalButWrap {
  display: flex;
  justify-content: space-around;
  @media screen and (max-width: 480px) {
    display: block;
  }
}
.optionChooseBut {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #ddd;
  width: calc(100% / 3 - 24px);
  @media screen and (max-width: 480px) {
    width: calc(100% - 24px);
  }
}
</style>

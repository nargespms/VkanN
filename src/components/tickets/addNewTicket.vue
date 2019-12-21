<template >
  <div class="addNewTicketCmp">
    <!-- choosing departman for ticket -->
    <div class="chooseDep" v-if="!ticketFormStatus">
      <div class="generalButWrap">
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
    <div v-if="ticketFormStatus">
      <!-- buuton to back to choosing Departman -->
      <q-btn
        class="optionChooseBut"
        icon="fas fa-arrow-left"
        :label="$t('back')"
        @click="activeChooseDep"
      />
      <!-- new ticket form -->
      <ticketForm :choosedDep="this.$route.query.depid" />
    </div>
  </div>
</template>


<script>
import ticketForm from './ticketForm.vue';

export default {
  name: 'addNewTicket',
  components: {
    ticketForm,
  },
  props: ['locale'],
  data() {
    return {
      ticketFormStatus: false,
    };
  },
  methods: {
    activeChooseDep() {
      this.ticketFormStatus = false;
    },
    // activate billing ticket
    activeBilling() {
      this.ticketFormStatus = !this.ticketFormStatus;
      this.$router.push({
        path: `/${this.$route.params.locale}/tickets/addTicket`,
        query: { depid: 'billing' },
      });
      console.log(this.$route.query.depid);
    },
    // activate support ticket
    activeSupport() {
      this.ticketFormStatus = !this.ticketFormStatus;
      this.$router.push({
        path: `/${this.$route.params.locale}/tickets/addTicket`,
        query: { depid: 'support' },
      });
    },
    // activate billing ticket
    activeInfo() {
      this.ticketFormStatus = !this.ticketFormStatus;
      this.$router.push({
        path: `/${this.$route.params.locale}/tickets/addTicket`,
        query: { depid: 'information' },
      });
    },
  },
};
</script>

<style lang="scss">
.chooseDep {
  width: 80%;
  margin: 32px auto;
}
.generalButWrap {
  display: flex;
  justify-content: space-around;
}
.optionChooseBut {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #ddd;
  width: calc(100% / 3 - 24px);
}
</style>

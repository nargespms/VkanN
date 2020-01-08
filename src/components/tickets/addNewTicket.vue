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
    <div class="chooseDep" v-if="!ticketFormStatus">
      <q-select
        filled
        class="ticketInfoRecieve pr24"
        v-model.trim="ticket.serviceName"
        :options="FilterOption2"
        :label="$t('serviceName')"
        required
        lazy-rules
        :rules="[ val => val && val.length > 0 ]"
        @filter="filterFn2"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        @input="activeService"
      >
        <template v-slot:prepend>
          <q-icon name="settings_applications" />
        </template>
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">No results</q-item-section>
          </q-item>
        </template>
      </q-select>
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
      servicesName: ['service1', 'service2', 'service3', 'الکسا', 'رکنا'],
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
    activeChooseDep() {
      this.ticketFormStatus = false;
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
        query: { depid: 'SUPPORT' },
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
    //  customer auto compelete
    filterFn2(val, update) {
      // call abort() at any time if you can't retrieve data somehow
      setTimeout(() => {
        update(() => {
          if (val === '') {
            this.FilterOption2 = this.servicesName;
          } else {
            const needle = val.toLowerCase();
            this.FilterOption2 = this.servicesName.filter(
              v => v.toLowerCase().indexOf(needle) > -1
            );
          }
        });
      }, 500);
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

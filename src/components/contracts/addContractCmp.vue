<template >
  <div class="addContractWrapper col3th">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="col1">
        <!--  Service name -->
        <q-select
          outlined
          required
          color="light-blue-10 "
          v-model="contract.servicesName"
          :options="servicesName"
          :label="$t('serviceName')"
          class="inputStyle"
          lazy-rules
          :rules="[val => val && val.length > 0]"
          autofocus
        >
          <template v-slot:prepend>
            <q-icon name="settings_applications" />
          </template>
          <!-- client Name -->
        </q-select>
        <q-select
          color="light-blue-10 "
          outlined
          v-model="contract.client"
          :options="clients"
          :label="$t('clientName')"
          class="inputStyle"
        >
          <template v-slot:prepend>
            <q-icon name="fas fa-user" />
          </template>
        </q-select>
        <!--  start date & end date should be date picker -->
        <!-- <q-date v-model="date" calendar="persian" today-btn></q-date> -->
        <!-- <q-date v-model="date" minimal calendar="persian" /> -->
        <!-- start date -->
        <q-input
          outlined
          v-model="contract.startdate"
          mask="date"
          :rules="['date']"
          :label="$t('startDate')"
          @change="EnableDate"
          ref="qDateProxy"
          name="event"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date
                  v-model="contract.startdate"
                  @input="() => $refs.qDateProxy.hide()"
                  today-btn
                  calendar="persian"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <!-- end date -->
        <q-input
          outlined
          v-model="contract.enddate"
          mask="date"
          :rules="['date']"
          :label="$t('endDate')"
          :disable="!this.enableEndDate"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date
                  v-model="contract.enddate"
                  @input="() => $refs.qDateProxy.hide()"
                  today-btn
                  calendar="persian"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <!-- Duration -->
        <q-select
          color="light-blue-10 "
          outlined
          v-model="contract.duration"
          :options="contractDuration"
          :label="$t('duration')"
          class="inputStyle"
        >
          <template v-slot:prepend>
            <q-icon name />
          </template>
        </q-select>
        <!-- contract Number -->
        <q-input
          outlined
          required
          class="inputFieldText"
          color="light-blue-10"
          v-model="contract.number"
          :label="$t('ContractNum')"
          lazy-rules
          :rules="[val => val && val.length > 0]"
        >
          <template v-slot:prepend>
            <q-icon name />
          </template>
        </q-input>
        <!-- Amount -->
        <q-input
          outlined
          required
          class="inputFieldText"
          color="light-blue-10"
          v-model="contract.amount"
          :label="$t('amount')"
          lazy-rules
          :rules="[val => val && val.length > 0]"
        >
          <template v-slot:prepend>
            <q-icon name />
          </template>
        </q-input>
      </div>
      <div class="col2">
        <!-- status -->
        <q-select
          color="light-blue-10"
          outlined
          v-model="contract.status"
          :options="contractStatus"
          :label="$t('status')"
          class="inputStyle"
        >
          <template v-slot:prepend>
            <q-icon name="fas fa-exclamation-circle" />
          </template>
        </q-select>
        <!-- contract type -->
        <q-select
          color="light-blue-10 "
          outlined
          v-model="contract.type"
          :options="contractType"
          :label="$t('type')"
          class="inputStyle"
        >
          <template v-slot:append>
            <q-icon name />
          </template>
        </q-select>
        <!-- crrency -->
        <q-select
          color="light-blue-10 "
          outlined
          v-model="contract.currency"
          :options="contractCurrency"
          :label="$t('currency')"
        >
          <template v-slot:append>
            <q-icon name />
          </template>
        </q-select>
        <div class="pt20 w100">
          <uploadfile :showButton="false" ref="upload" :text="'attachments'" />
        </div>
      </div>
      <div class="saveInfo">
        <q-btn color="primary" type="submit">{{ $t('save') }}</q-btn>
      </div>
    </q-form>
  </div>
</template>

<script>
import uploadfile from '../structure/uploadfile.vue';

export default {
  name: 'addContractCmp',
  components: {
    uploadfile,
  },
  data() {
    return {
      servicesName: ['name1', 'name2', 'name3'],
      clients: ['client1', 'client2', 'client3'],
      contractDuration: ['monthly', 'yearly', 'season'],
      contractStatus: ['status1', 'status2', 'status3'],
      contractType: ['type1', 'type2', 'type3'],
      contractCurrency: ['currency1', 'currency2', 'currency3'],
      date: this.today,
      enddate: '1212112',
      contract: {
        serviceName: '',
        client: '',
        number: '',
        amount: '',
        status: '',
        type: '',
        currency: '',
        startdate: '',
        enddate: '',
      },
      enableEndDate: false,
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form);
      this.$refs.upload.submit_btn();
    },
    EnableDate() {
      this.enableEndDate = true;
    },
  },
  computed: {
    today() {
      return new Date();
    },
  },
};
</script>

<style lang="scss">
.addContractWrapper {
  padding: 12px;
}
</style>

<template>
  <div class="addContractWrapper col3th">
    <q-form @submit="onSubmit" class="q-gutter-md" :error="$v.contract.$error">
      <div class="col1">
        <!--  Service name -->
        <q-select
          color="light-blue-10 "
          outlined
          required
          autofocus
          v-model.trim="contract.serviceName"
          :options="servicesName"
          :label="$t('serviceName')"
          class="inputStyle"
          lazy-rules
          :rules="[val => val && val.length > 0]"
        >
          <template v-slot:prepend>
            <q-icon name="settings_applications" />
          </template>
          <!-- client Name -->
        </q-select>
        <q-select
          color="light-blue-10 "
          required
          outlined
          v-model.trim="contract.client"
          :options="clients"
          :label="$t('clientName')"
          class="inputStyle"
          lazy-rules
          :rules="[val => val && val.length > 0]"
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
          v-model.trim="contract.startdate"
          mask="date"
          :rules="['date']"
          :label="$t('startDate')"
          ref="qDateProxy"
          name="event"
          @blur="EnableDate"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model.trim="contract.startdate"
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
          v-model.trim.lazy="$v.contract.enddate.$model"
          mask="date"
          :rules="['date']"
          :label="$t('endDate')"
          :disable="!this.enableEndDate"
          @blur="$v.contract.enddate.$touch"
          :error="$v.contract.enddate.$error"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model.trim="contract.enddate"
                  @input="() => $refs.qDateProxy.hide()"
                  today-btn
                  calendar="persian"
                  :options="computeEnddate"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <p class="error ptb12" v-if="errors">
          <span v-if="!$v.contract.timeChecker">
            <q-icon name="warning" class="pr12 pt4" />
            {{ $t('DateUnvalid') }}
          </span>
        </p>
        <!-- Duration -->
        <q-select
          color="light-blue-10 "
          outlined
          v-model.trim="contract.duration"
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
          v-model.trim="contract.number"
          :label="$t('ContractNum')"
          lazy-rules
          mask="##########"
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
          v-model.trim="contract.amount"
          :label="$t('amount')"
          mask="#######################"
          lazy-rules
          :rules="[val => val && val.length > 0]"
        >
          <template v-slot:prepend>
            <q-icon name />
          </template>
        </q-input>
      </div>
      <div class="col2">
        <!-- tags -->
        <tagsSelection @addTagFn="addTagFn" />
        <!-- status -->
        <q-select
          color="light-blue-10"
          outlined
          v-model.trim="contract.status"
          :options="contractStatus"
          :label="$t('status')"
          class="inputStyle pt20"
          required
          :rules="[val => val && val.length > 0]"
        >
          <template v-slot:prepend>
            <q-icon name="fas fa-exclamation-circle" />
          </template>
        </q-select>
        <!-- contract type -->
        <q-select
          color="light-blue-10 "
          outlined
          v-model.trim="contract.type"
          :options="contractType"
          :label="$t('type')"
          class="inputStyle"
          required
          :rules="[val => val && val.length > 0]"
        >
          <template v-slot:append>
            <q-icon name />
          </template>
        </q-select>
        <!-- crrency -->
        <q-select
          color="light-blue-10 "
          outlined
          required
          v-model.trim="contract.currency"
          :options="contractCurrency"
          :label="$t('currency')"
          lazy-rules
          :rules="[val => val && val.length > 0]"
        >
          <template v-slot:append>
            <q-icon name />
          </template>
        </q-select>
        <div class="w100">
          <uploadfile
            :UploadButton="false"
            ref="upload"
            :text="'attachments'"
          />
        </div>
      </div>
      <div class="saveInfo">
        <q-btn color="primary" type="submit">{{ $t('save') }}</q-btn>
      </div>
    </q-form>
  </div>
</template>

<script>
// import { required } from 'vuelidate/lib/validators';

import uploadfile from '../structure/uploadfile.vue';
import tagsSelection from '../structure/tagsSelection.vue';

export default {
  name: 'addContractCmp',
  components: {
    uploadfile,
    tagsSelection,
  },
  data() {
    return {
      // data for validation
      uiState: 'submit not clicked',
      errors: false,
      empty: true,
      // data for validation
      servicesName: ['name1', 'name2', 'name3'],
      clients: ['client1', 'client2', 'client3'],
      contractDuration: [12, 13, 14],
      contractStatus: ['status1', 'status2', 'status3'],
      contractType: ['FORMAL', 'INFORMAL'],
      contractCurrency: ['RIAL', 'DOLLER', 'EURO'],
      date: this.today,
      enddate: '1212112',
      enableEndDate: false,
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
        tags: [],
      },
    };
  },
  validations: {
    contract: {
      timeChecker(value) {
        return (
          new Date(value.startdate).getTime() <
          new Date(value.enddate).getTime()
        );
      },
      enddate: {},
    },
  },
  methods: {
    addTagFn(value) {
      this.tags = value;
    },
    computeEnddate(enddate) {
      return enddate >= this.contract.startdate;
    },
    onSubmit() {
      this.empty = !this.$v.contract.$anyDirty;
      this.errors = this.$v.contract.$anyError;
      this.uiState = 'submit clicked';
      if (this.errors === false && this.empty === false) {
        console.log(this.contract);
        const standardStartDate = new Date(this.contract.startdate);
        const standardEndDate = new Date(this.contract.enddate);
        console.log(standardStartDate);
        console.log(standardEndDate);
        this.$refs.upload.submit_btn();
        // send data to server
        this.$axios
          .post('/v1/api/vkann/contracts', {
            service: this.contract.serviceName,
            tags: this.tags,
            type: this.contract.type,
            client: this.contract.client,
            startDate: standardStartDate,
            duration: 12,
            endDate: standardEndDate,
            amount: this.contract.amount,
            currency: this.contract.currency,
            attachments: 'string',
            status: this.contract.status,
            contractNumber: this.contract.number,
          })
          .then(response => {
            console.log(response);
          })
          .catch(e => {
            console.log(e.response.status);
          });
        // send data to server
      } else {
        this.$q.notify({
          message: this.$t('Theformabovehaserrors'),
          color: 'negative',
          icon: 'warning',
          position: 'top',
        });
      }
    },
    EnableDate() {
      if (this.contract.startdate.length > 0) {
        this.enableEndDate = true;
      }
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
.ptb12 {
  padding: 0px 12px;
}
</style>

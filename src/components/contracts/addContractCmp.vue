<template>
  <div class="addContractWrapper col3th">
    <q-form @submit="onSubmit" class="q-gutter-md" :error="$v.contract.$error">
      <div class="col1">
        <!--  Service name -->

        <singleAutoCompleteSelectBox
          :options="services"
          :optionLable="'name'"
          :optionValue="'id'"
          :name="'serviceName'"
          label="firstName"
          @getAutoCompleteValue="getAutoCompleteValueService"
        />

        <!-- client Name -->

        <singleAutoCompleteSelectBox
          :options="clients"
          :optionLable="'firstName'"
          :optionValue="'id'"
          :name="'clientName'"
          label="firstName"
          class="pt20"
          @getAutoCompleteValue="getAutoCompleteValueclient"
        />

        <!--  start date & end date should be date picker -->

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
          class="pt20"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
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
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
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
          <uploadfile :UploadButton="false" ref="upload" :text="'attachments'" />
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
import singleAutoCompleteSelectBox from '../structure/singleAutoCompleteSelectBox.vue';
import uploadfile from '../structure/uploadfile.vue';
import tagsSelection from '../structure/tagsSelection.vue';

export default {
  name: 'addContractCmp',
  components: {
    uploadfile,
    tagsSelection,
    singleAutoCompleteSelectBox,
  },
  data() {
    return {
      // data for validation
      uiState: 'submit not clicked',
      errors: false,
      empty: true,
      // data for validation
      services: [],
      clients: [],
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
    getAutoCompleteValueService(value) {
      this.contract.serviceName = value.id;
    },
    getAutoCompleteValueclient(value) {
      // console.log(value.id);
      this.contract.client = value.id;
    },

    addTagFn(value) {
      this.contract.tags = value.map(v => v.id);
    },
    computeEnddate(enddate) {
      return enddate >= this.contract.startdate;
    },
    onSubmit() {
      this.empty = !this.$v.contract.$anyDirty;
      this.errors = this.$v.contract.$anyError;
      this.uiState = 'submit clicked';
      if (this.errors === false && this.empty === false) {
        // console.log(this.contract);
        const standardStartDate = new Date(this.contract.startdate);
        const standardEndDate = new Date(this.contract.enddate);
        console.log(standardStartDate);
        console.log(standardEndDate);
        this.$refs.upload.submit_btn();
        // send data to server
        this.$axios
          .post('/v1/api/vkann/contracts', {
            service: this.contract.serviceName,
            tags: this.contract.tags,
            type: this.contract.type,
            client: this.contract.client,
            startDate: standardStartDate,
            duration: 12,
            endDate: standardEndDate,
            amount: this.contract.amount,
            currency: this.contract.currency,
            attachments: '5e1a30480000000000000000',
            status: this.contract.status,
            contractNumber: this.contract.number,
          })
          .then(response => {
            console.log(response);
            this.$q.notify({
              message: this.$t('newContractAdded'),
              color: 'positive',
              icon: 'check',
              position: 'top',
            });
            this.$router.push({
              path: `/${this.$route.params.locale}/billing/contracts`,
            });
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
  mounted() {
    this.$axios.get('/v1/api/vkann/services/get-services').then(res => {
      // console.log(res.data.services);
      this.services = res.data.services;
      this.servicesLable = this.services.map(v => v.name);
      this.servicesid = this.services.map(v => v.id);
    });
    this.$axios.get('/v1/api/vkann/users/get-clients').then(res => {
      this.clients = res.data.users;
      this.clientsLable = this.clients.map(v => v.firstName);
      this.clientsid = this.clients.map(v => v.id);
    });
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

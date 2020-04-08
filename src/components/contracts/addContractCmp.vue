<template>
  <div class="addContractWrapper col3th">
    <q-form @submit="onSubmit" class="q-gutter-md" :error="$v.contract.$error">
      <div class="col1">
        <servicesAutocomplete
          :editData="profileMode === 'Edit' ? serviceEdit : ''"
          :isRequired="true"
          @getAutoCompleteValue="getAutoCompleteValueService"
        />

        <clientsAutocomplete
          :editData="profileMode === 'Edit' ? clientEdit : ''"
          class="pt20"
          :isRequired="true"
          @getAutoCompleteValue="getAutoCompleteValueclient"
        />

        <q-input
          outlined
          v-model.trim="contract.startdate"
          mask="date"
          :rules="['date']"
          :label="$t('startDate')"
          name="event"
          @blur="EnableDate"
          class="pt20"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy1" transition-show="scale" transition-hide="scale">
                <q-date
                  v-model.trim="contract.startdate"
                  @input="() => $refs.qDateProxy1.hide()"
                  today-btn
                  calendar="persian"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

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
                  emit-immediately
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

        <div class="flex">
          <q-select
            color="light-blue-10 "
            outlined
            v-model.trim="contract.duration"
            :options="contractDuration"
            :label="$t('duration')"
            class="inputStyle w55"
            use-input
          >
            <template v-slot:prepend>
              <q-icon name />
            </template>
          </q-select>
          <span class="durationPriod">{{ $t('month') }}</span>
        </div>

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
        <tagsSelection :editData="profileMode === 'Edit' ? tagEdit : ''" @addTagFn="addTagFn" />

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
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
              <q-item-section>
                <q-item-label>{{ $t(scope.opt) }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>

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

        <q-select
          color="light-blue-10 "
          outlined
          v-model.trim="contract.currency"
          :options="contractCurrency"
          :label="$t('currency')"
          use-input
        >
          <template v-slot:append>
            <q-icon name />
          </template>
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
              <q-item-section>
                <q-item-label>{{ $t(scope.opt) }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <div class="w100 pt20">
          <uploadfile :UploadButton="false" ref="upload" :text="'attachments'" />
        </div>
      </div>
      <div class="col3 flex">
        <img src="../../assets/billing.png" />
      </div>
      <div class="saveInfo">
        <q-btn color="primary" type="submit">{{ $t('save') }}</q-btn>
      </div>
    </q-form>
  </div>
</template>

<script>
import servicesAutocomplete from '../structure/servicesAutocomplete.vue';
import clientsAutocomplete from '../structure/clientsAutocomplete.vue';

import uploadfile from '../structure/uploadfile.vue';
import tagsSelection from '../structure/tagsSelection.vue';

export default {
  name: 'addContractCmp',
  components: {
    uploadfile,
    tagsSelection,
    servicesAutocomplete,
    clientsAutocomplete,
  },
  props: ['profileMode'],

  data() {
    return {
      uiState: 'submit not clicked',
      errors: false,
      empty: true,
      contractDuration: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
      ],
      contractStatus: ['VALID', 'TERMINATED', 'EXPIRED'],
      contractType: ['FORMAL', 'INFORMAL'],
      contractCurrency: ['IRR', 'USD', 'EUR'],

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
      clientEdit: '',
      serviceEdit: '',
      tagEdit: '',
      duration: '',
    };
  },
  validations: {
    contract: {
      timeChecker(value) {
        return (
          new Date(value.startdate).getTime() <=
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
      console.log(value);
      this.contract.tags = value.map(v => v.id);
    },
    computeEnddate(enddate) {
      return enddate >= this.contract.startdate;
    },
    persionToGregorian(value) {
      const dateValue = value.split('/').map(i => parseInt(i, 10));
      return new this.$persianDate(dateValue).toDate().toISOString();
    },
    onSubmit() {
      this.empty = !this.$v.contract.$anyDirty;
      this.errors = this.$v.contract.$anyError;
      this.uiState = 'submit clicked';
      if (this.errors === false && this.empty === false) {
        const standardStartDate = this.persionToGregorian(
          this.contract.startdate
        );
        const standardEndDate = this.persionToGregorian(this.contract.enddate);
        this.$refs.upload.submit_btn();
        // send data to server
        if (this.profileMode === 'Add') {
          this.$axios
            .post('/v1/api/vkann/contracts', {
              service: this.contract.serviceName,
              tags: this.contract.tags,
              type: this.contract.type,
              client: this.contract.client,
              startDate: standardStartDate,
              duration: this.contract.duration,
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
        }
        if (this.profileMode === 'Edit') {
          this.$axios
            .put(`/v1/api/vkann/contracts/${this.$route.params.contractId}`, {
              service: this.contract.serviceName,
              tags: this.contract.tags,
              type: this.contract.type,
              client: this.contract.client,
              startDate: standardStartDate,
              duration: this.contract.duration,
              endDate: standardEndDate,
              amount: this.contract.amount,
              currency: this.contract.currency,
              attachments: '5e1a30480000000000000000',
              status: this.contract.status,
              contractNumber: this.contract.number,
            })
            .then(res => {
              console.log(res);
              if (res.status === 200) {
                this.$q.notify({
                  message: this.$t('contractEdited'),
                  color: 'positive',
                  icon: 'check',
                  position: 'top',
                });
                this.$emit('tabChanged', 'contractProfile');
              }
            });
        }
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
    gregorianTopersianString(value) {
      return new this.$persianDate(new Date(value))
        .toArray()
        .slice(0, 3)
        .map(i => (i < 10 ? `0${i}` : i))
        .join('');
    },
  },
  computed: {
    today() {
      return new Date();
    },
  },
  mounted() {
    if (this.profileMode === 'Edit') {
      this.$axios
        .get(`/v1/api/vkann/contracts/${this.$route.params.contractId}`)
        .then(res => {
          this.serviceEdit = res.data.contract.service;
          // eslint-disable-next-line no-underscore-dangle
          this.contract.serviceName = res.data.contract.service._id;
          this.clientEdit = res.data.contract.client;
          // eslint-disable-next-line no-underscore-dangle
          this.contract.client = res.data.contract.client._id;
          this.contract.type = res.data.contract.type;
          this.contract.duration = res.data.contract.duration;
          this.contract.amount = res.data.contract.amount;
          this.contract.status = res.data.contract.status;
          this.contract.number = res.data.contract.contractNumber;
          this.contract.currency = res.data.contract.currency;

          // for tags
          const serverItems = res.data.contract.tags.map(item => ({
            // eslint-disable-next-line no-underscore-dangle
            id: item._id,
            title: item.title,
          }));
          this.tagEdit = serverItems;
          this.contract.tags = serverItems.map(item => {
            // eslint-disable-next-line no-underscore-dangle
            return item.id;
          });
          this.contract.startdate = this.gregorianTopersianString(
            res.data.contract.startDate
          );
          this.contract.enddate = this.gregorianTopersianString(
            res.data.contract.endDate
          );
        });
    }
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
.durationPriod {
  min-width: 50px;
  align-self: center;
  font-size: 19px;
  padding-left: 24px;
}
</style>

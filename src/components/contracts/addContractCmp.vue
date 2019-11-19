<template >
  <div class="addContractWrapper col3th">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="col1">
        <!--  Service name -->
        <q-input
          outlined
          required
          color="light-blue-10"
          v-model="contract.serviceName"
          :label="$t('serviceName')"
          lazy-rules
          :rules="[val => val && val.length > 0]"
        >
          <template v-slot:prepend>
            <q-icon name="settings_applications" />
          </template>
        </q-input>
        <!-- client Name -->
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
        <q-input outlined v-model="startdate" mask="date" :rules="['date']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date
                  v-model="contract.startdate"
                  @input="() => $refs.qDateProxy.hide()"
                  calendar="persian"
                  today-btn
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <!-- end date -->
        <q-input outlined v-model="enddate" mask="date" :rules="['date']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date
                  v-model="contract.enddate"
                  @input="() => $refs.qDateProxy.hide()"
                  calendar="persian"
                  today-btn
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
      </div>
      <div class="saveInfo">
        <q-btn color="primary" type="submit">{{ $t('save') }}</q-btn>
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  name: 'addContractCmp',
  data() {
    return {
      clients: ['client1', 'client2', 'client3'],
      contractDuration: ['monthly', 'yearly', 'season'],
      contractStatus: ['status1', 'status2', 'status3'],
      contractType: ['type1', 'type2', 'type3'],
      contractCurrency: ['currency1', 'currency2', 'currency3'],
      startdate: '1212112',
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
    };
  },
  methods: {
    onSubmit() {
      console.log('edit service');
    },
  },
};
</script>

<style lang="scss">
.addContractWrapper {
  padding: 12px;
}
</style>

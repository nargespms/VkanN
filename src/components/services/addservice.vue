<template >
  <div class="col3th addServiceWrapper">
    <q-form @submit="onSubmit">
      <div class="col1">
        <!--  Service name -->
        <q-select
          outlined
          required
          color="light-blue-10 "
          v-model.trim="service.name"
          :options="servicesName"
          :label="$t('serviceName')"
          class="inputStyle"
          lazy-rules
          :rules="[ val => val && val.length > 0 ]"
          autofocus
        >
          <template v-slot:prepend>
            <q-icon name="settings_applications" />
          </template>
          <!-- <p v-if="errors" class="error">
            <span v-if="$v.service.name.required">*{{$t('thisfieldisrequired')}}.</span>
          </p>-->
        </q-select>
        <!-- service type -->
        <q-select
          color="light-blue-10 "
          outlined
          required
          v-model.trim="service.type"
          :options="serviceType"
          :label="$t('serviceType')"
          class="inputStyle"
        >
          <template v-slot:append>
            <q-icon name />
          </template>
        </q-select>
        <!-- employee name -->
        <q-select
          color="light-blue-10 "
          outlined
          v-model.trim="service.employee"
          :options="staff"
          :label="$t('employeeName')"
          class="inputStyle"
        >
          <template v-slot:prepend>
            <q-icon name="fas fa-user" />
          </template>
        </q-select>
        <!-- client name -->
        <q-select
          color="light-blue-10 "
          outlined
          required
          v-model.trim="service.client"
          :options="clients"
          :label="$t('clientName')"
          class="inputStyle"
        >
          <template v-slot:prepend>
            <q-icon name="fas fa-user" />
          </template>
        </q-select>
        <!-- primary Domain -->
        <q-input
          outlined
          class
          color="light-blue-10"
          v-model.trim="service.primaryDomain"
          :label="$t('primaryDomain')"
          lazy-rules
        >
          <template v-slot:prepend>
            <q-icon name />
          </template>
        </q-input>
        <!-- park Domain -->
        <q-input
          outlined
          class="inputFieldText inputStyle pt20"
          color="light-blue-10"
          v-model.trim="service.parkDomain"
          :label="$t('parkDomain')"
          lazy-rules
        >
          <template v-slot:prepend>
            <q-icon name />
          </template>
        </q-input>
      </div>
      <div class="col2">
        <!-- tags -->
        <tagsSelection @addTagFn="addTagFn" />

        <!-- voip -->
        <q-input
          outlined
          required
          class="pt20"
          color="light-blue-10"
          v-model.trim="service.voip"
          :label="$t('voipNumber')"
          lazy-rules
          :rules="[val => val && val.length > 0]"
          @input="$v.service.voip.$touch"
          :error="$v.service.voip.$error"
          mask="#####"
        >
          <template v-slot:prepend>
            <q-icon name="fas fa-tty" />
          </template>
          <p v-if="errors" class="error">
            <span v-if="!$v.service.voip.minLength">*{{$t('Fieldmusthaveatleast4characters')}}.</span>
          </p>
        </q-input>
        <!-- description -->
        <textarea
          rows="5"
          v-model="service.desc"
          :placeholder="$t('description')"
          class="w100 p8 description"
        ></textarea>
        <!-- billing status -->
        <q-select
          color="light-blue-10"
          outlined
          v-model.trim="service.bilingStatus"
          :options="bilingStatusService"
          :label="$t('bilingStatus')"
          class="inputStyle pt16"
        >
          <template v-slot:prepend>
            <q-icon name="attach_money" />
          </template>
        </q-select>
        <!-- status -->
        <q-select
          color="light-blue-10"
          outlined
          v-model.trim="service.status"
          :options="servicesStatus"
          :label="$t('status')"
          class="inputStyle"
        >
          <template v-slot:prepend>
            <q-icon name="fas fa-exclamation-circle" />
          </template>
        </q-select>
      </div>
      <div class="col3">
        <q-btn class="halfw generalBut" icon="system_update_alt" :label="$t('tickets')" />
        <q-btn class="halfw generalBut" icon="play_for_work" :label="$t('tasks')" />
        <q-btn class="halfw generalBut" icon="fas fa-handshake" :label="$t('contracts')" />
        <q-btn class="halfw generalBut" icon="fas fa-file-invoice" :label="$t('invoices')" />
        <div class="mr16 fullw mb16">
          <uploadfile :UploadButton="false" ref="upload" :text="'attachments'" />
        </div>
        <div class="fullw mb16">
          <uploadfile :UploadButton="false" ref="upload" :text="'avatar'" />
        </div>
      </div>
      <div class="saveInfo">
        <q-btn color="primary" type="submit">{{ $t('save') }}</q-btn>
      </div>
    </q-form>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';
import uploadfile from '../structure/uploadfile.vue';
import tagsSelection from '../structure/tagsSelection.vue';

export default {
  name: 'addservice',
  components: {
    uploadfile,
    tagsSelection,
  },
  data() {
    return {
      // data for validation
      uiState: 'submit not clicked',
      errors: true,
      empty: false,
      // end of data for validation
      servicesName: ['name1', 'name2', 'name3'],
      serviceType: ['type1', 'type2', 'type3'],
      servicesTag: ['tag1', 'tag2', 'tag3'],
      staff: ['employee1', 'employee2', 'employee3'],
      clients: ['clients1', 'clients2', 'clients3'],
      bilingStatusService: ['paid', 'unpaid', 'waiting'],
      servicesStatus: ['status1', 'status2', 'status3'],
      service: {
        name: '',
        type: '',
        primaryDomain: '',
        parkDomain: '',
        tag: '',
        employee: '',
        voip: '',
        desc: '',
        tags: [],
        client: '',
        bilingStatus: '',
        status: '',
      },
    };
  },
  validations: {
    service: {
      name: { required },
      voip: {
        minLength: minLength(4),
      },
    },
  },
  methods: {
    addTagFn(value) {
      this.service.tags = value;
    },

    onSubmit() {
      this.empty = !this.$v.service.$anyDirty;
      this.errors = this.$v.service.$anyError;
      this.uiState = 'submit clicked';
      if (this.errors === false && this.empty === false) {
        // this is where you send the responses
        this.uiState = 'form submitted';
        console.log('edit service');
        this.$refs.upload.submit_btn();
        this.$axios
          .post('/v1/api/vkann/services', {
            tags: ['string'],
            name: this.service.name,
            type: this.service.type,
            staff: this.service.employee,
            client: this.service.client,
            primaryDomain: this.service.primaryDomain,
            parkDomain: this.service.parkDomain,
            billingStatus: this.service.bilingStatus,
            status: this.service.status,
            voip: this.service.voip,
            attachments: '5e1a30480000000000000000',
          })
          .then(response => {
            console.log(response);
          })
          .catch(e => {
            console.log(e.response.status);
            if (e.response.status === 403) {
              this.$q.notify({
                message: this.$t('forbidenAccess'),
                color: 'negative',
                icon: 'warning',
                position: 'top',
              });
            }
          });
      } else if (this.empty === true) {
        this.$q.notify({
          message: this.$t('emptyForm'),
          color: 'negative',
          icon: 'warning',
          position: 'top',
        });
      } else {
        this.$q.notify({
          message: this.$t('Theformabovehaserrors'),
          color: 'negative',
          icon: 'warning',
          position: 'top',
        });
      }
    },
  },
};
</script>

<style lang="scss">
.addServiceWrapper {
  padding: 12px;
}
.description {
  resize: vertical;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
}
.generalBut {
  margin-bottom: 20px;
  padding: 15px;
  margin-right: 16px;
  background-color: #ddd;
  @media screen and (max-width: 360px) {
    width: calc(100% - 16px) !important;
  }
}
</style>

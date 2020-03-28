<template>
  <div class="col3th addServiceWrapper">
    <q-form @submit="onSubmit">
      <div class="col1">
        <!--  Service name -->
        <q-input
          outlined
          required
          color="light-blue-10 "
          v-model.trim="service.name"
          :label="$t('serviceName')"
          class="inputStyle"
          lazy-rules
          :rules="[val => val && val.length > 0]"
          autofocus
        >
          <template v-slot:prepend>
            <q-icon name="settings_applications" />
          </template>
        </q-input>
        <clientsAutocomplete
          :editData="profileMode === 'Edit' ? clientEdit : ''"
          :isRequired="true"
          @getAutoCompleteValue="getAutoCompleteValueclient"
        />
        <!-- employee name -->

        <!-- primary Domain -->
        <q-input
          outlined
          class="pt20"
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
        <!-- <div class="clear" v-if="profileMode === 'Edit'">
          <q-btn class="halfw generalBut" icon="system_update_alt" :label="$t('tickets')" />
          <q-btn class="halfw generalBut" icon="play_for_work" :label="$t('tasks')" />
          <q-btn class="halfw generalBut" icon="fas fa-handshake" :label="$t('contracts')" />
          <q-btn class="halfw generalBut" icon="fas fa-file-invoice" :label="$t('invoices')" />
        </div>-->
        <div class="clear">
          <img src="../../assets/customer-service.png" class="servicPic" />
        </div>
      </div>
      <div class="col2">
        <!-- tags -->
        <tagsSelection :editData="profileMode === 'Edit' ? tagEdit : ''" @addTagFn="addTagFn" />

        <!-- voip -->
        <q-input
          outlined
          class="pt20 pb20"
          color="light-blue-10"
          v-model.trim="service.voip"
          :label="$t('voipNumber')"
          lazy-rules
          mask="#####"
        >
          <template v-slot:prepend>
            <q-icon name="fas fa-tty" />
          </template>
        </q-input>
        <!-- description -->
        <textarea
          rows="5"
          v-model="service.description"
          :placeholder="$t('description')"
          class="w100 p8 description"
        ></textarea>
        <!-- billing status -->
        <q-select
          color="light-blue-10"
          outlined
          required
          lazy-rules
          :rules="[val => val && val.length > 0]"
          v-model.trim="service.billingStatus"
          :options="billingStatusService"
          :label="$t('billingStatus')"
          class="inputStyle pt16"
        >
          <template v-slot:prepend>
            <q-icon name="attach_money" />
          </template>
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
              <q-item-section>
                <q-item-label>{{ $t(scope.opt) }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <!-- status -->
        <q-select
          color="light-blue-10"
          outlined
          required
          lazy-rules
          :rules="[val => val && val.length > 0]"
          v-model.trim="service.status"
          :options="servicesStatus"
          :label="$t('status')"
          class="inputStyle"
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
      </div>
      <div class="col3">
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
import { required } from 'vuelidate/lib/validators';
import uploadfile from '../structure/uploadfile.vue';
import tagsSelection from '../structure/tagsSelection.vue';
import clientsAutocomplete from '../structure/clientsAutocomplete.vue';

export default {
  name: 'addservice',
  props: ['profileMode'],
  components: {
    uploadfile,
    tagsSelection,
    clientsAutocomplete,
  },
  data() {
    return {
      // data for validation
      uiState: 'submit not clicked',
      errors: true,
      empty: true,
      // end of data for validation
      servicesName: ['name1', 'name2', 'name3'],
      servicesTag: ['tag1', 'tag2', 'tag3'],
      billingStatusService: ['PAID', 'UNPAID', 'BLOCK'],
      servicesStatus: ['WIP', 'LAUNCHED', 'SUPPORT', 'DEACTIVE'],
      service: {
        name: '',
        primaryDomain: '',
        parkDomain: '',
        tag: '',
        employee: '',
        voip: '',
        description: '',
        tags: [],
        client: '',
        billingStatus: '',
        status: '',
      },
      clientEdit: '',
      tagEdit: '',
    };
  },
  validations: {
    service: {
      name: { required },
    },
  },
  methods: {
    getAutoCompleteValueclient(value) {
      this.service.client = value.id;
    },
    addTagFn(value) {
      this.service.tags = value.map(v => v.id);
    },

    onSubmit() {
      this.empty = this.$v.service.$anyDirty;
      this.errors = this.$v.service.$anyError;
      this.uiState = 'submit clicked';
      console.log(this.errors);
      console.log(this.empty);

      if (this.errors === false && this.empty === false) {
        // this is where you send the responses
        this.uiState = 'form submitted';
        console.log('edit service');
        this.$refs.upload.submit_btn();
        if (this.profileMode === 'Add') {
          this.$axios
            .post('/v1/api/vkann/services', {
              tags: this.service.tags,
              name: this.service.name,
              // staff: this.service.employee,
              client: this.service.client,
              primaryDomain: this.service.primaryDomain,
              parkDomain: this.service.parkDomain,
              billingStatus: this.service.billingStatus,
              status: this.service.status,
              voip: this.service.voip,
              description: this.service.description,
              attachments: '5e1a30480000000000000000',
            })
            .then(response => {
              console.log(response);
              if (response.status === 200) {
                this.$q.notify({
                  message: this.$t('newServiceAdded'),
                  color: 'positive',
                  icon: 'check',
                  position: 'top',
                });
                this.$router.push({
                  path: `/${this.$route.params.locale}/services/servicesList`,
                });
              }
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
        }
        if (this.profileMode === 'Edit') {
          this.$axios
            .put(`/v1/api/vkann/services/${this.$route.params.serviceId}`, {
              tags: this.service.tags,
              name: this.service.name,
              // eslint-disable-next-line no-underscore-dangle
              client: this.service.client._id,
              primaryDomain: this.service.primaryDomain,
              parkDomain: this.service.parkDomain,
              billingStatus: this.service.billingStatus,
              status: this.service.status,
              VOIP: this.service.voip,
              description: this.service.description,
              // attachments: '5e1a30480000000000000000',
            })
            .then(res => {
              console.log(res);
              if (res.status === 200) {
                this.$q.notify({
                  message: this.$t('serviceEdited'),
                  color: 'positive',
                  icon: 'check',
                  position: 'top',
                });
                this.$emit('tabChanged', 'serviceProfile');
              }
            });
        }
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
  mounted() {
    if (this.profileMode === 'Edit') {
      this.$axios
        .get(`/v1/api/vkann/services/${this.$route.params.serviceId}`)
        .then(res => {
          this.service.name = res.data.service.name;
          this.service.primaryDomain = res.data.service.primaryDomain;
          this.service.parkDomain = res.data.service.parkDomain;
          // this.service.employee = res.data.staff;
          this.service.voip = res.data.service.VOIP;
          this.service.description = res.data.service.description;
          this.service.client = res.data.service.client;
          this.service.billingStatus = res.data.service.billingStatus;
          this.service.status = res.data.service.status;
          this.service.client = res.data.service.client;
          // eslint-disable-next-line no-underscore-dangle
          this.service.tags = res.data.service.tags._id;
          this.tagEdit = res.data.service.tags;
          this.clientEdit = this.service.client;
          // for tags
          const serverItems = res.data.service.tags.map(item => ({
            // eslint-disable-next-line no-underscore-dangle
            id: item._id,
            title: item.title,
          }));
          this.tagEdit = serverItems;
          this.service.tags = serverItems.map(item => {
            // eslint-disable-next-line no-underscore-dangle
            return item.id;
          });
        })
        .catch(e => {
          if (e.response.status === 422) {
            this.$q.notify({
              message: this.$t('serviceUnvalid'),
              color: 'negative',
              icon: 'warning',
              position: 'top',
            });
          }
        });
    }
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
.servicPic {
  width: 33%;
  margin: auto;
  display: flex;
}
</style>

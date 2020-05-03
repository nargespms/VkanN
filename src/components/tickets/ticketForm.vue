<template>
  <div class="ticketFormWrap">
    <div class="ticketForm">
      <form>
        <q-input
          autofocus
          outlined
          required
          class="ticketTitle"
          :label="$t('ticketTitle')"
          v-model.trim="ticket.title"
          lazy-rules
          :rules="[val => val && val.length > 0]"
          :error="$v.ticket.title.$error"
          @input="$v.ticket.title.$touch"
        >
          <p v-if="errors" class="error">
            <span v-if="!$v.ticket.title.required">*{{ $t('thisfieldisrequired') }}.</span>
          </p>
        </q-input>
        <div class="clear">
          <q-select
            outlined
            :label="$t('departman')"
            v-model.trim="ticket.departamn"
            :options="departmans"
            class="ticketInfoRecieve pr24"
            @input="setDepUrl"
          >
            <template v-slot:prepend>
              <q-icon name="far fa-building" />
            </template>
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                <q-item-section>
                  <q-item-label>{{ $t(scope.opt) }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:selected-item="scope">{{ $t(scope.opt) }}</template>
          </q-select>

          <q-select
            outlined
            :label="$t('priority')"
            v-model.trim="ticket.priority"
            :options="priorities"
            class="ticketInfoRecieve pr24"
          >
            <template v-slot:prepend>
              <q-icon name="fas fa-sort-amount-up" />
            </template>
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                <q-item-section>
                  <q-item-label>{{ $t(scope.opt) }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:selected-item="scope">{{ $t(scope.opt) }}</template>
          </q-select>

          <servicesAutocomplete
            :isRequired="true"
            @getAutoCompleteValue="getAutoCompleteValueService"
          />
        </div>

        <div class="editorWrap pt20">
          <editor @getTextFromEditor="getTextFromEditor" />
        </div>

        <div class="attachments mb16">
          <span class="attachHeader">
            <q-icon name="fas fa-paperclip" />
            {{ $t('attachments') }}
          </span>

          <uploadfile />
        </div>
        <q-btn class="uploadTicket" color="primary" type="submit" @click.prevent="submitTicket">
          <q-icon name="fas fa-paper-plane " />
          {{ $t('send') }}
        </q-btn>
      </form>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import servicesAutocomplete from '../structure/servicesAutocomplete.vue';

import editor from '../structure/editor.vue';
import uploadfile from '../structure/uploadfile.vue';

export default {
  name: 'ticketForm',
  props: ['choosedDep', 'choosedService'],
  components: {
    editor,
    uploadfile,
    servicesAutocomplete,
  },
  data() {
    return {
      errors: false,
      empty: true,
      editorFill: false,
      serviceSelected: false,
      departmentSelected: false,
      departmans: ['INFO', 'TECH', 'BILLING'],
      priorities: ['LOW', 'NORMAL', 'CRITICAL'],
      ticket: {
        title: '',
        departamn: this.choosedDep,
        priority: 'LOW',
        serviceName: '',
        thread: {
          description: '',
        },
      },
    };
  },
  validations: {
    ticket: {
      title: {
        required,
      },
    },
  },
  methods: {
    getTextFromEditor(value) {
      this.ticket.thread.description = value;
      this.editorFill = true;
      console.log(value);
      console.log(this.editorFill);
    },
    getAutoCompleteValueService(value) {
      this.ticket.serviceName = value.id;
      this.serviceSelected = true;
    },

    setDepUrl() {
      console.log(this.ticket.departamn);
      this.$router.push({
        query: {
          depid: this.ticket.departamn,
          serviceName: this.ticket.serviceName,
          customerName: this.ticket.customerName,
        },
      });
      this.departmentSelected = true;
    },
    setServiceUrl() {
      console.log(this.ticket.serviceName);
      this.$router.push({
        query: {
          depid: this.ticket.departamn,
          serviceName: this.ticket.serviceName,
          customerName: this.ticket.customerName,
        },
      });
    },
    setClient() {
      console.log(this.ticket.customerName);
      this.$router.push({
        query: {
          depid: this.ticket.departamn,
          serviceName: this.ticket.serviceName,
          customerName: this.ticket.customerName,
        },
      });
    },

    submitTicket() {
      this.empty = !this.$v.ticket.$anyDirty;
      this.errors = this.$v.ticket.$anyError;
      console.log(this.errors);
      if (this.errors === false && this.empty === false) {
        console.log(`edit:${this.editorFill}`);
        if (this.ticket.departamn.length > 0) {
          this.departmentSelected = true;
        }
        if (this.departmentSelected) {
          if (this.serviceSelected) {
            if (this.editorFill) {
              this.$axios
                .post('/v1/api/vkann/tickets', {
                  serviceId: this.ticket.serviceName,
                  department: this.ticket.departamn,
                  priority: this.ticket.priority,
                  title: this.ticket.title,
                  thread: this.ticket.thread,
                })
                .then(response => {
                  console.log(response);
                  this.$q.notify({
                    message: this.$t('newTicketAdded'),
                    color: 'positive',
                    icon: 'check',
                    position: 'top',
                  });

                  this.$router.push({
                    path: `/${this.$route.params.locale}/tickets/ticketsList`,
                  });
                })
                .catch(e => {
                  if (e.response.status === 400) {
                    this.$q.notify({
                      message: this.$t('fillTheTicketTextArea'),
                      color: 'negative',
                      icon: 'warning',
                      position: 'top',
                    });
                  }
                  if (e.response.status === 422) {
                    this.$q.notify({
                      message: this.$t('Theformabovehaserrors'),
                      color: 'negative',
                      icon: 'warning',
                      position: 'top',
                    });
                  }
                  if (e.response.status === 403) {
                    this.$q.notify({
                      message: this.$t('youDonthaveAccess'),
                      color: 'negative',
                      icon: 'warning',
                      position: 'top',
                    });
                  }

                  console.log(e.response.status);
                });
            } else {
              this.$q.notify({
                message: this.$t('pleaseFillTicketText'),
                color: 'negative',
                icon: 'warning',
                position: 'top',
              });
            }
          } else {
            this.$q.notify({
              message: this.$t('pleaseSelectServiceName'),
              color: 'negative',
              icon: 'warning',
              position: 'top',
            });
          }
        } else {
          this.$q.notify({
            message: this.$t('pleaseSelectdepartment'),
            color: 'negative',
            icon: 'warning',
            position: 'top',
          });
        }
      } else if (this.empty === true) {
        this.$q.notify({
          message: this.$t('emptyForm'),
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
.ticketForm {
  background-color: #fff;
  border: 2px solid #d7d7d7;
  padding: 12px;
  width: 75%;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
  margin: 24px auto;
  .ticketInfoRecieve {
    display: block;
    float: left;
    @media screen and (min-width: 800px) {
      width: calc(100% / 3 - 16px) !important;
    }
    @media screen and (max-width: 799px) {
      width: calc(100% - 16px) !important;
      padding: 0;
      margin: 12px auto;
      float: none;
    }
  }
  .ticketTitle {
    width: 100%;
  }
  .ticketDep {
    width: calc(100% / 2 - 32px);
  }
}
.ticketCaptchaWrap {
  width: 55%;
  margin: auto;
}
</style>

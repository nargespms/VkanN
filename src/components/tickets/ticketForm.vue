<template >
  <div class="ticketFormWrap">
    <div class="ticketForm">
      <form>
        <q-input
          autofocus
          filled
          required
          class="ticketTitle"
          :label="$t('ticketTitle')"
          v-model.trim="ticket.title"
          lazy-rules
          :rules="[ val => val && val.length > 0 ]"
          :error="$v.ticket.title.$error"
          @input="$v.ticket.title.$touch"
        >
          <p v-if="errors" class="error">
            <span v-if="!$v.ticket.title.required">*{{$t('thisfieldisrequired')}}.</span>
          </p>
        </q-input>
        <div class="clear">
          <!-- choose departman for ticet -->
          <q-select
            filled
            :label="$t('departman')"
            v-model.trim="ticket.departamn"
            :options="departmans"
            class="ticketInfoRecieve pr24"
            @input="setDepUrl"
          >
            <template v-slot:prepend>
              <q-icon name="far fa-building" />
            </template>
          </q-select>
          <!-- choose priority -->
          <q-select
            filled
            :label="$t('status')"
            v-model.trim="ticket.priority"
            :options="priorities"
            class="ticketInfoRecieve pr24"
          >
            <template v-slot:prepend>
              <q-icon name="fas fa-sort-amount-up" />
            </template>
          </q-select>
          <!-- choose service Name -->
          <q-select
            filled
            class="ticketInfoRecieve pr24"
            v-model.trim="ticket.serviceName"
            :options="FilterOption"
            :label="$t('serviceName')"
            required
            lazy-rules
            :rules="[ val => val && val.length > 0 ]"
            @filter="filterFn"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            @input="setServiceUrl"
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
        <div class="editorWrap">
          <editor />
        </div>
        <div class="attachments">
          <span class="attachHeader">
            <q-icon name="fas fa-paperclip" />
            {{$t('attachments')}}
          </span>

          <uploadfile />
          <div class="ticketCaptchaWrap">
            <captcha @captchaValid="captchaValid" />
          </div>
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

import editor from '../structure/editor.vue';
import uploadfile from '../structure/uploadfile.vue';
import captcha from '../structure/captcha.vue';

export default {
  name: 'ticketForm',
  props: ['choosedDep', 'choosedService'],
  components: {
    editor,
    uploadfile,
    captcha,
  },
  data() {
    return {
      // data for validation
      uiState: 'submit not clicked',
      errors: false,
      empty: true,
      // end of data for validation
      //  for captcha checking
      captcha: false,

      FilterOption: this.servicesName,
      FilterOption2: this.customerName,
      servicesName: ['service1', 'service2', 'service3', 'الکسا', 'رکنا'],
      customerName: ['customer1', 'customer2', 'customer3', 'ابراهیمی'],
      departmans: [
        this.$t('billing'),
        this.$t('support'),
        this.$t('information'),
      ],
      priorities: [
        this.$t('emergency'),
        this.$t('middle'),
        this.$t('take your time'),
      ],
      ticket: {
        title: '',
        departamn: this.choosedDep,
        priority: '',
        serviceName: this.choosedService,
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
    setDepUrl() {
      console.log(this.ticket.departamn);
      this.$router.push({
        query: {
          depid: this.ticket.departamn,
          serviceName: this.ticket.serviceName,
          customerName: this.ticket.customerName,
        },
      });
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
    captchaValid() {
      this.captcha = true;
    },
    submitTicket() {
      this.empty = !this.$v.ticket.$anyDirty;
      this.errors = this.$v.ticket.$anyError;
      this.uiState = 'submit clicked';
      console.log(this.errors);
      console.log(this.empty);
      if (this.errors === false && this.empty === false) {
        if (this.captcha === false) {
          this.$q.notify({
            message: this.$t('incorrectcaptcha'),
            color: 'negative',
            icon: 'warning',
            position: 'top',
          });
        } else {
          console.log('submit clicked');
          this.$router.push({
            path: `/${this.$route.params.locale}/tickets/ticketsList`,
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
    // for auto compelete
    filterFn(val, update) {
      // call abort() at any time if you can't retrieve data somehow
      setTimeout(() => {
        update(() => {
          if (val === '') {
            this.FilterOption = this.servicesName;
          } else {
            const needle = val.toLowerCase();
            this.FilterOption = this.servicesName.filter(
              v => v.toLowerCase().indexOf(needle) > -1
            );
          }
        });
      }, 500);
    },
    //  customer auto compelete
    filterFn2(val, update) {
      // call abort() at any time if you can't retrieve data somehow
      setTimeout(() => {
        update(() => {
          if (val === '') {
            this.FilterOption2 = this.customerName;
          } else {
            const needle = val.toLowerCase();
            this.FilterOption2 = this.customerName.filter(
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
    width: calc(100% / 3 - 16px) !important;
    float: left;
    padding-top: 20px;
    @media screen and (max-width: 800px) {
      width: calc(100% / 2 - 16px) !important;
    }
    @media screen and (max-width: 480px) {
      width: calc(100% - 16px) !important;
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

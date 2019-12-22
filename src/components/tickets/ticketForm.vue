<template >
  <div class="ticketFormWrap">
    <div class="ticketForm">
      <form>
        <q-input
          autofocus
          filled
          class="ticketTitle"
          :label="$t('ticketTitle')"
          v-model.trim="ticket.title"
          required
          lazy-rules
          :rules="[ val => val && val.length > 0 ]"
        />
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
          <!-- choose customer select(only for staff member) -->
          <q-select
            filled
            class="ticketInfoRecieve"
            v-model.trim="ticket.customerName"
            :options="FilterOption2"
            :label="$t('clientName')"
            required
            lazy-rules
            :rules="[ val => val && val.length > 0 ]"
            @filter="filterFn2"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            @input="setClient"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
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

          <uploadfile :addMoreButton="true" />
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
import editor from '../structure/editor.vue';
import uploadfile from '../structure/uploadfile.vue';
import captcha from '../structure/captcha.vue';

export default {
  name: 'ticketForm',
  props: ['choosedDep', 'choosedClient'],
  components: {
    editor,
    uploadfile,
    captcha,
  },
  data() {
    return {
      //  for captcha checking
      captcha: false,

      FilterOption: this.servicesName,
      FilterOption2: this.servicesName,
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
        serviceName: '',
        customerName: this.choosedClient,
      },
    };
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
    width: calc(100% / 4 - 24px) !important;
    float: left;
    padding-top: 20px;
    @media screen and (max-width: 800px) {
      width: calc(100% / 2 - 24px) !important;
    }
    @media screen and (max-width: 480px) {
      width: calc(100% - 24px) !important;
      float: none;
    }
  }
  .ticketTitle {
    width: 100%;
  }
  .ticketDep {
    width: calc(100% / 2 - 32px);
  }
  .attachments {
    overflow: auto;
    .fileUploadWrapper {
      width: 70%;
      float: left;
    }
    .fileUploadWrapper input[type='file'] {
      height: 60px;
    }
    .fileUploadPlace .fileUploadPlaceInner .emptyFile {
      padding-top: 16px;
    }
    .attachHeader {
      width: 100%;
      display: block;
      background-color: #dedede;
      padding: 2px 12px;
      margin-bottom: 12px;
      color: #515151;
      font-size: 17px;
    }
    .addMoreBut {
      width: 25%;
      background-color: #455a64 !important;
    }
    .fileUploadPlace .fileUploadPlaceInner .uploadedFile {
      font-size: 30px;
      padding-top: 0;
    }
  }
}
.ticketCaptchaWrap {
  width: 55%;
  margin: auto;
}
.uploadTicket {
  width: 400px;
  display: block;
  margin: auto;
  i {
    padding-right: 12px;
    font-size: 13px;
  }
}
</style>

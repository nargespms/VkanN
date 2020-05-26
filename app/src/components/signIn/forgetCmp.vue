<template >
  <div class="forgetWrapper">
    <q-form @submit="onSubmit" class="q-gutter-md mt78">
      <div v-if="enterMobile">
        <!-- step one entering phone number -->
        <!-- Phone Number -->
        <mobilePhoneWrapper @mobileVerified="mobileVerified" :existed="true" />

        <q-btn class="RetrivePass" :label="$t('RetrivePass')" color="primary" @click="onSubmit" />
        <!-- step one entering phone number -->
      </div>
      <!-- step two  entering code  -->
      <div v-if="entercode">
        <span class="retrivedMessage">{{$t('retrivedMessage')}}</span>
        <q-input
          required
          filled
          v-model.trim="$v.retrivedCode.$model"
          class="otpInput"
          mask="####"
          :error="$v.retrivedCode.$error"
          @input="$v.retrivedCode.$touch"
        >
          <template v-slot:prepend>
            <q-icon name />
          </template>
          <p v-if="errors" class="error">
            <span v-if="!$v.retrivedCode.minLength">*{{$t('Fieldmusthaveatleast4characters')}}.</span>
            <span v-if="!$v.retrivedCode.required">*{{$t('thisfieldisrequired')}}.</span>
            <span v-if="!$v.retrivedCode.isUnique">*{{$t('invalidCode')}}.</span>
          </p>
        </q-input>
        <captcha @captchaValid="captchaValid" />
        <span class="resendPass" @click="resendPass">{{$t('resendPass')}}</span>
        <q-btn
          class="enterFromForgetpas"
          :label="$t('enter')"
          color="primary"
          @click="enterFromForgetpas"
        />
      </div>
      <!-- step two  entering code  -->
    </q-form>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';
import mobilePhoneWrapper from '../structure/mobilePhoneWrapper.vue';
import captcha from '../structure/captcha.vue';

export default {
  components: {
    mobilePhoneWrapper,
    captcha,
  },
  data() {
    return {
      // data for validation
      uiState: 'submit not clicked',
      errors: false,
      empty: true,
      // end of data for validation
      MobileNumber: '',
      enterMobile: true,
      entercode: false,
      retrivedCode: '',
      country: '',
      //  for captcha checking
      captcha: false,
    };
  },
  validations: {
    retrivedCode: {
      required,
      minLength: minLength(4),
      isUnique(value) {
        // standalone validator ideally should not assume a field is required
        // if (value === '') return true;

        // simulate async call, fail for all logins with even length
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(typeof value === 'string' && value !== '0000');
          }, 350 + Math.random() * 300);
        });
      },
    },
  },
  methods: {
    mobileVerified(value, con) {
      this.country = con;
      this.MobileNumber = value;
      console.log('value mobile');
    },
    captchaValid() {
      this.captcha = true;
    },
    onSubmit() {
      if (this.MobileNumber.length !== 0) {
        // console.log('retrive pass request');
        this.enterMobile = false;
        this.entercode = true;
      } else {
        this.$q.dialog({
          title: 'لطفا شماره تلفن همراه خود را وارد نمایید',
        });
      }
    },
    resendPass() {
      // request for new code
    },
    enterFromForgetpas() {
      this.empty = !this.$v.retrivedCode.$anyDirty;
      this.errors = this.$v.retrivedCode.$anyError;
      this.uiState = 'submit clicked';
      if (this.errors === false && this.empty === false) {
        if (this.captcha === false) {
          this.$q.notify({
            message: this.$t('incorrectcaptcha'),
            color: 'negative',
            icon: 'warning',
            position: 'top',
          });
        } else {
          this.entercode = false;
          this.$axios
            .post('/v1/api/vkann/forgot-password', {
              mobile: this.MobileNumber,
              verifyCode: this.retrivedCode,
            })
            .then(res => {
              console.log(res);
              if (res.status === 200) {
                this.$store.commit('module1/userDataFromServer', res.data, {
                  module: 'module1',
                });
                this.$store.commit('module1/logedInSuccesfully', true, {
                  module: 'module1',
                });

                this.showNotif('top-right');
              }
            })
            .catch(e => {
              if (e.response.status === 404) {
                this.entercode = true;
                this.$q.notify({
                  message: this.$t('notAllowed'),
                  color: 'negative',
                  icon: 'warning',
                  position: 'top',
                });
              }
            });

          // console.log('Submit Form');
        }
      } else if (this.empty === true) {
        this.$q.dialog({
          title: this.$t('OtpIsNotEntered'),
        });
      } else {
        console.log(this.errors);
        console.log(this.empty);
        this.$q.notify({
          message: this.$t('Theformabovehaserrors'),
          color: 'negative',
          icon: 'warning',
          position: 'top',
        });
      }
    },
    showNotif(position) {
      this.$q.notify({
        color: 'dark',
        icon: 'verified_user',
        // user name should be the user name that server gives us to recognize
        message: `Welcome ${this.UserName}!`,
        position,
        timeout: Math.random() * 5000 + 3000,
      });
      this.$router.push({ path: `/${this.$route.params.locale}/dashboard` });
    },
  },
};
</script>

<style lang="scss">
.forgetWrapper {
  width: 80%;
  margin: auto;
}
.RetrivePass {
  display: block;
  margin: 36px auto;
}
.retrivedMessage {
  display: block;
  text-align: center;
  margin-bottom: 18px;
}
.resendPass {
  cursor: pointer;
  color: $primary;
  float: right;
}
.enterFromForgetpas {
  display: block;
  margin: 78px auto;
}
</style>

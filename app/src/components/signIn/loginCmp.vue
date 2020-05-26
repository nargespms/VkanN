<template>
  <div class="loginWrapperCmp">
    <q-form @submit="onSubmit" class="q-gutter-md loginForm">
      <!-- step one -->
      <div v-if="EnableFirstLevel">
        <q-input
          outlined
          class="inputFieldText firstStepLogin"
          color="light-blue-10"
          v-model.trim="form.UserName"
          :label="$t('EmailorPhoneNumber')"
          debounce="3000"
          @blur="$v.form.UserName.$touch"
          :error="$v.form.UserName.$error"
          lazy-rules
          autofocus
          ref="formUsername"
        >
          <template v-slot:prepend>
            <q-icon name="fas fa-user" />
          </template>
          <p v-if="errors" class="error">
            <span v-if="!$v.form.UserName.required">*{{ $t('thisfieldisrequired') }}.</span>
            <span v-if="!$v.form.UserName.isUnique">*{{ $t('Thisemailisalreadyregistered') }}.</span>
          </p>
        </q-input>
        <!-- choosing how to verify acoount -->
        <q-select
          color="light-blue-10"
          outlined
          v-model.trim="form.method"
          :options="methodOptions"
          :label="$t('chooseYourMethodToLogin')"
        >
          <template v-slot:append>
            <q-icon name />
          </template>
          <template v-slot:selected-item="scope">{{ $t(scope.opt) }}</template>
        </q-select>
        <router-link class="forgetUser" to="/">
          <span @click="goToForget">{{ $t('forgotEmail') }} {{ $t('questionmark') }}</span>
        </router-link>
        <div class="clear mt78">
          <q-btn
            class="continueToNextLevel"
            :label="$t('next')"
            color="primary"
            @click="userNameVerify"
          />
          <router-link to="/" class="creatNewAcc">
            <span @click="goToSignUp">{{ $t('newaccount') }}</span>
          </router-link>
        </div>
      </div>
      <!-- step one -->
      <!-- step two if password choosed -->
      <div v-if="EnableSecondLevel">
        <span class="userName" @click="backToStepOne">{{ form.UserName }}</span>
        <q-input
          outlined
          class="inputFieldText passwordField"
          color="light-blue-10"
          :label="$t('EnterYourPassword')"
          v-model.trim="form.password"
          :type="isPwd ? 'password' : 'text'"
          lazy-rules
        >
          <template v-slot:prepend>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer visibilityPass"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <captcha @captchaValid="captchaValid" :key="componentKey" />
        <div class="clear mt78">
          <q-btn
            class="continueToNextLevel"
            :label="$t('enter')"
            color="primary"
            @click="stepTwoComplete"
          />
          <router-link to="/" class="creatNewAcc">
            <span @click="goToForget">{{ $t('forgetpassword') }}</span>
          </router-link>
        </div>
      </div>
      <!-- step two if password chose -->
      <!-- step two if OTP chosed -->
      <div v-if="EnableOtpLevel">
        <span class="userName" @click="backToStepOne">{{ form.UserName }}</span>
        <span>{{ $t('otpMessage') }}</span>
        <q-input
          filled
          v-model.trim="form.otp"
          class="otpInput"
          mask="####"
          :error="$v.form.otp.$error"
          @input="$v.form.otp.$touch"
          autofocus
        >
          <template v-slot:prepend>
            <q-icon name />
          </template>
          <p v-if="errors" class="error">
            <span v-if="!$v.form.otp.minLength">{{ $t('Fieldmusthaveatleast4characters') }}</span>
            <span v-if="!$v.form.otp.isUnique">{{ $t('invalidCode') }}</span>
          </p>
        </q-input>
        <captcha @captchaValid="captchaValid" />
        <div class="clear mt78">
          <q-btn
            class="continueToNextLevel"
            :label="$t('enter')"
            color="primary"
            @click="otpStepComplete"
          />
          <span class="resendOtp">{{ $t('resendOtp') }}</span>
        </div>
      </div>
      <!-- step two if OTP chosed -->
    </q-form>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';
import captcha from '../structure/captcha.vue';

export default {
  components: {
    captcha,
  },
  data() {
    return {
      componentKey: 0,
      // data for validation
      uiState: 'submit not clicked',
      errors: false,
      empty: true,
      // data for validation
      form: {
        UserName: '',
        password: '',
        method: 'password',
        otp: '',
      },
      isPwd: true,
      EnableSecondLevel: false,
      EnableFirstLevel: true,
      EnableOtpLevel: false,
      methodOptions: ['otp', 'password'],
      //  for captcha checking
      captcha: false,
      captchaObj: {},
    };
  },
  validations: {
    form: {
      otp: {
        minLength: minLength(4),
        isUnique(value) {
          // standalone validator ideally should not assume a field is required
          if (value === '') return true;

          // simulate async call, fail for all logins with even length
          return new Promise(resolve => {
            setTimeout(() => {
              resolve(typeof value === 'string' && value !== '0000');
            }, 350 + Math.random() * 300);
          });
        },
      },
      UserName: {
        required,

        isUnique(value) {
          console.log(value);
          const re = /\S+@\S+\.\S+/;
          const re2 = /^-{0,1}\d+$/;
          // console.log(re2.test(value));
          // console.log(re.test(value));
          if (re.test(value)) {
            // console.log('emaile');
            this.UserName = value;
            this.emailTrue = true;
            this.mobileTrue = false;
            // console.log(`email :${this.emailTrue}`);
          } else if (re2.test(value)) {
            // console.log('email nist');
            this.UserName = value;
            this.emailTrue = false;
            this.mobileTrue = true;
            // console.log(`mobile :${this.mobileTrue}`);
          } else {
            // console.log('non');
            this.mobileTrue = false;
            this.emailTrue = false;
          }
          return true;
        },
      },
    },
  },
  methods: {
    captchaValid(value) {
      this.captcha = true;
      this.captchaObj = value;
    },
    onSubmit() {
      // console.log('Loged In');
    },
    // verify user name (mobile or email)
    userNameVerify() {
      if (this.mobileTrue) {
        if (this.form.UserName.length !== 0) {
          this.$axios
            .post('/v1/api/vkann/validation/mobile', {
              mobile: this.UserName,
              existed: true,
            })
            .then(response => {
              console.log(response);
              if (response.status === 204) {
                console.log('mobile valid ast');
                if (this.form.method === 'otp') {
                  this.EnableOtpLevel = true;
                  this.EnableFirstLevel = false;
                } else if (this.form.method === 'password') {
                  this.EnableFirstLevel = false;
                  this.EnableSecondLevel = true;
                }
              }
            })
            .catch(() => {
              this.$q.notify({
                color: 'negative',
                position: 'top',
                message: this.$t('enteredMobileHasntRegisteredYet'),
                icon: 'report_problem',
              });
            });
        } else {
          this.$refs.formUsername.$el.focus();

          this.$q.dialog({
            title: this.$t('fillMobileOrEmail'),
          });
        }
      } else if (this.emailTrue) {
        this.$axios
          .post('/v1/api/vkann/validation/email', {
            email: this.UserName,
            existed: true,
          })
          .then(response => {
            console.log(response);
            if (response.status === 204) {
              if (this.form.method === 'otp') {
                this.EnableOtpLevel = true;
                this.EnableFirstLevel = false;
              } else if (this.form.method === 'password') {
                this.EnableFirstLevel = false;
                this.EnableSecondLevel = true;
              }
              console.log('email valid ast');
            } else {
              console.log('email valid nist');
            }
          })
          .catch(() => {
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: this.$t('enteredEmailHasntRegisteredYet'),
              icon: 'report_problem',
            });
          });
      } else {
        this.$q.notify({
          message: this.$t('pleaseenteravalidusername'),
          color: 'negative',
          icon: 'warning',
          position: 'top',
        });
      }
    },
    continueToNextLevel() {
      this.empty = !this.$v.form.$anyDirty;
      this.errors = this.$v.form.$anyError;
      console.log(this.$v.form.UserName.email);
      if (this.errors === false && this.empty === false) {
        if (this.form.UserName.length !== 0) {
          this.$refs.formUsername.$el.focus();
          this.errors = this.$v.form.$anyError;
          console.log(this.$v.form);
          if (this.form.method.length !== 0) {
            if (this.form.method === 'otp') {
              this.EnableOtpLevel = true;
              this.EnableFirstLevel = false;
            } else if (this.form.method === 'password') {
              this.EnableFirstLevel = false;
              this.EnableSecondLevel = true;
            }
          } else {
            this.$q.dialog({
              title: 'لطفا نحوه ورود را انتخاب نمایید',
            });
          }
        } else {
          this.$refs.formUsername.$el.focus();

          this.$q.dialog({
            title: this.$t('fillMobileOrEmail'),
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
    backToStepOne() {
      this.EnableFirstLevel = true;
      this.EnableOtpLevel = false;
      this.EnableSecondLevel = false;
      // activate username
      // validation
      this.$v.$reset();
      this.empty = !this.$v.form.$anyDirty;
      this.errors = this.$v.form.$anyError;
      this.form.otp = '';
      this.form.UserName = '';
      // this.$refs.formUsername.$el.focus();
      // this.empty = !this.$v.form.$anyDirty;
      // this.errors = this.$v.form.$anyError;
      if (this.empty === true) {
        this.$q.notify({
          message: this.$t('emptyForm'),
          color: 'negative',
          icon: 'warning',
          position: 'top',
        });
      }
    },
    stepTwoComplete() {
      if (this.form.password.length !== 0) {
        if (this.captcha === false) {
          this.$q.notify({
            message: this.$t('incorrectcaptcha'),
            color: 'negative',
            icon: 'warning',
            position: 'top',
          });
        } else {
          this.$axios
            .post('/v1/api/vkann/sign-in', {
              ...(this.emailTrue
                ? { email: this.form.UserName }
                : { mobile: this.form.UserName }),
              password: this.form.password,
              captcha: this.captchaObj,
            })
            .then(response => {
              if (response.status === 200) {
                this.EnableSecondLevel = false;
                this.showNotif('top-right');
                console.log(response.data.user);
                this.$store.commit(
                  'module1/userDataFromServer',
                  response.data.user,
                  { module: 'module1' }
                );
                this.$store.commit('module1/logedInSuccesfully', true, {
                  module: 'module1',
                });
                this.$router.push({
                  path: `/${this.$route.params.locale}/dashboard`,
                });
              } else {
                console.log(Response);
                this.$q.notify({
                  message: this.$t('Theformabovehaserrors'),
                  color: 'negative',
                  icon: 'warning',
                  position: 'top',
                });
              }
            })
            .catch(() => {
              if (this.captchaObj.value.length > 0) {
                this.$q.notify({
                  color: 'negative',
                  position: 'top',
                  message: this.$t('incorrectPass'),
                  icon: 'report_problem',
                });
                this.componentKey += 1;
              } else {
                this.$q.notify({
                  color: 'negative',
                  position: 'top',
                  message: this.$t('emptyCaptcha'),
                  icon: 'report_problem',
                });
              }
            });

          // console.log('Submit Form');
        }
      } else {
        this.$q.dialog({
          title: 'لطفا رمز عبور خود را وارد نمایید',
        });
      }
    },
    otpStepComplete() {
      this.empty = !this.$v.form.$anyDirty;
      this.errors = this.$v.form.$anyError;
      if (this.errors === false && this.empty === false) {
        if (this.form.otp.length !== 0) {
          if (this.captcha === false) {
            this.$q.notify({
              message: this.$t('incorrectcaptcha'),
              color: 'negative',
              icon: 'warning',
              position: 'top',
            });
          } else {
            this.EnableOtpLevel = false;
            // console.log('Submit Form');
            this.showNotif('top-right');
          }
        } else {
          this.$q.dialog({
            title: this.$t('OtpIsNotEntered'),
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
    showNotif(position) {
      this.$q.notify({
        color: 'dark',
        icon: 'verified_user',
        message: `Welcome ${this.form.UserName}!`,
        position,
        timeout: Math.random() * 5000 + 3000,
      });
    },
    goToSignUp() {
      this.$emit('changeTab');
    },
    goToForget() {
      this.$emit('changToForget');
      // console.log('loginCmp');
    },
  },
  mounted() {
    this.$refs.formUsername.$el.focus();
    console.log(this.$axios.defaults.baseURL);
    console.log(this.$axios.defaults.proxy);
  },
};
</script>
<style lang="scss">
.loginForm {
  width: 100%;
  margin: 12px auto;
}
.inputFieldText {
  i {
    font-size: 13px;
  }
}
.passwordField {
  i {
    font-size: 17px;
  }
}
.visibilityPass {
  float: left !important;
}
.firstStepLogin {
  margin: 8px 0px;
  padding-bottom: 2px;
}
.forgetUser {
  // color: #CE294A;
  color: $primary;
  display: inline-block;
  margin-top: 12px;
}
.continueToNextLevel {
  display: block;
  float: left;
}
.creatNewAcc {
  float: right;
  // color: #CE294A;
  color: $primary;
}
.mt78 {
  margin-top: 78px;
}
.userName {
  cursor: pointer;
  text-align: center;
  display: inline-block;
  width: 100%;
  margin-bottom: 24px;
  font-size: 18px;
  background-color: #f1f7f8;
  border-radius: 3px;
}
.otpInput {
  input {
    text-align: center;
    font-size: 20px;
  }
}
.resendOtp {
  color: $primary;
  // float: right;
  cursor: pointer;
  display: inline-block;
}
.loginWrapperCmp {
  overflow: hidden;
}
</style>

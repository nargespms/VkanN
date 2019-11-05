<template >
  <div class="loginWrapperCmp">
    <q-form @submit="onSubmit" class="q-gutter-md loginForm">
      <!-- step one -->
      <div v-if="EnableFirstLevel">
        <q-input
          outlined
          class="inputFieldText firstStepLogin"
          color="light-blue-10"
          v-model="UserName"
          :label="$t('EmailorPhoneNumber')"
          lazy-rules
        >
          <template v-slot:prepend>
            <q-icon name="fas fa-user" />
          </template>
        </q-input>
        <!-- choosing how to verify acoount -->
        <q-select
          color="light-blue-10"
          outlined
          v-model="method"
          :options="methodOptions"
          :label="$t('chooseYourMethodToLogin')"
        >
          <template v-slot:append>
            <q-icon name />
          </template>
        </q-select>
        <router-link class="forgetUser" to="/">
          <span @click="goToForget">{{$t('forgotEmail')}} {{$t('questionmark')}}</span>
        </router-link>
        <div class="clear mt78">
          <q-btn
            class="continueToNextLevel"
            :label="$t('next')"
            color="primary"
            @click="continueToNextLevel"
          />
          <router-link to="/" class="creatNewAcc">
            <span @click="goToSignUp">{{$t('newaccount')}}</span>
          </router-link>
        </div>
      </div>
      <!-- step one -->
      <!-- step two if password choosed -->
      <div v-if="EnableSecondLevel">
        <span class="userName" @click="backToStepOne">{{UserName}}</span>
        <q-input
          outlined
          class="inputFieldText passwordField"
          color="light-blue-10"
          :label="$t('EnterYourPassword')"
          v-model="password"
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
        <div class="clear mt78">
          <q-btn
            class="continueToNextLevel"
            :label="$t('enter')"
            color="primary"
            @click="stepTwoComplete"
          />
          <router-link to="/" class="creatNewAcc">
            <span @click="goToForget">{{$t('forgetpassword')}}</span>
          </router-link>
        </div>
      </div>
      <!-- step two if password chose -->
      <!-- step two if OTP chosed -->
      <div v-if="EnableOtpLevel">
        <span class="userName" @click="backToStepOne">{{UserName}}</span>
        <span>{{$t('otpMessage')}}</span>
        <q-input filled v-model="otp" class="otpInput" mask="# # # #" fill-mask="_">
          <template v-slot:prepend>
            <q-icon name />
          </template>
        </q-input>
        <div class="clear mt78">
          <q-btn
            class="continueToNextLevel"
            :label="$t('enter')"
            color="primary"
            @click="otpStepComplete"
          />
          <span class="resendOtp">{{$t('resendOtp')}}</span>
        </div>
      </div>
      <!-- step two if OTP chosed -->
    </q-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      UserName: '',
      password: '',
      isPwd: true,
      EnableSecondLevel: false,
      EnableFirstLevel: true,
      EnableOtpLevel: false,
      method: this.$t('otp'),
      methodOptions: [this.$t('otp'), this.$t('password')],
      otp: '',
    };
  },
  methods: {
    onSubmit() {
      // console.log('Loged In');
    },
    continueToNextLevel() {
      if (this.UserName.length !== 0) {
        if (this.method.length !== 0) {
          if (this.method === 'otp') {
            this.EnableOtpLevel = true;
            this.EnableFirstLevel = false;
          } else if (this.method === 'password') {
            this.EnableFirstLevel = false;
            this.EnableSecondLevel = true;
          }
        } else {
          this.$q.dialog({
            title: 'لطفا نحوه ورود را انتخاب نمایید',
          });
        }
      } else {
        this.$q.dialog({
          title: this.$t('fillMobileOrEmail'),
        });
      }
    },
    backToStepOne() {
      this.EnableFirstLevel = true;
      this.EnableOtpLevel = false;
      this.EnableSecondLevel = false;
    },
    stepTwoComplete() {
      if (this.password.length !== 0) {
        this.EnableSecondLevel = false;
        // console.log('Submit Form');
        this.showNotif('top-right');
      } else {
        this.$q.dialog({
          title: 'لطفا رمز عبور خود را وارد نمایید',
        });
      }
    },
    otpStepComplete() {
      if (this.otp.length !== 0) {
        this.EnableOtpLevel = false;
        // console.log('Submit Form');
        this.showNotif('top-right');
      } else {
        this.$q.dialog({
          title: 'لطفا رمز یکبار مصرف  خود را وارد نمایید',
        });
      }
    },
    showNotif(position) {
      this.$q.notify({
        color: 'dark',
        icon: 'verified_user',
        message: `Welcome ${this.UserName}!`,
        position,
        timeout: Math.random() * 5000 + 3000,
      });
      this.$router.push({ path: `/${this.$route.params.locale}/dashboard` });
    },
    goToSignUp() {
      this.$emit('changeTab');
    },
    goToForget() {
      this.$emit('changToForget');
      // console.log('loginCmp');
    },
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
  float: right;
  cursor: pointer;
  display: inline-block;
}
.loginWrapperCmp {
  overflow: hidden;
}
</style>

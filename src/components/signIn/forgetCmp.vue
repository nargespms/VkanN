<template >
  <div class="forgetWrapper">
    <q-form @submit="onSubmit" class="q-gutter-md mt78">
      <div v-if="enterMobile">
        <!-- step one entering phone number -->
        <!-- Phone Number -->
        <vue-tel-input
          required
          v-model="MobileNumber"
          :placeholder="$t('pleaseEnterYourPhoneNumber')"
        ></vue-tel-input>
        <q-btn class="RetrivePass" :label="$t('RetrivePass')" color="primary" @click="onSubmit" />
        <!-- step one entering phone number -->
      </div>
      <!-- step two  entering code  -->
      <div v-if="entercode">
        <span class="retrivedMessage">{{$t('retrivedMessage')}}</span>
        <q-input filled v-model="retrivedCode" class="otpInput" mask="# # # #" fill-mask="_">
          <template v-slot:prepend>
            <q-icon name />
          </template>
        </q-input>
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
import { VueTelInput } from 'vue-tel-input';

export default {
  components: {
    VueTelInput,
  },
  data() {
    return {
      MobileNumber: '',
      enterMobile: true,
      entercode: false,
      retrivedCode: '',
    };
  },
  methods: {
    onSubmit() {
      if (this.MobileNumber.length !== 0) {
        console.log('retrive pass request');
        this.enterMobile = false;
        this.entercode = true;
      } else {
        this.$q.dialog({
          title: 'لطفا شماره تلفن همراه خود را وارد نمایید',
        });
      }
    },
    resendPass() {
      this.onSubmit();
    },
    enterFromForgetpas() {
      if (this.retrivedCode !== 0) {
        this.entercode = false;
        console.log('Submit Form');
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

<template >
  <div>
    <q-form
      @submit="onSubmit"
      class="q-gutter-md loginForm"
    >
    <!-- step one -->
      <div v-if="EnableFirstLevel">
        <q-input  outlined class="inputFieldText firstStepLogin"
                  color="light-blue-10" v-model="UserName"
                  label="Email Or Phone NUmber"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 ]">
          <template v-slot:prepend>
            <q-icon name="fas fa-user" />
          </template>
        </q-input>
        <router-link class="forgetUser" to="/" >
          <span>
            {{$t('forgotEmail')}} {{$t('questionmark')}}
          </span>
        </router-link>
        <div class="clear mt78">
          <q-btn class="continueToNextLevel" label="Next"  color="primary"
                  @click="stepOneComplete"/>
          <router-link to="/" class="creatNewAcc">
            <span>
              {{$t('newaccount')}}
            </span>
          </router-link>
        </div>
      </div>
    <!-- step one -->
    <!-- step two -->
    <div v-if="EnableSecondLevel">
      <span class="userName" @click="backToStepOne">
        {{UserName}}
      </span>
      <q-input  outlined class="inputFieldText passwordField" color="light-blue-10"
                label="password"
                v-model="password"  :type="isPwd ? 'password' : 'text'"
                hint="Your Password Should Be At Least 8 characters"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']">
        <template v-slot:prepend>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer visibilityPass"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <div class="clear mt78">
          <q-btn class="continueToNextLevel" label="Next"  color="primary"
                  @click="stepTwoComplete"/>
          <router-link to="/" class="creatNewAcc">
            <span>
              {{$t('forgetpassword')}}
            </span>
          </router-link>
        </div>
    </div>
    <!-- step two -->
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
    };
  },
  methods: {
    onSubmit() {
      console.log('Loged In');
    },
    stepOneComplete() {
      if (this.UserName.length !== 0) {
        this.EnableFirstLevel = false;
        this.EnableSecondLevel = true;
      } else {
        this.$q.dialog({
          title: 'لطفا اطلاعات حساب خود را وارد نمایید',
        });
      }
    },
    backToStepOne() {
      this.EnableFirstLevel = true;
      this.EnableSecondLevel = false;
    },
    stepTwoComplete() {
      if (this.password.length !== 0) {
        this.EnableSecondLevel = false;
        console.log('Submit Form');
        this.showNotif('top-right');
      } else {
        this.$q.dialog({
          title: 'لطفا پسورد خود را وارد نمایید',
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
      this.$router.push({ path: 'dashboard' });
    },
  },
};
</script>
<style lang="scss">
.loginForm {
  width: 400px;
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
.visibilityPass{
  float: left!important;
}
.firstStepLogin {
  margin: 8px 0px;
  padding-bottom: 2px;
}
.forgetUser {
  // color: #CE294A;
  color: $primary;

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
.mt78 { margin-top: 78px;}
.userName {
  cursor: pointer;
  text-align: center;
  display: inline-block;
  width: 100%;
  margin-bottom: 24px;
  font-size: 18px;
  background-color: #F1F7F8;
  border-radius: 3px;
 }
</style>

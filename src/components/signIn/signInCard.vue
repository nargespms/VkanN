<template >
  <div class="q-pa-md">
    <q-card class="myCard loginWrapperCard">
      <div class="loginImage"></div>
      <div class="tabWrapper">
        <q-tabs v-model="tab" class="tabsContainer block640">
          <q-tab class="tabSelect" label name="login">{{$t('signin')}}</q-tab>
          <q-tab class="tabSelect" label name="register">{{$t('register')}}</q-tab>
        </q-tabs>
        <!-- titl for login Register Card -->
        <q-card-section>
          <p class="welcomeMgs">{{$t('welcomemsg')}}</p>
        </q-card-section>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <loginCmp @changeTab="signUp" @changToForget="forget" />
          </q-tab-panel>

          <q-tab-panel name="register">
            <registerCmp />
          </q-tab-panel>

          <q-tab-panel name="forget">
            <forgetCmp />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </q-card>
  </div>
</template>
<script>
// import { languages, Organization } from '@aasaam/information';
import loginCmp from './loginCmp.vue';
import registerCmp from './registerCmp.vue';
import forgetCmp from './forgetCmp.vue';
// const { languages, Organization } = require('@aasaam/information');

export default {
  data() {
    return {
      tab: 'login',
    };
  },
  components: {
    loginCmp,
    registerCmp,
    forgetCmp,
  },
  // mounted() {
  //   console.log(languages); // array of supported languages ['ar', 'de', ...]
  //   console.log(Organization.en); // dump english version of organization detail
  // },
  methods: {
    signUp() {
      this.tab = 'register';
    },
    forget() {
      this.tab = 'forget';
      // console.log('signincard');
    },
  },
};
</script>
<style lang="scss">
.loginWrapperCard {
  width: 100%;
  margin: 0px auto;
  overflow: auto;
  @media screen and (min-width: 1024px) {
    width: 60%;
  }
}
.tabWrapper {
  width: 70%;
  float: right;
  overflow: hidden;
}
.loginImage {
  float: left;
  background-color: #f1f7f8;
  border-left: 1px solid #e5eff2;
  color: #fff;
  height: 900px;
  width: 30%;
  box-sizing: border-box;
  background-image: url('../../assets/aasaam-typo.png');
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: center;
}
.tabsContainer {
  background-color: #ffa900;
  color: #fff;
  // font-family: 'ShabnamBold';
}
.q-tab--active {
  color: #fff;
  border-bottom: 3px solid #fff25c;
}
[dir] .q-tab__indicator {
  background: none;
}
.tabSelect {
  color: #000;
  @media screen and (min-width: 1024px) {
    width: 50%;
    float: right;
    font-size: 16px;
  }
}
.welcomeMgs {
  display: flex;
  justify-content: space-around;
  // font-family: 'ShabnamBold';
  font-size: 18px;
  margin-bottom: 24px;
  text-align: center;
}
[dir='rtl'] .q-card > div:first-child,
[dir='rtl'] .q-card > img:first-child {
  border-top-right-radius: inherit;
  border-top-left-radius: 0;
}
[dir='ltr'] .q-card > div:first-child,
[dir='ltr'] .q-card > img:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: 0;
}
</style>

<template >
  <div class="q-pa-md">
    <q-card class="myCard">
      <div class="loginImage">

      </div>
      <div class="tabWrapper">
        <q-tabs v-model="tab" class="tabsContainer">
          <q-tab class="tabSelect" label="" name="one">{{$t('signin')}}</q-tab>
          <q-tab class="tabSelect" label="" name="two">{{$t('register')}}</q-tab>
        </q-tabs>
         <q-card-section>
          <p class="welcomeMgs">
            {{$t('welcomemsg')}}
          </p>
        </q-card-section>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="one">
            <loginCmp/>
          </q-tab-panel>

          <q-tab-panel name="two">
            <registerCmp/>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </q-card>
  </div>
</template>
<script>
import loginCmp from './loginCmp.vue';
import registerCmp from './registerCmp.vue';

export default {
  data() {
    return {
      tab: 'one',
    };
  },
  components: {
    loginCmp,
    registerCmp,
  },
};
</script>
<style >
.myCard {
  width: 60%;
  margin: 0px auto;
  overflow: auto;
}
.tabWrapper {
   width: 70%;
  float: right;
}
.loginImage {
  float: left;
  background-color: #F1F7F8;
  border-left: 1px solid #E5EFF2;
  color: #fff;
  height: 900px;
  width: 30%;
  box-sizing: border-box;
  background-image: url("../../assets/aasaam-typo.png");
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: center;
}
.tabsContainer{
  background-color: #ffa900;
  color: #fff;
  font-family: 'ShabnamBold';
}
.q-tab--active {
  color: #fff;
  border-bottom: 3px solid #fff25c;
}
[dir] .q-tab__indicator {
  background: none;
}
.tabSelect {
  width: 50%;
  float: right;
  font-size: 16px;
  color: #000;
}
.welcomeMgs {
  display: flex;
  justify-content: space-around;
  font-family: 'ShabnamBold';
  font-size:18px;
  margin-bottom: 24px;
}
[dir="rtl"] .q-card > div:first-child, [dir="rtl"] .q-card > img:first-child {
  border-top-right-radius: inherit;
  border-top-left-radius: 0;
}
[dir="ltr"] .q-card > div:first-child, [dir="ltr"] .q-card > img:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: 0;
}
</style>

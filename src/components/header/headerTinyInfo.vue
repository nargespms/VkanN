<template >
  <div class="tinyFixInfo">
    <div class="con16 clear p12">
      <div class="tinyFixInfoInner">
        <router-link
          v-if="!$store.state.module1.logedIn"
          :to="'/' +locale + '/' + 'signIn'"
          class="loginBut text-white"
        >
          <span>
            <q-icon name="fas fa-user" class="pr12"></q-icon>
            {{$t('login')}}
          </span>
        </router-link>
        <div v-if="$store.state.module1.logedIn" class="loginBut text-white" @click="logOutPannel">
          <span>
            <q-icon name="fas fa-sign-out-alt" class="pr12"></q-icon>
            {{$t('logOut')}}
          </span>
        </div>
        <!-- seprator -->
        <q-icon name="fas fa-grip-vertical " class="text-white sepratorInfoHeader"></q-icon>
        <!-- search -->
        <div class="searchWrap text-white">
          <searchField :locale="locale" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import searchField from '../structure/searchField.vue';

export default {
  name: 'headerTinyInfo',
  props: ['locale'],
  components: {
    searchField,
  },
  methods: {
    logOutPannel() {
      this.$store.commit('module1/logedInSuccesfully', false, {
        module: 'module1',
      });
      this.$store.commit('module1/userDataFromServer', null, {
        module: 'module1',
      });
      this.$router.push({ path: `/${this.$route.params.locale}/signIn` });

      console.log('logout');
    },
  },
};
</script>

<style lang="scss">
.tinyFixInfo {
  width: 100%;
  height: 50px;
  position: fixed;
  top: 87px;
  background: #2f718f;
  border-bottom: 5px solid #e2e95d;
  z-index: 999;
  // position: relative;
}
.loginBut {
  float: right;
  padding-left: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
}
.tinyFixInfoInner {
  float: right;
  display: flex;
}
.sepratorInfoHeader {
  padding-top: 7px;
  margin: 0px 16px;
}
.searchWrap {
  cursor: pointer;
}
</style>

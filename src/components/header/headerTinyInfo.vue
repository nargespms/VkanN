<template>
  <div class="tinyFixInfo">
    <div class="con16 clear p12">
      <div class="tinyFixInfoInner">
        <!-- language switcher component -->
        <languageSwitcher :locale="locale" />

        <!-- seprator -->
        <q-icon name="fas fa-ellipsis-v " class="text-white sepratorInfoHeader"></q-icon>

        <!-- search -->
        <div class="searchWrap text-white">
          <searchField :locale="locale" />
        </div>

        <!-- seprator -->
        <q-icon name="fas fa-ellipsis-v " class="text-white sepratorInfoHeader"></q-icon>

        <router-link
          v-if="!$store.state.module1.logedIn"
          :to="'/' + locale + '/' + 'signIn'"
          class="loginBut text-white"
        >
          <span>
            {{ $t('login') }}
            <q-icon name="fas fa-user" class="pl12"></q-icon>
          </span>
        </router-link>
        <div v-if="$store.state.module1.logedIn" class="loginBut text-white" @click="logOutPannel">
          <span>
            {{ $t('logOut') }}
            <q-icon name="fa fa-key" class="fn12 pl12"></q-icon>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import languageSwitcher from '../structure/languageSwitcher.vue';

import searchField from '../structure/searchField.vue';

export default {
  name: 'headerTinyInfo',
  props: ['locale'],
  components: {
    searchField,
    languageSwitcher,
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
  top: 64px;
  background: #2f718f;
  border-bottom: 5px solid #e2e95d;
  z-index: 999;
  // position: relative;
}
.loginBut {
  float: right;
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

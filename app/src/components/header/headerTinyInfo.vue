<template>
  <div class="tinyFixInfo">
    <div class="con16 clear p12">
      <div class="tinyFixInfoInner">
        <!-- language switcher component -->
        <languageSwitcher :locale="locale" />

        <!-- seprator -->

        <!-- <q-icon name="fas fa-ellipsis-v " class="text-white sepratorInfoHeader"></q-icon> -->
        <!-- search -->
        <div class="searchWrap text-white verSep">
          <searchField :locale="locale" class="alignCenter" />
        </div>

        <!-- seprator -->
        <!-- <q-icon name="fas fa-ellipsis-v " class="text-white sepratorInfoHeader"></q-icon> -->

        <router-link
          v-if="!$store.state.module1.logedIn"
          :to="'/' + locale + '/' + 'signIn'"
          class="loginBut text-white verSep"
        >
          <div>
            <q-icon name="fas fa-user" class="pr12"></q-icon>
            <span>{{ $t('login') }}</span>
          </div>
        </router-link>
        <div
          v-if="$store.state.module1.logedIn"
          class="loginBut text-white verSep"
          @click="logOutPannel"
        >
          <div>
            <q-icon name="fa fa-key" class="fn12 pr12"></q-icon>
            <span>{{ $t('logOut') }}</span>
          </div>
        </div>
      </div>
    </div>
    <breadCrumb />
  </div>
</template>

<script>
import breadCrumb from '../structure/breadCrumb.vue';
import languageSwitcher from '../structure/languageSwitcher.vue';
import searchField from '../structure/searchField.vue';

export default {
  name: 'headerTinyInfo',
  props: ['locale'],
  components: {
    searchField,
    languageSwitcher,
    breadCrumb,
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
      this.$axios.get('/v1/api/vkann/log-out').then(res => {
        console.log(res);
      });
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
  font-size: 12px;
  font-weight: bold;
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
  padding: 0px 12px;
}
</style>

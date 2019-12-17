<template >
  <div class="tinyFixInfo">
    <div class="con16 clear p12">
      <div class="tinyFixInfoInner">
        <router-link :to="'/' +locale + '/' + 'signIn'" class="loginBut text-white">
          <span>
            <q-icon name="fas fa-user" class="pr12"></q-icon>
            {{$t('login')}}
          </span>
        </router-link>
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
};
</script>

<style lang="scss">
.tinyFixInfo {
  width: 100%;
  height: 50px;
  position: fixed;
  top: 103px;
  background: #2f718f;
  border-bottom: 5px solid #e2e95d;
  position: relative;
}
.loginBut {
  float: right;
  padding-left: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

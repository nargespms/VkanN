<template >
  <div class="q-pa-xl">
    <div class="permissionDeniedPage">
      <span class="permissionDeniedTxt">
        <q-icon name="warning" flat color="negative"></q-icon>
        {{$t('youDonthaveAccess')}}
      </span>
      <!-- <router-link :to="'/' + $route.params.locale + '/dashboard'">
        <q-icon name="fas fa-home" class="fn18" />
        {{$t('returnTo')}} {{$t('dashboard')}}
      </router-link>-->
      <img src="~assets/signIn.png" alt />
    </div>
  </div>
</template>


<script>
export default {
  meta() {
    return { title: this.$t('welcomemsg') };
  },
};
</script>


<style lang="scss">
.permissionDeniedPage {
  .permissionDeniedTxt {
    font-size: 22px;
    display: block;
    margin: auto;
    text-align: center;
    i {
      font-size: 35px;
    }
  }
  a {
    display: block;
    font-size: 19px;
    width: 242px;
    margin: 12px auto;
    background-color: #b7aeee;
    color: #000;
    padding: 4px 12px;
    border-radius: 4px;
  }
  img {
    display: block;
    margin: auto;
  }
}
</style>

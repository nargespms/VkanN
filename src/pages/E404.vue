<template >
  <div>
    <div class="alreadySignedText">
      <span>{{$t('YouAreSignInAlready')}}</span>
      <router-link :to="'/' + $route.params.locale + '/dashboard'">
        <q-icon name="fas fa-home" class="fn18" />
        {{$t('returnTo')}} {{$t('dashboard')}}
      </router-link>
    </div>
    <img src="~assets/signIn.png" alt />
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
.alreadySignedText {
  span {
    font-size: 18px;
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
}
</style>

<template >
  <div class="q-pa-xl">
    <div v-if="!$store.state.module1.logedIn">
      <signInCard />
    </div>
    <div class="alreadySigned" v-if="$store.state.module1.logedIn">
      <div class="alreadySignedText">
        <span>{{$t('YouAreSignInAlready')}}</span>
        <router-link :to="'/' + $route.params.locale + '/dashboard'">
          <q-icon name="fas fa-home" class="fn18" />
          {{$t('returnTo')}} {{$t('dashboard')}}
        </router-link>
      </div>
      <img src="~assets/signIn.png" alt />
    </div>
  </div>
</template>
<script>
import signInCard from '../components/signIn/signInCard.vue';

export default {
  name: 'signIn',
  meta() {
    return { title: this.$t('welcomemsg') };
  },

  components: {
    signInCard,
  },
};
</script>

<style lang="scss">
.alreadySigned {
  width: 70%;
  margin: auto;
  text-align: center;
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
}
</style>

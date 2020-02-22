<template>
  <div class="clear">
    <q-header elevated>
      <div class="con12">
        <q-toolbar class="headerInner">
          <!-- should show this only for mobile -->
          <q-btn
            v-if="mobileSize"
            flat
            dense
            round
            @click="changeMenState"
            icon="menu"
            aria-label="Menu"
          />
          <q-toolbar-title class="welMsgLogo">
            <span>{{ $t('welcomemsg') }}</span>
          </q-toolbar-title>
        </q-toolbar>
      </div>
    </q-header>
    <!-- right  main menu component -->
    <div v-if="$store.state.module1.logedIn">
      <rightMainMenu
        :locale="locale"
        :leftDrawerOpen="leftDrawerOpen"
        :mobileSize="mobileSize"
        @backFalse="backFalse"
      />
    </div>
    <q-resize-observer @resize="onResize" />
  </div>
</template>
<script>
import rightMainMenu from '../structure/rightMainMenu.vue';
// import expandableMenu from '../structure/expandableMenu.vue';

export default {
  name: 'headerWrapper',
  components: {
    rightMainMenu,
    // expandableMenu,
  },
  props: ['locale'],
  data() {
    return {
      timer: '',
      leftDrawerOpen: true,
      mobileSize: false,
    };
  },
  methods: {
    changeMenState() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    onResize(size) {
      if (size.width < 980) {
        this.leftDrawerOpen = false;
        this.mobileSize = true;
      } else {
        this.leftDrawerOpen = true;
        this.mobileSize = false;
      }
      // console.log(this.screenSize);
    },
    backFalse() {
      this.leftDrawerOpen = false;
    },
    // refresh token
    refreshToken() {
      this.$axios.get('/v1/api/vkann/refresh-token ').then(res => {
        console.log(res);
      });
    },
    cancelAutoUpdate() {
      clearInterval(this.timer);
    },
  },
  //  refresh token
  created() {
    this.refreshToken();
    this.timer = setInterval(this.refreshToken, 3600000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  //  refresh token
};
</script>
<style lang="scss">
.headerInner {
  padding: 16px 12px;
  padding-left: 0px;
}
.welMsgLogo {
  background-image: url('../../../node_modules/@aasaam/information/logo/aasaam-mask.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: left;
  span {
    padding-left: 50px;
  }
}
</style>

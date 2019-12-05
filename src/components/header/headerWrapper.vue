<template>
  <div class="clear">
    <q-header elevated>
      <div class="con16">
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
          <q-toolbar-title>AASAAM CRM</q-toolbar-title>
          <!-- language switcher component -->
          <languageSwitcher :locale="locale" />
        </q-toolbar>
      </div>
    </q-header>
    <!-- right  main menu component -->
    <rightMainMenu
      :locale="locale"
      :leftDrawerOpen="leftDrawerOpen"
      :mobileSize="mobileSize"
      @backFalse="backFalse"
    />
    <q-resize-observer @resize="onResize" />
  </div>
</template>
<script>
import languageSwitcher from '../structure/languageSwitcher.vue';
import rightMainMenu from '../structure/rightMainMenu.vue';
// import expandableMenu from '../structure/expandableMenu.vue';

export default {
  name: 'headerWrapper',
  components: {
    languageSwitcher,
    rightMainMenu,
    // expandableMenu,
  },
  props: ['locale'],
  data() {
    return {
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
  },
};
</script>
<style lang="scss">
.headerInner {
  padding: 24px 12px;
}
</style>

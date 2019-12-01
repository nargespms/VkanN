<template>
  <div class="clear">
    <q-header elevated>
      <div class="con16">
        <q-toolbar class="headerInner">
          <!-- should show this only for mobile -->
          <q-btn
            flat
            dense
            round
            @click="leftDrawerOpen = !leftDrawerOpen"
            icon="menu"
            aria-label="Menu"
          />
          {{leftDrawerOpen}}
          <q-toolbar-title>AASAAM CRM</q-toolbar-title>
          <!-- language switcher component -->
          <languageSwitcher :locale="locale" />
        </q-toolbar>
      </div>
    </q-header>
    <!-- right  main menu component -->
    <rightMainMenu :locale="locale" :leftDrawerOpen="leftDrawerOpen" />
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
    };
  },
};
</script>
<style lang="scss">
.headerInner {
  padding: 24px 12px;
}
</style>

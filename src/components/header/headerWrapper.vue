<template>
  <div>
    <q-header elevated >
      <div class="con16">
        <q-toolbar class="headerInner">
          <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen"
            icon="menu"
            aria-label="Menu"
          />
          <q-toolbar-title>
            AASAAM CRM
          </q-toolbar-title>
          <!-- language switcher component -->
          <languageSwitcher :locale="locale"/>
        </q-toolbar>
      </div>
    </q-header>
    <!-- right  main menu component -->
    <rightMainMenu :locale="locale" :leftDrawerOpen="leftDrawerOpen"/>
  </div>
</template>
<script>
import languageSwitcher from '../structure/languageSwitcher.vue';
import rightMainMenu from '../structure/rightMainMenu.vue';

export default {
  name: 'headerWrapper',
  components: {
    languageSwitcher,
    rightMainMenu,
  },
  props: ['locale'],
  data() {
    return {
      leftDrawerOpen: true,
    };
  },
  methods: {
  },
};
</script>
<style lang="scss">

// MainMenu
.mainMenuLi {
  padding: 12px;
  transition: linear .25s;
  a {
    color: #000;
    font-size: 17px;
    i {
      padding-right: 12px;
      vertical-align: text-top;
      font-size: 20px;
    }
  }
  &:hover {
    background-color: #fff;
    transition: linear .25s;
  }
}
.headerInner {
  padding: 24px 12px;
}
</style>

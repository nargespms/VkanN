<template >
  <div>
    <router-link
      class="switchLangsBut"
      v-for="locale in locales"
      :key="locale.label"
      :to="'/' + locale.value + '/' +newroute"
    >
      <span>{{locale.label}}</span>
    </router-link>
    <router-link :to="'/' +locale + '/' + 'signIn'" class="loginBut text-white">
      <span>
        <q-icon name="fas fa-user"></q-icon>login
      </span>
    </router-link>
  </div>
</template>
<script>
export default {
  props: ['locale'],
  name: 'languageSwitcher',
  data() {
    return {
      locales: [
        { label: 'En', value: 'en-us' },
        { label: 'Fa', value: 'fa-ir' },
        { label: 'ar', value: 'ar' },
        { label: 'de', value: 'de' },
      ],
    };
  },
  computed: {
    newroute() {
      return this.$route.path
        .split('/')
        .slice(2)
        .join('/')
        .toString();
    },
  },
};
</script>
<style lang="scss">
// switch Languages
.switchLangsBut {
  span {
    padding: 12px;
  }
  font-size: 17px;
  color: #fff;
  &:hover {
    color: #ffff03;
  }
  &.router-link-active {
    color: #ffff03;
  }
}
</style>

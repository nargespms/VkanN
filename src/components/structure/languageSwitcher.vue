<template>
  <div class="flex">
    <ul class="localesWrap">
      <li v-for="locale in locales" :key="locale.value" class="localeValue">
        <span @click="changeRoute(locale.value)">
          {{ locale.value }}
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['locale'],
  name: 'languageSwitcher',
  data() {
    return {
      locales: [
        {
          label: 'فارسی',
          value: 'fa',
          url: '' / ' + locale.value + ' / ' +newroute"',
        },
        {
          label: 'english',
          value: 'en',
          url: '' / ' + locale.value + ' / ' +newroute"',
        },
        {
          label: 'العربیه',
          value: 'ar',
          url: '' / ' + locale.value + ' / ' +newroute"',
        },
        {
          label: 'Dutch',
          value: 'de',
          url: '' / ' + locale.value + ' / ' +newroute"',
        },
      ],
    };
  },
  methods: {
    changeRoute(value) {
      if (this.$route.path !== `/${value}/${this.newroute}`) {
        this.$router.push({
          path: `/${value}/${this.newroute}`,
        });
      }
    },
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
.localeValue {
  color: #fff;
  display: inline-block;
  cursor: pointer;
  padding: 0px 12px;
}
</style>

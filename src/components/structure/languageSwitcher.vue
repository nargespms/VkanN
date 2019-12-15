<template >
  <div>
    <q-select
      color="blue-grey-10  "
      class="switchLangsWrap border-blue-grey-10"
      v-model="model"
      outlined
      :label="$t('chooseYourLang')"
      :options="locales"
    >
      <template v-slot:option="scope">
        <q-item
          v-bind="scope.itemProps"
          v-on="scope.itemEvents"
          @click="changeRoute(scope.opt.value)"
        >
          <q-item-section avatar>
            <q-icon :name="scope.opt.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{scope.opt.label}}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>

    <!-- the old -->
    <!-- <router-link
      class="switchLangsBut"
      v-for="locale in locales"
      :key="locale.label"
      :to="'/' + locale.value + '/' +newroute"
    >
      <span>{{locale.label}}</span>
    </router-link>-->
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
      model: null,
      locales: [
        {
          label: 'En',
          value: 'en',
          url: '' / ' + locale.value + ' / ' +newroute"',
        },
        {
          label: 'Fa',
          value: 'fa',
          url: '' / ' + locale.value + ' / ' +newroute"',
        },
        {
          label: 'ar',
          value: 'ar',
          url: '' / ' + locale.value + ' / ' +newroute"',
        },
        {
          label: 'de',
          value: 'de',
          url: '' / ' + locale.value + ' / ' +newroute"',
        },
      ],
    };
  },
  methods: {
    changeRoute(value) {
      this.$router.push({
        path: `/${value}/${this.newroute}`,
      });
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
// switch Languages
.switchLangsWrap {
  background-color: #fff;
  border-radius: 4px;
}
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

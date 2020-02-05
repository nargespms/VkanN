<template >
  <div class="flex">
    <q-select
      class="switchLangsWrap"
      v-model.trim="model"
      map-options
      emit-value
      option-value="label"
      outlined
      :options="locales"
      :label="$t('lang')"
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
  </div>
</template>
<script>
export default {
  props: ['locale'],
  name: 'languageSwitcher',
  data() {
    return {
      model: this.$t('persian'),
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
// switch Languages
.switchLangsWrap {
  background-color: #f1f7f8;
  border-radius: 4px;
  width: 215px;
  // height: 39px;
}
// .q-field--auto-height .q-field__control,
// .q-field--auto-height .q-field__native {
//   min-height: 39px !important;
// }
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

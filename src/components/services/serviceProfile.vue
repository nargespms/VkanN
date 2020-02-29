<template >
  <div class="serviceProfileWrap">
    <q-card class="myCard">
      <div class></div>
      <div class="tabWrapper">
        <q-tabs v-model="tab" class="tabsContainer block640">
          <q-tab class="tabSelect" label name="serviceProfile">{{ $t('serviceInformation') }}</q-tab>
          <q-tab class="tabSelect" label name="serviceEdit">{{ $t('edit') }}</q-tab>
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="serviceProfile">
            <serviceProfileCmp :data="data" />
          </q-tab-panel>

          <q-tab-panel name="serviceEdit">
            <serviceEditCmp @tabChanged="tabChanged" :data="data" />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </q-card>
  </div>
</template>


<script>
import serviceProfileCmp from './serviceProfileCmp.vue';
import serviceEditCmp from './serviceEditCmp.vue';

export default {
  name: 'serviceProfile',
  props: ['data'],
  components: {
    serviceProfileCmp,

    serviceEditCmp,
  },
  data() {
    return {
      tab: 'serviceProfile',
    };
  },
  methods: {
    tabChanged(value) {
      this.tab = value;
      console.log(value);
    },
  },
};
</script>

<style lang="scss">
.serviceProfileWrap {
  .q-tab {
    width: calc(100% / 2);
  }
  .q-tab__indicator {
    background: #027be3;
  }
}
</style>

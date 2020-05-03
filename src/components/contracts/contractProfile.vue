<template>
  <div class="contractProfileWrap">
    <q-card>
      <div class></div>
      <div>
        <q-tabs v-model="tab" class="block640">
          <q-tab class="tabSelect" label name="contractProfile">
            {{
            $t('contractInformation')
            }}
          </q-tab>
          <q-tab
            class="tabSelect"
            label
            name="contractEdit"
            v-if="$store.state.module1.userData.role !== 'MEMBER'&& $store.state.module1.userData.role !== 'CLIENT'"
          >
            {{
            $t('edit')
            }}
          </q-tab>
        </q-tabs>

        <q-tab-panels v-if="!isLoading" v-model="tab" animated>
          <q-tab-panel name="contractProfile" class="contractProfile">
            <div class="contractImg">
              <img src="../../assets/collaborate.png" class="w100" />
            </div>
            <contractProfileCmp :data="contractData" />
          </q-tab-panel>

          <q-tab-panel
            name="contractEdit"
            v-if="$store.state.module1.userData.role !== 'MEMBER' && $store.state.module1.userData.role !== 'CLIENT'
"
          >
            <contractEditCmp @tabChanged="tabChanged" :data="contractData" />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </q-card>
  </div>
</template>

<script>
import contractProfileCmp from './contractProfileCmp.vue';
import contractEditCmp from './contractEditCmp.vue';

export default {
  name: 'contractProfile',
  components: {
    contractProfileCmp,
    contractEditCmp,
  },
  data() {
    return {
      tab: 'contractProfile',
      contractData: {},
      isLoading: true,
    };
  },
  methods: {
    tabChanged(value) {
      this.tab = value;
      console.log(value);
      this.$emit('reRender', true);
    },
  },
  mounted() {
    this.$axios
      .get(`/v1/api/vkann/contracts/${this.$route.params.contractId}`)
      .then(res => {
        console.log(res);
        this.contractData = res.data.contract;
        this.isLoading = false;
      })
      .catch(e => {
        if (e.response.status === 422) {
          this.$q.notify({
            message: this.$t('contractsUnvalid'),
            color: 'negative',
            icon: 'warning',
            position: 'top',
          });
        }
      });
  },
};
</script>

<style lang="scss">
.contractImg {
  @media screen and (max-width: 800px) {
    display: none;
  }
  @media screen and (min-width: 800px) {
    display: block;
    width: 15%;
    display: flex;
    align-self: center;
  }
}
.contractProfileWrap {
  .q-tab {
    @media screen and (max-width: 639px) {
      width: calc(100%);
    }
    @media screen and (min-width: 640px) {
      width: calc(100% / 2);
    }
  }
  .q-tab__indicator {
    background: #027be3;
  }
  .q-tab--active {
    border-bottom: none !important;
    background-color: #d5d5d5;
  }
}
.contractProfile {
  display: flex;
  justify-content: space-evenly;
}
.contractProfileWrap {
  .q-tabs {
    border-bottom: 3px solid gray;
  }
}
</style>

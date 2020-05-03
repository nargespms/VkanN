<template >
  <div class="serviceProfileWrap">
    <q-card>
      <div class></div>
      <div>
        <q-tabs v-model="tab" class="block640">
          <q-tab class="tabSelect" label name="serviceProfile">{{ $t('serviceInformation') }}</q-tab>
          <q-tab
            class="tabSelect"
            label
            name="serviceEdit"
            v-if="$store.state.module1.userData.role === 'MANAGER'"
          >{{ $t('edit') }}</q-tab>
        </q-tabs>

        <q-tab-panels v-if="!isLoading" v-model="tab" animated>
          <q-tab-panel name="serviceProfile" class="flex">
            <div class="serviceProfileAvatar">
              <div class="avatarWrapp">
                <img src="~assets/Default-user.png" />
                <p class="absolute-bottom text-h6 choosePhoto">{{ $t('choosePhoto') }}</p>
              </div>
            </div>
            <serviceProfileCmp :data="serviceData" />
          </q-tab-panel>

          <q-tab-panel name="serviceEdit" v-if="$store.state.module1.userData.role === 'MANAGER'">
            <serviceEditCmp @tabChanged="tabChanged" :data="serviceData" />
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

  components: {
    serviceProfileCmp,

    serviceEditCmp,
  },
  data() {
    return {
      tab: 'serviceProfile',
      serviceData: {},
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
      .get(`/v1/api/vkann/services/${this.$route.params.serviceId}`)
      .then(res => {
        console.log(res);
        this.serviceData = res.data.service;
        this.isLoading = false;
      })
      .catch(e => {
        if (e.response.status === 422) {
          this.$q.notify({
            message: this.$t('serviceUnvalid'),
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
.serviceProfileAvatar {
  @media screen and (max-width: 800px) {
    display: none;
  }
  @media screen and (min-width: 800px) {
    display: block;
    width: 19%;
    display: flex;
    align-self: center;
  }
  img {
    width: 100%;
  }
}
.serviceProfileWrap {
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
.avatarWrapp {
  position: relative;
}
// .userAvatar {
//   width: calc(100% / 6);
//   padding-right: 16px;
//   @media screen and (max-width: 1024px) and (min-width: 640px) {
//     width: 30%;
//   }
//   @media screen and (max-width: 640px) {
//     width: 100%;
//     margin-bottom: 16px;
//   }
//   img {
//     width: 100%;
//   }
// }
.choosePhoto {
  cursor: pointer;
  background-color: #38373799;
  padding: 12px;
  text-align: center;
  color: #fff;
  font-size: 15px;
}
.usrInfoAvatar {
  padding: 12px;
}
</style>

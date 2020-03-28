<template>
  <div class="invoiceProfileWrap">
    <q-btn
      color="primary"
      icon="print"
      @click="goToPrint"
      class="printInvoiceBut"
    >
      <q-tooltip
        v-model="showing"
        transition-show="scale"
        transition-hide="scale"
        >{{ $t('print') }}&nbsp;{{ $t('invoice') }}</q-tooltip
      >
    </q-btn>

    <q-card class="clearme">
      <div>
        <q-tabs v-model="tab" class="block640">
          <q-tab class="tabSelect" label name="invoiceProfile">{{
            $t('invoiceInformation')
          }}</q-tab>
          <q-tab class="tabSelect" label name="invoiceEdit">{{
            $t('edit')
          }}</q-tab>
        </q-tabs>

        <q-tab-panels v-if="!isLoading" v-model="tab" animated>
          <q-tab-panel name="invoiceProfile" class="invoiceProfile">
            <invoiceProfileCmp />
          </q-tab-panel>

          <q-tab-panel name="invoiceEdit">
            <addInvoiceTable
              profileMode="Edit"
              class="EditInvoiceTable"
              @tabChanged="tabChanged"
              :data="invoiceData"
            />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </q-card>
  </div>
</template>

<script>
import invoiceProfileCmp from './invoiceProfileCmp.vue';
import addInvoiceTable from './addInvoiceTable.vue';

export default {
  name: 'invoiceProfile',
  components: {
    invoiceProfileCmp,
    addInvoiceTable,
  },
  data() {
    return {
      tab: 'invoiceProfile',
      invoiceData: {},
      isLoading: false,
      showing: false,
    };
  },
  methods: {
    tabChanged(value) {
      this.tab = value;
      console.log(value);
      this.$emit('reRender', true);
    },
    goToPrint() {
      this.$router.push({
        path: `/${this.$route.params.locale}/print/invoice/${this.$route.params.invoiceId}`,
      });
    },
  },
  mounted() {
    console.log(this.$route.params.invoiceId);
    // this.$axios
    //   .get(`/v1/api/vkann/invoices/${this.$route.params.invoiceId}`)
    //   .then(res => {
    //     console.log(res);
    //     this.invoiceData = res.data.invoice;
    //     this.isLoading = false;
    //   })
    //   .catch(e => {
    //     if (e.response.status === 422) {
    //       this.$q.notify({
    //         message: this.$t('invoicesUnvalid'),
    //         color: 'negative',
    //         icon: 'warning',
    //         position: 'top',
    //       });
    //     }
    //   });
  },
};
</script>

<style lang="scss">
.invoiceImg {
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
.invoiceProfileWrap {
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
.invoiceProfile {
  display: flex;
  justify-content: space-evenly;
  @media screen and (max-width: 800px) {
    display: block;
  }
}
.invoiceProfileWrap {
  .q-tabs {
    border-bottom: 3px solid gray;
  }
}
.printInvoiceBut {
  float: right;
  margin: 12px;
}
</style>

<template>
  <div class="invoiceProfileWrap">
    <router-link
      :to="`/${this.$route.params.locale}/print/invoice/${this.$route.params.invoiceId}`"
      target="_blank"
      class="float"
    >
      <q-btn color="primary" icon="print" class="printInvoiceBut">
        <q-tooltip
          v-model="showing"
          transition-show="scale"
          transition-hide="scale"
        >{{ $t('print') }}&nbsp;{{ $t('invoice') }}</q-tooltip>
      </q-btn>
    </router-link>
    <q-btn
      @click="payProcess"
      color="primary"
      :label="$t('payment')"
      class="printInvoiceBut float"
      :disable="printData.status === 'PAID'"
    >
      <q-tooltip
        v-model="showing1"
        transition-show="scale"
        transition-hide="scale"
      >{{ $t('payment') }}</q-tooltip>
    </q-btn>

    <q-card class="clearme">
      <div>
        <q-tabs v-model="tab" class="block640">
          <q-tab class="tabSelect" label name="invoiceProfile">
            {{
            $t('invoiceInformation')
            }}
          </q-tab>
          <q-tab
            class="tabSelect"
            label
            name="invoiceEdit"
            v-if="$store.state.module1.userData.user.role === 'MANAGER'"
          >
            {{
            $t('edit')
            }}
          </q-tab>
        </q-tabs>

        <q-tab-panels v-if="!isLoading" v-model="tab" animated>
          <q-tab-panel name="invoiceProfile" class="invoiceProfile">
            <invoiceProfileCmp :printData="printData" />
          </q-tab-panel>

          <q-tab-panel
            name="invoiceEdit"
            v-if="$store.state.module1.userData.user.role === 'MANAGER'"
          >
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
    <q-btn
      @click="payProcess"
      color="primary"
      :label="$t('payment')"
      class="centerPayBut"
      :disable="printData.status === 'PAID' || printData.status === 'PENDING'"
    >
      <q-tooltip
        v-model="showing2"
        transition-show="scale"
        transition-hide="scale"
      >{{ $t('payment') }}</q-tooltip>
    </q-btn>
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
      isLoading: true,
      showing: false,
      showing1: false,
      showing2: false,
      printData: {},
    };
  },
  methods: {
    payProcess() {
      this.$axios
        .get(
          `/v1/api/vkann/transaction/payment/parspal/${this.$route.params.invoiceId}`
        )
        .then(res => {
          console.log(res);
        });
    },
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
    this.$axios
      .get(`/v1/api/vkann/invoices/${this.$route.params.invoiceId}`)
      .then(res => {
        this.printData = res.data.invoice;
        // this.invoice.cash = res.data.invoice.cash;
        // this.invoice.currency = res.data.invoice.currency;
        // this.invoice.items = res.data.invoice.items;
        this.isLoading = false;
      });
  },
};
</script>

<style lang="scss">
.centerPayBut {
  margin: 12px auto;
  width: 200px;
  display: block;
}
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

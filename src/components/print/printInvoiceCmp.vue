<template >
  <div class="printInvoiceWrap">
    <!-- header of invoice -->
    <div class="printInvoiceHeader">
      <div class="logo"></div>
      <div class="status">
        <h4>{{ $store.state.module1.invoice.status }}</h4>
        <span class="expireDate">
          <span>{{$t('expireDate')}} :</span>
          <span>{{$store.state.module1.invoice.enddate}}</span>
        </span>
        <q-btn color="primary" class="pay">{{$t('pay')}}</q-btn>
      </div>
    </div>
    <!-- content of invooice -->
    <div class="printInvoiceContent">
      <div class="client">
        <p>{{$t('invoiceFor')}}:</p>
        <h6>{{$store.state.module1.invoice.serviceName}}</h6>
        <h6>{{$store.state.module1.invoice.client}}</h6>
        <!-- paying method -->
        <div class="paymentMethodWrap">
          <span class="boldTitle14">{{$t('paymentMethod')}}</span>
          <q-select
            color="light-blue-10 "
            filled
            required
            autofocus
            :options="paymentMethods"
            :label="$t('paymentMethod')"
            class="inputStyle"
            v-model="paymentMethod"
            lazy-rules
            :rules="[val => val && val.length > 0]"
          >
            <template v-slot:prepend>
              <q-icon name="billing" />
            </template>
            <!-- client Name -->
          </q-select>
        </div>
      </div>
      <div class="creator">
        <div class="pb12">
          <span class="boldTitle14">{{$t('companyDetails' )}}:</span>
          <span>aasaam.com</span>
        </div>
        <div>
          <span class="boldTitle14">{{$t('startDate')}}:</span>
          <span>{{ $store.state.module1.invoice.startdate}}</span>
        </div>
      </div>
    </div>
    <!--  invoice items -->
    <div class="invoiceItemsWrap">
      <div class="invoiceItemContent">
        <q-table
          :title="$t('invoiceItems')"
          :data="tableData"
          :columns="columns"
          row-key="desc"
          hide-bottom
          dense
        />
        <div class="invoiceSubTotal">
          <span>{{$t('subTotal')}}</span>
          <span>({{ $t(`${$store.state.module1.invoice.currency}`) }}) :</span>
          <span>{{$store.state.module1.invoice.invoiceTotalAmount}}</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'printInvoiceCmp',
  data() {
    return {
      tableData: this.$store.state.module1.invoice.items,
      columns: [
        {
          name: 'desc',
          required: true,
          label: this.$t('description'),
          align: 'left',
          field: row => row.desc,
          format: val => `${val}`,
          sortable: false,
        },
        {
          name: 'amount',
          required: true,
          label: this.$t('price'),
          align: 'left',
          field: row => row.amount,
          format: val => `${val}`,
          sortable: false,
        },
      ],
      paymentMethods: ['پرداخت آنلاین کارتهای شتابی', 'دیگر'],
      paymentMethod: 'پرداخت آنلاین کارتهای شتابی',
    };
  },
};
</script>

<style lang="scss">
.printInvoiceWrap {
  width: 1000px;
  margin: 32px auto;
  background-color: #fff;
  border: 1px solid #b7b7b7;
  padding: 48px 12px;
}
.printInvoiceHeader {
  overflow: auto;
  border-bottom: 1px solid #d5d5d5;
  padding-bottom: 16px;
  .logo {
    background-image: url('../../../node_modules/@aasaam/information/logo/aasaam-typo.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 160px;
    width: 50%;
    float: left;
  }
  .status {
    width: 50%;
    float: left;
    text-align: center;
    h4 {
      font-size: 30px;
      color: #d30000;
    }
    .pay {
      display: block;
      margin: 16px auto;
      width: 135px;
    }
  }
}
.printInvoiceContent {
  overflow: auto;
  padding-top: 16px;
  border-bottom: 1px solid #d5d5d5;
  padding-bottom: 16px;

  .client {
    width: 50%;
    float: left;
    text-align: center;

    p {
      font-weight: bold;
    }
    h6 {
      font-size: 15px;
      font-weight: normal;
    }
  }
  .creator {
    width: 50%;
    float: left;
    text-align: center;
  }
  .q-table__card {
    box-shadow: unset !important;
  }
  [dir] .q-table__card {
    background-color: #fff;
    border-radius: 4px;
    box-shadow: unset !important;
  }
}
.paymentMethodWrap {
  width: 60%;
  margin: 32px auto;
  text-align: left;
  .boldTitle14 {
    padding-bottom: 16px;
    display: inline-block;
  }
}
.invoiceItemContent {
  margin-top: 16px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;

  .q-table__top {
    background-color: #dad8e1;
  }
  .q-table td {
    text-align: center;
    padding: 8px;
  }
  .q-table th {
    text-align: center;
    padding: 12px;
  }
  [dir] .q-table__card {
    box-shadow: unset !important;
  }
}
.invoiceSubTotal {
  padding: 12px;
  background-color: #dad8e1;
  text-align: center;
}
</style>

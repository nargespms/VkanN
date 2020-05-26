<template>
  <div class="printInvoiceWrap">
    <!-- header of invoice -->
    <div class="printInvoiceHeader">
      <div class="logo">
        <img src="../../assets/aasaam.png" alt />
      </div>
      <div class="status">
        <h4>{{ $store.state.module1.invoice.status }}</h4>
        <span class="expireDate">
          <span>{{ $t('expireDate') }} :</span>
          <span>{{ $store.state.module1.invoice.enddate }}</span>
        </span>
        <q-btn color="primary" class="pay">{{ $t('pay') }}</q-btn>
      </div>
    </div>
    <!-- content of invooice -->
    <div class="printInvoiceContent">
      <div class="client">
        <p>{{ $t('invoiceFor') }}:</p>
        <h6>{{ $store.state.module1.invoice.serviceName }}</h6>
        <h6>{{ $store.state.module1.invoice.client }}</h6>
        <!-- paying method -->
        <div class="paymentMethodWrap">
          <span class="boldTitle14">{{ $t('paymentMethod') }}</span>
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
          <span class="boldTitle14">{{ $t('companyDetails') }}:</span>
          <span>aasaam.com</span>
        </div>
        <div>
          <span class="boldTitle14">{{ $t('startDate') }}:</span>
          <span>{{ $store.state.module1.invoice.startdate }}</span>
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
        >
          <!-- custom cols -->
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th v-for="col in columns" :key="col.name" :props="props">
                <span class="boldTitle12" v-if="col.label !== 'id'">{{col.label}}</span>
              </q-th>
            </q-tr>
          </template>
          <!-- custom body -->
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td v-for="prop in props.row" :key="prop.id">
                <span v-if="prop == props.row['desc']">{{ props.row.desc }}</span>
                <span v-if="prop == props.row['priodStartdate']">{{ props.row.priodStartdate}}</span>
                <span v-if="prop == props.row['periodEnddate']">{{ props.row.periodEnddate }}</span>
                <span v-if="prop == props.row['amount']">
                  {{ props.row.amount }}
                  {{ $t(`${$store.state.module1.invoice.currency}`) }}
                  <!-- names with link -->
                </span>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <div class="invoiceSubTotal">
          <span>{{ $t('subTotal') }}</span>
          <span>({{ $t(`${$store.state.module1.invoice.currency}`) }}) :</span>
          <span>{{ $store.state.module1.invoice.invoiceTotalAmount }}</span>
        </div>
      </div>
    </div>
    <div class="backtoProWrap">
      <q-btn color="primary" class="mr12" @click="goBack">{{$t('returnTo')}} {{$t('previousStep')}}</q-btn>
      <q-btn color="primary" icon="print" @click="goToPrint" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'previewInvoiceCmp',
  data() {
    return {
      tableData: this.$store.state.module1.invoice.items,
      columns: [
        {
          name: 'id',
          required: true,
          label: this.$t('id'),
          align: 'left',
          field: row => row.id,
          format: val => `${val}`,
          sortable: false,
        },

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
          name: 'priodStartdate',
          required: true,
          label: this.$t('priodStartdate'),
          align: 'left',
          field: row => row.priodStartdate,
          format: val => `${val}`,
          sortable: false,
        },
        {
          name: 'periodEnddate',
          required: true,
          label: this.$t('periodEnddate'),
          align: 'left',
          field: row => row.periodEnddate,
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
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goToPrint() {
      this.$router.push({
        path: `/${this.$route.params.locale}/print/invoice`,
      });
    },
  },
};
</script>

<style lang="scss">
.backtoProWrap {
  margin-top: 32px;
  display: flex;
  justify-content: center;
  button {
    width: 200px;
    text-align: center;
  }
}

.printInvoiceWrap {
  width: 1000px;
  margin: 32px auto;
  background-color: #fff;
  border: 1px solid #b7b7b7;
  padding: 48px 12px;
  .q-table td:first-child {
    display: none;
  }
  .q-table th:first-child {
    display: none;
  }
}
.printInvoiceHeader {
  overflow: auto;
  border-bottom: 1px solid #d5d5d5;
  padding-bottom: 16px;
  .logo {
    text-align: center;
    height: 160px;
    width: 50%;
    float: left;
    img {
      width: 160px;
      height: 160px;
    }
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
    padding: 12px 2px;
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

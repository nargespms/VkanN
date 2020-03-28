<template>
  <div v-if="!isLoading" class="printInvoiceWrapper">
    <p v-if="printData.type === 'QUOTE'" class="invoiceTypeShow">
      {{ $t(printData.type) }}
    </p>
    <div class="printHeaderInvoice">
      <div class="invoiceLogo">
        <img src="../../assets/aasaam.png" alt />
      </div>
      <div class="invoiceName">
        <p class="beginningMsg boldTitle14 mb16">{{ $t('inTheNameOfGod') }}</p>
        <p class="beginningMsg boldTitle14">
          {{ $t('invoice') }} {{ $t('aasaam') }}
        </p>
      </div>
      <div class="invoiceDateWrapper">
        <div class="invoiceNumber">
          <span class="pr24">{{ $t('serialNumber') }} :</span>
          <span class="serialNumberBox">{{ printData.number }}</span>
        </div>

        <div class="invoiceDate">
          <span class="pr24">{{ $t('date') }} :</span>
          <span class="serialNumberBox">{{
            new Date(printData.issueDate).toLocaleDateString(
              `${$route.params.locale}`
            )
          }}</span>
        </div>
      </div>
    </div>
    <!-- seller -->
    <div class="border8bl sellerDetails">
      <span class="boldTitle15">{{ $t('sellerDetails') }}</span>
    </div>
    <div class="invoiceDetailsFields">
      <ul class="invoiceDetailsList">
        <li>
          <span>{{ $t('jurdicalNamePerson') }} :</span>
          &nbsp;

          <span>{{ aasaamInfo.legalName }}</span>
        </li>
        <li>
          <span>{{ $t('economyCode') }} :</span>
          &nbsp;
          <span class="rtl float pl16">{{ aasaamInfo.taxID }} </span>
        </li>
        <li>
          <span>{{ $t('nationalIdORregisterNum') }} :</span>
          &nbsp;
          <span class="rtl float pl16">{{ aasaamInfo.leiCode }} </span>
        </li>
        <li>
          <span>{{ $t('fullAdress') }} :</span>
          &nbsp;
          <span>{{ aasaamInfo.address.addressLocality }}</span>
        </li>
        <li>
          <span>{{ $t('postalCode') }} :</span>
          &nbsp;
          <span class="rtl float pl16">{{
            aasaamInfo.address.postalCode
          }}</span>
        </li>
        <li>
          <span>{{ $t('telephoneNumberORfax') }} :</span>
          &nbsp;
          <span class="rtl float pl16">{{
            aasaamInfo.contactPoint.telephone
          }}</span>
        </li>
      </ul>
    </div>
    <!-- customer -->
    <div class="border8bl">
      <span class="boldTitle15">{{ $t('customerDetails') }}</span>
    </div>
    <div class="invoiceDetailsFields">
      <ul class="invoiceDetailsList">
        <li>
          <span>{{ $t('jurdicalORNaturalNamePerson') }} :</span>
          <span class="pl16">{{ printData.client.firstName }} </span>
          &nbsp;

          <span>{{ printData.client.lastName }} </span>
          <span></span>
        </li>
        <li>
          <span>{{ $t('economyCode') }} :</span>
        </li>
        <li>
          <span>{{ $t('nationalIdORregisterNum') }} :</span>
          <span class="pl16">{{ printData.client.nationalId }}</span>
        </li>
        <li>
          <span>{{ $t('fullAdress') }} :</span>
        </li>
        <li>
          <span>{{ $t('postalCode') }} :</span>
        </li>
        <li>
          <span>{{ $t('telephoneNumberORfax') }} :</span>
        </li>
      </ul>
    </div>
    <!-- product or services -->
    <div class="border8bl mb8">
      <span class="boldTitle15">{{ $t('productDetailsORService') }}</span>
    </div>
    <!-- table for services -->
    <table class="servicesTable">
      <tr>
        <th>{{ `${this.localizeNumber(1)}` }}</th>
        <th>{{ this.localizeNumber(2) }}</th>
        <th>{{ this.localizeNumber(3) }}</th>
        <th>{{ this.localizeNumber(4) }}</th>
        <th>{{ this.localizeNumber(5) }}</th>
        <th>{{ this.localizeNumber(6) }}</th>
        <th>{{ this.localizeNumber(7) }}</th>
        <th>{{ this.localizeNumber(8) }}</th>
        <th>{{ this.localizeNumber(9) }}</th>
        <th>{{ this.localizeNumber(10) }}</th>
        <th>{{ this.localizeNumber(11) }}</th>
      </tr>
      <tr>
        <th>ردیف</th>
        <th>کدکالا</th>
        <th>شرح کالا یا خدمات</th>
        <th>تعداد/مقدار</th>
        <th>واحد اندازه گیری</th>
        <th>مبلغ واحد</th>
        <th>مبلغ کل</th>
        <th>مبلغ تخفیف</th>
        <th>مبلغ کل پس از تخفیف</th>
        <th>جمع مالیات و عوارض</th>
        <th>جمع مبلغ کل بعلاوه مالیات و عوارض</th>
      </tr>
      <tr>
        <th colspan="6">نحوه محاسبه بر اساس شماره ستون</th>
        <th>
          {{ `${this.localizeNumber(4)}` + '*' + `${this.localizeNumber(6)}` }}
        </th>
        <th></th>
        <th>
          {{ `${this.localizeNumber(7)}` + '-' + `${this.localizeNumber(8)}` }}
        </th>
        <th>
          {{
            `${this.localizeNumber(9)}` +
              '%' +
              '*' +
              `${this.localizeNumber(9)}`
          }}
        </th>
        <th>
          {{
            `${this.localizeNumber(9)} ` + '+' + `${this.localizeNumber(10)}`
          }}
        </th>
      </tr>
      <!-- data in invoice -->

      <template v-for="item in invoice.items">
        <showItemsTable
          :key="item.id"
          :data="item"
          :currency="invoice.currency"
          :profileMode="'show'"
        />
      </template>

      <!-- data in invoice -->
      <tr style="background-color: #a8a8a8;">
        <td colspan="6">جمع کل</td>
        <td></td>
        <td></td>
        <td v-if="!printData.official">
          {{ printData.total }}
          {{ $t(printData.currency) }}
        </td>
        <td></td>
        <td></td>
        <td v-if="printData.official">
          {{ printData.total }}
          {{ $t(printData.currency) }}
        </td>
        <td v-if="printData.official"></td>
      </tr>
    </table>

    <!-- description Wrapper -->
    <div class="printInvoiceDescWrap">
      <div class="border8w50 flexSEL">
        <span>شرایط و نحوه ی فروش :</span>
        <span class="flexSEL">
          <q-radio
            v-model="invoice.cash"
            :val="true"
            :label="this.$t('cash')"
            color="primary"
            dense
            disable
          />
        </span>
        <span class="flexSEL">
          <q-radio
            v-model="invoice.cash"
            :val="false"
            :label="this.$t('nocash')"
            color="primary"
            dense
            disable
          />
        </span>
      </div>

      <div class="border8w50 left pl16 cardNumberWrap">
        <span>شماره کارت</span>
        <span>{{ printData.cardNumber }}</span>
      </div>
    </div>
    <div class="border8bl mt8 left desc">
      <span>{{ $t('description') }} :</span>
      <span>{{ printData.description }}</span>
    </div>
    <div class="flexbet mt8">
      <div class="border8w50">
        <span>مهر و امضا خریدار :</span>
      </div>
      <div class="border8w50">
        <span>مهر و امضا فروشنده :</span>
      </div>
    </div>

    <!-- description Wrapper -->
  </div>
</template>

<script>
import faOrganization from '../../../node_modules/@aasaam/information/info/fa/Organization.json';
// import { enOrganization } from '../../../node_modules/@aasaam/information/info/en';
import showItemsTable from '../invoices/showItemsTable.vue';

export default {
  name: 'printInvoiceCmp',
  components: { showItemsTable },
  data() {
    return {
      printData: {},
      aasaamInfo: faOrganization,
      isLoading: true,
      profileMode: 'show',
      invoice: {
        cash: '',
        items: [],
        currency: '',
      },
    };
  },

  methods: {
    // for showing localize number
    localizeNumber(value) {
      return value.toLocaleString(`${this.$route.params.locale}`);
    },
  },
  mounted() {
    console.log(this.$route.params.invoiceId);
    this.$axios
      .get(`/v1/api/vkann/invoices/${this.$route.params.invoiceId}`)
      .then(res => {
        console.log(res.data);
        this.printData = res.data;
        this.invoice.cash = res.data.cash;
        this.invoice.currency = res.data.currency;
        this.invoice.items = res.data.items;
        this.isLoading = false;
      });
  },
};
</script>

<style lang="scss">
.printInvoiceWrapper {
  width: 95%;
  margin: 12px auto;
}
.printHeaderInvoice {
  display: flex;
  justify-content: space-between;
}
.invoiceLogo {
  width: 300px;
  text-align: left;
  img {
    width: 120px;
    height: 120px;
  }
}
.invoiceDateWrapper {
  width: 300px;
  text-align: right;
  align-self: self-end;
  padding-bottom: 4px;
  .serialNumberBox {
    border: 1px solid #000;
    padding: 8px 4px;
    text-align: right;
    width: 150px;
    display: inline-block;
  }
  .invoiceDate {
    margin-top: 2px;
    display: flex;
    justify-content: flex-end;
  }
}

.border8bl {
  width: 100%;
  border: 1px solid #000;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
}
.invoiceName {
  align-self: center;
}
.invoiceDetailsFields {
  border: 1px solid #000;
  border-radius: 20px;
  padding: 12px 46px;
  .invoiceDetailsList {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    li {
      padding: 0px 12px;
      width: 460px;
      margin: 8px 0px;
      display: flex;
    }
  }
}
.servicesTable {
  border: 1px solid #000;
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 48px;
  th,
  td {
    border: 1px solid #000;
    font-weight: normal;
    text-align: center;
    padding: 8px;
  }
}
.printInvoiceDescWrap {
  display: flex;
  justify-content: space-between;
}
.border8w50 {
  width: calc(100% / 2 - 8px);
  border: 1px solid #000;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
}
.flexSEL {
  display: flex;
  justify-content: space-evenly;
}
.flexbet {
  display: flex;
  justify-content: space-between;
}
.rec {
  border: 1px solid #000;
  width: 15px;
  height: 15px;
  display: flex;
  align-self: center;
  margin-left: 12px;
}
.left {
  text-align: left;
}
.desc {
  padding: 12px 46px;
  min-height: 100px;
}
.cardNumberWrap {
  display: flex;
  justify-content: space-evenly;
}
.invoiceTypeShow {
  background-color: #42df09a3;
  padding: 8px 40px;
  position: absolute;
  left: -34px;
  top: 13px;
  -ms-transform: rotate(20deg);
  transform: rotate(-45deg);
  z-index: 1;
}
</style>

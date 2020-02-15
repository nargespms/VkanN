<template>
  <div class="printInvoiceWrapper">
    <div class="printHeaderInvoice">
      <div class="invoiceDateWrapper">
        <div class="invoiceNumber">
          <span class="pr24">{{ $t('serialNumber') }} :</span>
          <span class="serialNumberBox"></span>
        </div>

        <div class="invoiceDate">
          <span class="pr24">{{ $t('date') }} :</span>
          <span class="serialNumberBox"></span>
        </div>
      </div>
    </div>

    <!-- customer -->
    <div class="border8bl">
      <span class="boldTitle15">{{ $t('customerDetails') }}</span>
    </div>
    <div class="invoiceDetailsFields">
      <ul class="invoiceDetailsList">
        <li>
          <span>{{ $t('jurdicalORNaturalNamePerson') }} :</span>
          <!-- client Name -->

          <singleAutoCompleteSelectBox
            :options="clients"
            :optionLable="'firstName'"
            :optionValue="'id'"
            :name="'clientName'"
            label="firstName"
            class="pt20"
            @getAutoCompleteValue="getAutoCompleteValueclient"
          />
        </li>
        <li>
          <span>{{ $t('economyCode') }} :</span>
        </li>
        <li>
          <span>{{ $t('nationalIdORregisterNum') }} :</span>
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
          {{ `${this.localizeNumber(9)}` + '%' + '*' + `${this.localizeNumber(9)}` }}
        </th>
        <th>
          {{ `${this.localizeNumber(9)} ` + '+' + `${this.localizeNumber(10)}` }}
        </th>
      </tr>
      <!-- data in invoice -->
      <tr style="background-color:#d9d9d9">
        <td>.......</td>
        <td>.......</td>
        <td>.......</td>
        <td>.......</td>
        <td>.......</td>
        <td>.......</td>
        <td>.......</td>
        <td>.......</td>
        <td>.......</td>
        <td>.......</td>
        <td>.......</td>
      </tr>
      <!-- data in invoice -->

      <tr style="background-color: #a8a8a8;">
        <td colspan="6">جمع کل</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>

    <!-- description Wrapper -->
    <div class="printInvoiceDescWrap">
      <div class="border8w50 flexSEL">
        <span>شرایط و نحوه ی فروش :</span>
        <span class="flexSEL">
          نقدی
          <span class="rec"></span>
        </span>
        <span class="flexSEL">
          غیر نقدی
          <span class="rec"></span>
        </span>
      </div>
      <div class="border8w50 left pl16">
        <span>شماره کارت</span>
      </div>
    </div>
    <div class="border8bl mt8 left desc">
      <span>{{ $t('description') }} :</span>
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
import singleAutoCompleteSelectBox from '../structure/singleAutoCompleteSelectBox.vue';

export default {
  name: 'addInvoiceTable',
  components: {
    singleAutoCompleteSelectBox,
  },
  data() {
    return {
      clients: [],
      invoice: {
        client: '',
      },
    };
  },

  methods: {
    getAutoCompleteValueclient(value) {
      // console.log(value.id);
      this.invoice.client = value.id;
    },

    // for showing localize number
    localizeNumber(value) {
      return value.toLocaleString(`${this.$route.params.locale}`);
    },
  },
  mounted() {
    this.$axios.get('/v1/api/vkann/users/get-clients').then(res => {
      this.clients = res.data.users;
      this.clientsLable = this.clients.map(v => v.firstName);
      this.clientsid = this.clients.map(v => v.id);
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
  overflow: auto;
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
  float: right;
  width: 300px;
  text-align: right;
  // align-self: self-end;
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
      width: 500px;
      margin: 8px 0px;
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
</style>

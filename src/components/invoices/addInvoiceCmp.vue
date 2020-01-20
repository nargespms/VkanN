<template >
  <div class="col3th">
    <q-form @submit="onSubmit" class="q-gutter-md" :error="$v.invoice.$error">
      <div class="clear w100 m0res">
        <div class="col1">
          <!--  Service name -->
          <q-select
            color="light-blue-10 "
            outlined
            required
            autofocus
            v-model.trim="invoice.serviceName"
            :options="servicesName"
            :label="$t('serviceName')"
            class="inputStyle"
            lazy-rules
            :rules="[val => val && val.length > 0]"
          >
            <template v-slot:prepend>
              <q-icon name="settings_applications" />
            </template>
            <!-- client Name -->
          </q-select>
          <q-select
            color="light-blue-10 "
            required
            outlined
            v-model.trim="invoice.client"
            :options="clients"
            :label="$t('clientName')"
            class="inputStyle"
            lazy-rules
            :rules="[val => val && val.length > 0]"
          >
            <template v-slot:prepend>
              <q-icon name="fas fa-user" />
            </template>
          </q-select>
          <!--  start date & end date should be date picker -->
          <!-- <q-date v-model="date" calendar="persian" today-btn></q-date> -->
          <!-- <q-date v-model="date" minimal calendar="persian" /> -->
          <!-- start date -->
          <q-input
            outlined
            v-model.trim="invoice.startdate"
            mask="date"
            :rules="['date']"
            :label="$t('startDate')"
            ref="qDateProxy"
            name="event"
            @blur="EnableDate"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date
                    v-model.trim="invoice.startdate"
                    @input="() => $refs.qDateProxy.hide()"
                    today-btn
                    calendar="persian"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <!-- end date -->
          <q-input
            outlined
            v-model.trim.lazy="$v.invoice.enddate.$model"
            mask="date"
            :rules="['date']"
            :label="$t('endDate')"
            :disable="!this.enableEndDate"
            @blur="$v.invoice.enddate.$touch"
            :error="$v.invoice.enddate.$error"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date
                    v-model.trim="invoice.enddate"
                    @input="() => $refs.qDateProxy.hide()"
                    today-btn
                    calendar="persian"
                    :options="computeEnddate"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <p class="error ptb12" v-if="errors">
            <span v-if="!$v.invoice.timeChecker">
              <q-icon name="warning" class="pr12 pt4" />
              {{ $t('DateUnvalid') }}
            </span>
          </p>
        </div>
        <div class="col2">
          <!-- tags -->
          <tagsSelection @addTagFn="addTagFn" />
          <!-- status -->
          <q-select
            color="light-blue-10"
            outlined
            v-model.trim="invoice.status"
            :options="invoiceStatus"
            :label="$t('status')"
            class="inputStyle pt20"
            required
            :rules="[val => val && val.length > 0]"
          >
            <template v-slot:prepend>
              <q-icon name="fas fa-exclamation-circle" />
            </template>
          </q-select>
          <!-- invoice type -->
          <q-select
            color="light-blue-10 "
            outlined
            v-model.trim="invoice.type"
            :options="invoiceType"
            :label="$t('type')"
            class="inputStyle"
            required
            :rules="[val => val && val.length > 0]"
          >
            <template v-slot:append>
              <q-icon name />
            </template>
          </q-select>
          <!-- crrency -->
          <q-select
            color="light-blue-10 "
            outlined
            required
            v-model.trim="invoice.currency"
            :options="invoiceCurrency"
            :label="$t('currency')"
            lazy-rules
            :rules="[val => val && val.length > 0]"
          >
            <template v-slot:append>
              <q-icon name />
            </template>
          </q-select>
        </div>
        <div class="col3">
          <div class="w100">
            <uploadfile :UploadButton="false" ref="upload" :text="'attachments'" />
          </div>
        </div>
      </div>
      <div class="invoiceItemsWrap">
        <invoiceItem @addNewItem="addNewItem" @totalAmount="totalAmount" />
      </div>
      <div class="invoiceTotalAmountWrap">
        <h5>
          {{$t('subTotal')}}
          <span v-if="invoice.currency.length">({{$t(`${invoice.currency}`)}})</span>
        </h5>
        <div class="invoiceTotalAmount">{{invoiceTotalAmount}}</div>
      </div>
      <div class="saveButtons">
        <q-btn class="savebutton mr12" color="primary" type="submit">{{ $t('save') }}</q-btn>
        <!-- <q-btn color="grey " icon="fas fa-search">
          <q-tooltip
            v-model="showing"
            transition-show="scale"
            transition-hide="scale"
          >{{ $t('view') }}</q-tooltip>
        </q-btn>-->
      </div>
    </q-form>
  </div>
</template>


<script>
import uploadfile from '../structure/uploadfile.vue';
import tagsSelection from '../structure/tagsSelection.vue';
import invoiceItem from './invoiceItem.vue';

export default {
  name: 'addInvoice',
  components: {
    uploadfile,
    tagsSelection,
    invoiceItem,
  },
  data() {
    return {
      showing: false,
      // data for validation
      uiState: 'submit not clicked',
      errors: false,
      empty: true,
      // data for validation
      servicesName: ['name1', 'name2', 'name3'],
      clients: ['client1', 'client2', 'client3'],
      invoiceDuration: [12, 13, 14],
      invoiceStatus: ['status1', 'status2', 'status3'],
      invoiceType: ['FORMAL', 'INFORMAL'],
      invoiceCurrency: ['RIAL', 'DOLLER', 'EURO'],
      date: this.today,
      enddate: '1212112',
      enableEndDate: false,
      invoice: {
        serviceName: '',
        client: '',
        number: '',
        status: '',
        type: '',
        currency: '',
        startdate: '',
        enddate: '',
        tags: [],
        items: [],
        invoiceTotalAmount: 0,
      },
      invoiceTotalAmount: 0,
    };
  },
  validations: {
    invoice: {
      timeChecker(value) {
        return (
          new Date(value.startdate).getTime() <
          new Date(value.enddate).getTime()
        );
      },
      enddate: {},
    },
  },
  methods: {
    totalAmount(value) {
      this.invoiceTotalAmount = value;
      this.invoice.invoiceTotalAmount = value;
      console.log(this.invoice);
    },
    addNewItem(value) {
      this.invoice.items = value;
      console.log(value);
    },
    addTagFn(value) {
      this.invoice.tags = value;
    },
    computeEnddate(enddate) {
      return enddate >= this.invoice.startdate;
    },
    onSubmit() {
      this.empty = !this.$v.invoice.$anyDirty;
      this.errors = this.$v.invoice.$anyError;
      this.uiState = 'submit clicked';
      if (this.errors === false && this.empty === false) {
        console.log(this.invoice);
        const standardStartDate = new Date(this.invoice.startdate);
        const standardEndDate = new Date(this.invoice.enddate);
        console.log(standardStartDate);
        console.log(standardEndDate);
        this.$refs.upload.submit_btn();
        // send data to server
        this.$store.commit('module1/sendInvoiceData', this.invoice, {
          module: 'module1',
        });
        this.$router.push({
          path: `/${this.$route.params.locale}/print/invoice`,
        });

        // send data to server
      } else {
        this.$q.notify({
          message: this.$t('Theformabovehaserrors'),
          color: 'negative',
          icon: 'warning',
          position: 'top',
        });
      }
    },
    EnableDate() {
      if (this.invoice.startdate.length > 0) {
        this.enableEndDate = true;
      }
    },
  },

  computed: {
    today() {
      return new Date();
    },
  },
};
</script>

<style lang="scss">
.description {
  resize: vertical;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  padding: 10px;
}
.saveButtons {
  clear: both;
  display: flex;
  justify-content: center;
  .savebutton {
    width: 350px;
  }
}
.invoiceItemsWrap {
  overflow: auto;
  margin-top: 0;
}

.invoiceTotalAmountWrap {
  float: right;
  width: 34%;
  padding-left: 20px;
  margin-bottom: 16px;
  h5 {
    color: #4f4f4f;
    font-size: 16px;
    padding: 8px 4px;
  }
  .invoiceTotalAmount {
    background-color: #d5d5d5;
    padding: 16px;
  }
  @media screen and (max-width: 640px) {
    width: 100%;
    float: none;
    padding: 0px 16px;
    margin: 0;
  }
}
.col3th {
  .col1,
  .col2,
  .col3 {
    width: 33%;
    @media screen and (max-width: 1024px) {
      width: calc(100% - 16px);
      padding: 0;
      margin: 16px;
    }
  }
}
.m0res {
  @media screen and (max-width: 640px) {
    margin: 0;
  }
}
</style>

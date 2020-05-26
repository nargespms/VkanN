<template>
  <div class="printInvoiceWrapper">
    <q-form @submit="onSubmit">
      <div class="printHeaderInvoice flexbet">
        <div class="invoiceLogo">
          <img src="../../assets/aasaam.png" alt />
        </div>
        <div class="invoiceDateWrapper">
          <div class="invoiceNumber rtl">
            <q-input
              outlined
              class="inputFieldText"
              color="light-blue-10"
              v-model.trim="invoice.serialNumber"
              :label="$t('serialNumber')"
              lazy-rules
              mask="######"
            />
          </div>

          <div class="invoiceDate">
            <q-input
              outlined
              v-model.trim="invoice.date"
              mask="date"
              :rules="['date']"
              :label="$t('date')"
              name="event"
            >
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy2" transition-show="scale" transition-hide="scale">
                    <q-date
                      v-model.trim="invoice.date"
                      @input="() => $refs.qDateProxy2.hide()"
                      today-btn
                      calendar="persian"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
      </div>
      <!-- invoice Details -->
      <div class="border8bl sellerDetails">
        <span class="boldTitle15">{{ $t('invoiceDetails') }}</span>
      </div>
      <div class="invoiceDetailsFields">
        <ul class="invoiceDetailsList">
          <li>
            <span>{{ $t('Service') }} :</span>
            <servicesAutocomplete
              :editData="profileMode === 'Edit' ? serviceEdit : ''"
              :isRequired="true"
              @getAutoCompleteValue="getAutoCompleteValueService"
              class="w55"
            />
          </li>

          <li>
            <div class="flexSEL w100">
              <span class="flexSEL">
                <q-radio
                  v-model="invoice.type"
                  val="INVOICE"
                  :label="this.$t('invoice')"
                  color="primary"
                  dense
                />
              </span>
              <span class="flexSEL">
                <q-radio
                  v-model="invoice.type"
                  val="QUOTE"
                  :label="this.$t('quote')"
                  color="primary"
                  dense
                />
              </span>
            </div>
          </li>
          <li v-if="invoice.type === 'QUOTE'">
            <span>{{ $t('quoteStartDate') }} :</span>
            <q-input
              outlined
              v-model.trim="invoice.quoteStartDate"
              mask="date"
              :rules="['date']"
              :label="$t('startDate')"
              name="event"
              @blur="quoteEnableDate"
              class="w55"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer" color="primary">
                  <q-popup-proxy ref="qDateProxy1" transition-show="scale" transition-hide="scale">
                    <q-date
                      v-model.trim="invoice.quoteStartDate"
                      @input="() => $refs.qDateProxy1.hide()"
                      today-btn
                      calendar="persian"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </li>
          <li v-if="invoice.type === 'INVOICE'">
            <span>{{ $t('invoiceStartDate') }} :</span>
            <q-input
              outlined
              v-model.trim="invoice.startdate"
              mask="date"
              :rules="['date']"
              :label="$t('invoiceStartDate')"
              name="event"
              @blur="EnableDate"
              class="w55"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer" color="primary">
                  <q-popup-proxy ref="qDateProxy1" transition-show="scale" transition-hide="scale">
                    <q-date
                      v-model.trim="invoice.startdate"
                      @input="() => $refs.qDateProxy1.hide()"
                      today-btn
                      calendar="persian"
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
          </li>

          <li>
            <span>{{ $t('currency') }} :</span>
            <q-select
              color="light-blue-10 "
              outlined
              v-model.trim="invoice.currency"
              :options="invoiceCurrency"
              class="w55"
              :label="$t('currency')"
            >
              <template v-slot:append>
                <q-icon name />
              </template>
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                  <q-item-section>
                    <q-item-label>{{ $t(scope.opt) }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:selected-item="scope">{{ $t(scope.opt) }}</template>
            </q-select>
          </li>

          <li v-if="invoice.type !== 'QUOTE'">
            <div class="flexSEL w100">
              <span class="flexSEL">
                <q-radio
                  v-model="invoice.official"
                  :val="false"
                  :label="this.$t('invoiceUnOfficial')"
                  color="primary"
                  dense
                />
              </span>
              <span class="flexSEL">
                <q-radio
                  v-model="invoice.official"
                  :val="true"
                  :label="this.$t('invoiceOfficial')"
                  color="primary"
                  dense
                />
              </span>
            </div>
          </li>
          <li v-if="invoice.type === 'QUOTE'">
            <span>{{ $t('quoteEndDate') }} :</span>
            <q-input
              outlined
              v-model.trim="invoice.quoteEndDate"
              mask="date"
              :rules="['date']"
              :label="$t('endDate')"
              :disable="!this.enableEndDateQuote"
              name="event"
              class="w55"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer" color="primary">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date
                      v-model.trim="invoice.quoteEndDate"
                      @input="() => $refs.qDateProxy.hide()"
                      today-btn
                      calendar="persian"
                      :options="quoteComputeEnddate"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </li>
          <li v-if="invoice.type === 'INVOICE'">
            <span>{{ $t('invoiceEndDate') }} :</span>
            <q-input
              outlined
              v-model.trim.lazy="$v.invoice.enddate.$model"
              mask="date"
              :rules="['date']"
              :label="$t('invoiceEndDate')"
              :disable="!this.enableEndDate"
              @blur="$v.invoice.enddate.$touch"
              :error="$v.invoice.enddate.$error"
              class="w55"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer" color="primary">
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
            <clientsAutocomplete
              :editData="profileMode === 'Edit' ? clientEdit : ''"
              :isRequired="true"
              @getAutoCompleteValue="getAutoCompleteValueclient"
              class="w55"
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
            <span>{{ invoice.postalCode }}</span>
          </li>
          <li>
            <span>{{ $t('telephoneNumberORfax') }} :</span>
            <span class="rtl">{{ invoice.telephoneNumberORfax }}</span>
          </li>
        </ul>
      </div>
      <!-- product or services -->
      <div class="border8bl mb8">
        <span class="boldTitle15">{{ $t('productDetailsORService') }}</span>
        <q-icon name="fas fa-question" class="guide defloat">
          <q-tooltip
            v-model="showing1"
            transition-show="scale"
            transition-hide="scale"
            content-style="font-size: 16px"
          >{{ $t('invoiceGuidMsg') }}</q-tooltip>
        </q-icon>
      </div>
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
          <th>{{ this.localizeNumber(12) }}</th>
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
          <th>عملیات</th>
        </tr>
        <tr>
          <th colspan="6">نحوه محاسبه بر اساس شماره ستون</th>
          <th>
            {{
            `${this.localizeNumber(4)}` + '*' + `${this.localizeNumber(6)}`
            }}
          </th>
          <th></th>
          <th>
            {{
            `${this.localizeNumber(7)}` + '-' + `${this.localizeNumber(8)}`
            }}
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
          <invoiceTableEncapsulateItems
            :v-if="item.id"
            :key="item.id"
            :data="item"
            :first="first"
            :currency="invoice.currency"
            @getFromItemEncapsulate="getFromItemEncapsulate"
            @removeItem="removeItem"
            :profileMode="profileMode"
            :invoiceId="invoice.id"
          />
        </template>

        <tr style="background-color: #a8a8a8;">
          <td colspan="6">جمع کل</td>
          <td></td>
          <td></td>
          <td>{{ invoiceTotal }}{{ $t(invoice.currency) }}</td>
          <td></td>
          <td>{{ invoiceTotalTax }}{{ $t(invoice.currency) }}</td>
        </tr>

        <q-btn class="mt12" color="primary" @click="addNewItem">
          <q-tooltip
            v-model="showing"
            transition-show="scale"
            transition-hide="scale"
          >{{ $t('savenew') }}</q-tooltip>
          {{ $t('CreatNewItem') }}
        </q-btn>
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
            />
          </span>
          <span class="flexSEL">
            <q-radio
              v-model="invoice.cash"
              :val="false"
              :label="this.$t('nocash')"
              color="primary"
              dense
            />
          </span>
        </div>
        <div class="border8w50 left pl16 flexbet">
          <span>{{ $t('cardNumber') }}</span>
          <q-input
            outlined
            class="inputFieldText rtl"
            color="light-blue-10"
            v-model.trim="invoice.cardNumber"
            :label="$t('cardNumber')"
            lazy-rules
            mask="#### #### #### ####"
          />
        </div>
      </div>
      <div class="border8bl mt8 left desc clear">
        <div class="descriptionColumn">
          <div class="invoiceTxtWrap">
            <span class="block mb16 invoiceTxtTitle" @click="descriptionTrue = !descriptionTrue">
              <span class="pr12">
                <q-icon v-if="!descriptionTrue" class="text-blue-grey-8" name="fa fa-arrow-down" />
                <q-icon v-if="descriptionTrue" class="text-blue-grey-8" name="fa fa-arrow-up" />
              </span>
              {{ $t('description') }} :
            </span>

            <q-slide-transition>
              <editor
                v-if="descriptionTrue && profileMode !== 'Edit'"
                @getTextFromEditor="getTextFromEditor"
              />
              <editorProp
                v-if="descriptionTrue && profileMode === 'Edit'"
                v-bind="{data: invoice.description || '' }"
                @changeEditedText="getTextFromEditor"
              />
            </q-slide-transition>
          </div>

          <div class="invoiceTxtWrap">
            <span class="block mb16 invoiceTxtTitle" @click="notesTrue = !notesTrue">
              <span class="pr12">
                <q-icon v-if="!notesTrue" class="text-blue-grey-8" name="fa fa-arrow-down" />
                <q-icon v-if="notesTrue" class="text-blue-grey-8" name="fa fa-arrow-up" />
              </span>
              {{ $t('notes') }} :
            </span>
            <q-slide-transition>
              <editor v-if="notesTrue" @getTextFromEditor="getTextFromEditorNotes" />
            </q-slide-transition>
          </div>
        </div>

        <div class="descriptionColumn pl16">
          <div class="w100 invoiceTxtWrap">
            <span class="block mb16 invoiceTxtTitle">{{ $t('attachments') }} :</span>
            <uploadfile :UploadButton="false" ref="upload" :text="'attachments'" />
          </div>
        </div>
      </div>
      <div class="saveButTask">
        <q-btn
          v-if="profileMode !== 'Edit'"
          class="justSave"
          style="width:250px; "
          color="primary"
          @click="onSubmit"
        >{{ $t('save') }}</q-btn>
        <q-btn
          v-if="profileMode === 'Edit'"
          class="justSave"
          style="width:250px; "
          color="primary"
          @click="editSubmit"
        >{{ $t('save') }}</q-btn>
        <q-btn
          style="width:250px;"
          color="primary"
          type="submit"
          @click="print = true"
        >{{ $t('saveandPreview') }}</q-btn>
      </div>
    </q-form>
  </div>
</template>

<script>
import uuidv4 from 'uuid/v4';
import uploadfile from '../structure/uploadfile.vue';
import invoiceTableEncapsulateItems from './invoiceTableEncapsulateItems.vue';
import servicesAutocomplete from '../structure/servicesAutocomplete.vue';
import clientsAutocomplete from '../structure/clientsAutocomplete.vue';
import editor from '../structure/editor.vue';
import editorProp from '../structure/editorProp.vue';

export default {
  name: 'addInvoiceTable',
  components: {
    servicesAutocomplete,
    clientsAutocomplete,
    editor,
    editorProp,
    invoiceTableEncapsulateItems,
    uploadfile,
  },
  props: ['profileMode'],
  data() {
    return {
      encapsulKey: 0,
      print: false,
      showing1: false,
      invoiceTotal: 0,
      invoiceTotalTax: 0,
      showing: false,
      descriptionTrue: true,
      notesTrue: false,
      errors: false,
      enableEndDate: false,
      enableEndDateQuote: false,
      invoiceCurrency: ['IRR', 'USD', 'EUR'],
      invoice: {
        id: '',
        cardNumber: '',
        currency: '',
        serialNumber: '',
        date: '',
        client: '',
        telephoneNumberORfax: '',
        economyCode: '',
        nationalIdORregisterNum: '',
        fullAdress: '',
        postalCode: '',
        cash: false,
        description: '',
        notes: '',
        serviceName: '',
        startdate: '',
        quoteStartDate: '',
        enddate: '',
        quoteEndDate: '',
        type: 'INVOICE',
        official: '',
        items: [
          {
            number: 1,
            id: uuidv4(),
            itemCode: '',
            itemDescription: '',
            itemNumber: 0,
            itemUnit: 0,
            itemAmount: 0,
            itemDiscount: 0,
            itemTotalAmount: 0,
            itemTotalWithDiscount: 0,
            itemTaxAmount: 0,
            itemTotalAmountTaxIncluded: 0,
          },
        ],
      },
      serviceEdit: '',
      clientEdit: '',
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
    getFromItemEncapsulate(value) {
      if (this.profileMode !== 'Edit') {
        const foundItemIndex = this.invoice.items.findIndex(
          // eslint-disable-next-line no-underscore-dangle
          item => item.id === value.id
        );
        if (foundItemIndex !== -1) {
          this.invoice.items[foundItemIndex] = value;
        }
      } else {
        // eslint-disable-next-line no-underscore-dangle
        const foundItemIndex = this.invoice.items.findIndex(
          // eslint-disable-next-line no-underscore-dangle
          item => item._id === value.id
        );
        if (foundItemIndex !== -1) {
          this.invoice.items[foundItemIndex] = value;
        }
        console.log(`value${value}`);
        // const serverItems = {
        //   rowNumber: value.number,
        //   code: value.itemCode,
        //   description: value.itemDescription,
        //   quantity: value.itemNumber,
        //   unit: value.itemUnit,
        //   fee: value.itemAmount,
        //   total: value.itemTotalAmount,
        //   discount: value.itemDiscount,
        //   totalAfterDiscount: value.itemTotalWithDiscount,
        //   TAX: 9,
        //   finalTotal: value.itemTotalAmountTaxIncluded,
        // };
        //
        // this.$axios
        //   .put(`/v1/api/vkann/items/${value.id}`, {
        //     invoiceId: this.invoice.id,
        //     ...serverItems,
        //   })
        //   .then(res => {
        //     console.log(res);
        //   });
        //
      }

      this.invoiceTotalAmount();
      this.invoiceTotalAmountTaxIncluded();
    },
    saveAndPreview() {
      this.onSubmit();
      // this.$router.push({ path: `/${this.$route.params.locale}/print/${this.}` });
    },
    persionToGregorian(value) {
      const dateValue = value.split('/').map(i => parseInt(i, 10));
      return new this.$persianDate(dateValue).toDate().toISOString();
    },
    onSubmit() {
      // map items to server
      const serverItems = this.invoice.items.map(item => ({
        rowNumber: item.number,
        code: item.itemCode,
        description: item.itemDescription,
        quantity: item.itemNumber,
        unit: item.itemUnit,
        fee: item.itemAmount,
        total: item.itemTotalAmount,
        discount: item.itemDiscount,
        totalAfterDiscount: item.itemTotalWithDiscount,
        TAX: 9,
        finalTotal: item.itemTotalAmountTaxIncluded,
      }));

      this.errors = this.$v.invoice.$anyError;
      if (this.errors === false) {
        const standardStartDate = this.persionToGregorian(
          this.invoice.startdate
        );
        const standardQuoteStartDate = this.persionToGregorian(
          this.invoice.quoteStartDate
        );

        const standardEndDate = this.persionToGregorian(this.invoice.enddate);
        const standardQuoteEndDate = this.persionToGregorian(
          this.invoice.quoteEndDate
        );
        const standardInvoiceDate = this.persionToGregorian(this.invoice.date);
        this.$refs.upload.submit_btn();

        if (this.profileMode === 'Add') {
          console.log('add');

          this.$axios
            .post('/v1/api/vkann/invoices', {
              number: this.invoice.serialNumber,
              type: this.invoice.type,
              client: this.invoice.client,
              invoiceDate: standardInvoiceDate,

              ...(this.invoice.official
                ? { total: this.invoiceTotalTax }
                : { total: this.invoiceTotal }),

              ...(this.invoice.type === 'INVOICE'
                ? {
                    dueDate: standardEndDate,
                    issueDate: standardStartDate,
                  }
                : {
                    validUntil: standardQuoteEndDate,
                    issueDate: standardQuoteStartDate,
                  }),

              service: this.invoice.serviceName,
              currency: this.invoice.currency,
              cash: this.invoice.cash,
              // validUntil: 'string',
              ...(this.invoice.official
                ? { official: this.invoice.official }
                : ''),

              description: this.invoice.description,
              cardNumber: this.invoice.cardNumber,
              note: this.invoice.notes,
              status: 'VALID',
              items: serverItems,
              // attachments: 'string',
            })
            .then(res => {
              if (res.status === 200) {
                this.$q.notify({
                  message: this.$t('invoiceAdded'),
                  color: 'positive',
                  icon: 'check',
                  position: 'top',
                });
                const invoiceId = res.data.id;
                if (this.print) {
                  this.pushToPrint(invoiceId);
                } else {
                  this.pushToLIst();
                }
              }
            });
        }
      }
    },
    editSubmit() {
      // const serverItems = this.invoice.items.map(item => ({
      //   rowNumber: item.number,
      //   code: item.itemCode,
      //   description: item.itemDescription,
      //   quantity: item.itemNumber,
      //   unit: item.itemUnit,
      //   fee: item.itemAmount,
      //   total: item.itemTotalAmount,
      //   discount: item.itemDiscount,
      //   totalAfterDiscount: item.itemTotalWithDiscount,
      //   TAX: 9,
      //   finalTotal: item.itemTotalAmountTaxIncluded,
      // }));
      const standardInvoiceDate = this.persionToGregorian(this.invoice.date);
      this.$axios
        .put(`/v1/api/vkann/invoices/${this.$route.params.invoiceId}`, {
          number: this.invoice.serialNumber,
          type: this.invoice.type,
          client: this.invoice.client,
          invoiceDate: standardInvoiceDate,
          ...(this.invoice.official
            ? { total: this.invoiceTotalTax }
            : { total: this.invoiceTotal }),

          ...(this.invoice.type === 'INVOICE'
            ? {
                dueDate: this.invoice.enddate,
                issueDate: this.invoice.startdate,
              }
            : {
                validUntil: this.invoice.quoteEndDate,
                issueDate: this.invoice.quoteStartDate,
              }),

          service: this.invoice.serviceName,
          currency: this.invoice.currency,
          cash: this.invoice.cash,
          official: this.invoice.official,
          description: this.invoice.description,
          cardNumber: this.invoice.cardNumber,
          note: this.invoice.notes,
          status: 'VALID',
          // items: serverItems,
          // attachments: 'string',
        })
        .then(res => {
          if (res.status === 200) {
            this.$q.notify({
              message: this.$t('invoiceEdited'),
              color: 'positive',
              icon: 'check',
              position: 'top',
            });
            const invoiceId = res.data.id;
            if (this.print) {
              this.pushToPrint(invoiceId);
            } else {
              this.pushToLIst();
            }
          }
        });
    },
    pushToLIst() {
      this.$router.push({
        path: `/${this.$route.params.locale}/billing/invoices/invoicesList`,
      });
    },
    pushToPrint(value) {
      this.$router.push({
        path: `/${this.$route.params.locale}/print/invoice/${value}`,
      });
    },
    getAutoCompleteValueclient(value) {
      this.invoice.client = value.id;
      this.getUserInfo(value.id);
    },
    getAutoCompleteValueService(value) {
      this.invoice.serviceName = value.id;
    },

    getUserInfo(value) {
      this.$axios.get(`/v1/api/vkann/users/${value}`).then(response => {
        this.invoice.telephoneNumberORfax = response.data.user.mobile;
        // this.invoice.economyCode = response.data;
        this.invoice.nationalIdORregisterNum = response.data.user.nationalId;
        // this.invoice.fullAdress = response.data;
        this.invoice.postalCode = response.data.user.zipCode;
      });
    },
    //  showing localize number
    localizeNumber(value) {
      return value.toLocaleString(`${this.$route.params.locale}`);
    },
    getTextFromEditor(value) {
      this.invoice.description = value;
    },
    getTextFromEditorNotes(value) {
      this.invoice.notes = value;
    },
    addNewItem() {
      this.invoice.items.push({
        number: this.itemNumber,
        id: uuidv4(),
        itemCode: '',
        itemDescription: '',
        itemNumber: 0,
        itemUnit: 0,
        itemAmount: 0,
        itemDiscount: 0,
        itemTotalAmount: 0,
        itemTotalWithDiscount: 0,
        itemTaxAmount: 0,
        itemTotalAmountTaxIncluded: 0,
      });
    },
    removeItem(value) {
      const foundItemIndex = this.invoice.items.findIndex(
        item => item.id === value.id
      );

      if (foundItemIndex !== -1) {
        if (this.profileMode !== 'Add') {
          console.log(value);
          this.$axios.delete(`/v1/api/vkann/items/${value.id}`).then(res => {
            console.log(res);
            this.$axios
              .get(`/v1/api/vkann/invoices/${this.invoice.id}`)
              .then(response => {
                this.invoice.item = response.data.items;
              });
          });
        } else {
          this.invoice.items.splice(foundItemIndex, 1);
        }
      }
    },
    EnableDate() {
      if (this.invoice.startdate.length > 0) {
        this.enableEndDate = true;
      }
    },
    quoteEnableDate() {
      if (this.invoice.quoteStartDate.length > 0) {
        this.enableEndDateQuote = true;
      }
    },
    computeEnddate(enddate) {
      return enddate >= this.invoice.startdate;
    },
    quoteComputeEnddate(enddate) {
      return enddate >= this.invoice.quoteStartDate;
    },
    invoiceTotalAmount() {
      console.log(this.invoice.items);
      this.invoiceTotal = this.invoice.items
        .map(item => item.itemTotalWithDiscount)
        .reduce((prev, next) => Number(prev) + Number(next));
    },
    invoiceTotalAmountTaxIncluded() {
      this.invoiceTotalTax = this.invoice.items
        .map(item => item.itemTotalAmountTaxIncluded)
        .reduce((prev, next) => Number(prev) + Number(next));
    },
    gregorianTopersianString(value) {
      return new this.$persianDate(new Date(value))
        .toArray()
        .slice(0, 3)
        .map(i => (i < 10 ? `0${i}` : i))
        .join('');
    },
    reloadCmp() {
      this.encapsulKey += 1;
    },
  },
  computed: {
    first() {
      return this.invoice.items.length < 2;
    },
    itemNumberLength() {
      return this.invoice.items.length;
    },
    itemNumber() {
      let number;
      for (let i = 1; i <= this.itemNumberLength; i++) {
        number = i;
        number++;
      }
      return number++;
    },
  },
  mounted() {
    if (this.profileMode === 'Edit') {
      this.$axios
        .get(`/v1/api/vkann/invoices/${this.$route.params.invoiceId}`)
        .then(res => {
          console.log(res);
          this.invoice.id = res.data.invoice.id;
          this.invoice.cardNumber = res.data.invoice.cardNumber;
          this.invoice.serialNumber = res.data.invoice.number;
          this.invoice.type = res.data.invoice.type;

          this.serviceEdit = res.data.invoice.service;
          // eslint-disable-next-line no-underscore-dangle
          this.invoice.serviceName = res.data.invoice.service._id;
          this.invoice.currency = res.data.invoice.currency;
          this.enableEndDate = true;
          this.enableEndDateQuote = true;
          this.invoice.official = res.data.invoice.official;
          this.clientEdit = res.data.invoice.client;
          // eslint-disable-next-line no-underscore-dangle
          this.invoice.client = res.data.invoice.client._id;
          // eslint-disable-next-line no-underscore-dangle
          this.getUserInfo(res.data.invoice.client._id);
          this.invoice.cash = res.data.invoice.cash;
          this.invoice.description = res.data.invoice.description;
          this.invoice.notes = res.data.invoice.note;
          // dates convertor
          this.invoice.date = this.gregorianTopersianString(
            res.data.invoice.invoiceDate
          );
          this.invoice.startdate = this.gregorianTopersianString(
            res.data.invoice.issueDate
          );
          this.invoice.quoteStartDate = this.gregorianTopersianString(
            res.data.invoice.issueDate
          );
          this.invoice.quoteEndDate = this.gregorianTopersianString(
            res.data.invoice.validUntil
          );
          this.invoice.enddate = this.gregorianTopersianString(
            res.data.invoice.dueDate
          );
          if (res.data.invoice.official) {
            this.invoiceTotalTax = res.data.total;
          } else {
            this.invoiceTotal = res.data.total;
          }
          // reverse map
          const localItems = res.data.invoice.items.map(item => ({
            // eslint-disable-next-line no-underscore-dangle
            id: item._id,
            number: item.rowNumber,
            itemCode: item.code,
            itemDescription: item.description,
            itemNumber: item.quantity,
            itemUnit: item.unit,
            itemAmount: item.fee,
            itemTotalAmount: item.total,
            itemDiscount: item.discount,
            itemTotalWithDiscount: item.totalAfterDiscount,
            TAX: 9,
            itemTotalAmountTaxIncluded: item.finalTotal,
          }));
          // reverse map
          this.invoice.items = localItems;
        });
    }
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
.addInvoicePage,
.EditInvoiceTable {
  .invoiceDetailsFields {
    border: 1px solid #000;
    border-radius: 20px;
    @media screen and (max-width: 700px) {
      padding: 12px 16px;
    }
    padding: 12px 46px;
    .invoiceDetailsList {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      @media screen and (max-width: 700px) {
        li {
          width: 100%;
        }
      }
      @media screen and (max-width: 1024px) and (min-width: 700px) {
        li {
          width: calc(100% / 2 - 24px);
        }
      }
      @media screen and (min-width: 1025px) {
        li {
          width: calc(100% / 3 - 24px);
        }
      }
      li {
        display: flex;
        justify-content: space-between;
        padding: 12px;
        background-color: #ecebebba;
        border: 1px solid #b9b9b9;
        margin: 0 24px 8px 0px;
        border-radius: 5px;
      }
    }
  }
}
@media screen and (max-width: 800px) {
  .servicesTable {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
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
  @media screen and (max-width: 640px) {
    display: block;
  }
}
.border8w50 {
  width: calc(100% / 2 - 8px);
  border: 1px solid #000;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  @media screen and (max-width: 640px) {
    width: 100%;
    margin-bottom: 16px;
  }
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
.saveButTask {
  margin-top: 16px;
  margin-bottom: 16px;
  text-align: center;
}
.invoiceDetailsList {
  .q-field--with-bottom {
    padding-bottom: 0px;
  }
}
.invoiceTxtTitle {
  padding: 8px;
  background-color: #d0d0d0;
  border-radius: 5px;
  cursor: pointer;
}
.invoiceTxtWrap {
  padding: 8px;
  border: 1px solid #aaa;
  margin-top: 8px;
}
.guide {
  padding: 12px;
  border: 1px solid #828282;
  border-radius: 15px;
  background-color: #a8a8a8;
  cursor: pointer;
}
.descriptionColumn {
  @media screen and (max-width: 641px) {
    width: 100%;
    padding: 0;
  }
  @media screen and (min-width: 640px) {
    width: 50%;
    float: left;
  }
}
.justSave {
  margin-right: 12px;
}
</style>

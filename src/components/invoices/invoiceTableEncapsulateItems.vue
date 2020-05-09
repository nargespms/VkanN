<template>
  <tr class="invoiceItemRow">
    <td>{{ item.number }}</td>
    <td class="pointer">
      {{ item.itemCode }}
      <q-popup-edit v-model="item.itemCode" buttons @save="passItemToUp">
        <q-input v-model="item.itemCode" dense autofocus counter />
      </q-popup-edit>
    </td>
    <td class="pointer">
      {{ item.itemDescription }}
      <q-popup-edit v-model="item.itemDescription" buttons @save="passItemToUp">
        <q-input v-model="item.itemDescription" dense autofocus counter />
      </q-popup-edit>
    </td>
    <td class="pointer">
      {{ item.itemNumber }}
      <q-popup-edit v-model="item.itemNumber" buttons @save="passItemToUp">
        <q-input type="number" v-model="item.itemNumber" dense autofocus counter />
      </q-popup-edit>
    </td>
    <td class="pointer">
      {{ item.itemUnit }}
      <q-popup-edit v-model="item.itemUnit" buttons @save="passItemToUp">
        <q-input v-model="item.itemUnit" dense autofocus counter />
      </q-popup-edit>
    </td>
    <td class="pointer">
      {{ item.itemAmount }}{{ $t(currency) }}
      <q-popup-edit v-model="item.itemAmount" buttons @save="passItemToUp">
        <q-input type="number" v-model="item.itemAmount" dense autofocus counter />
      </q-popup-edit>
    </td>
    <td>{{ itemTotalAmount }}{{ $t(currency) }}</td>
    <td class="pointer">
      {{ item.itemDiscount }}{{ $t(currency) }}
      <q-popup-edit v-model="item.itemDiscount" buttons @save="passItemToUp">
        <q-input type="number" v-model="item.itemDiscount" dense autofocus counter />
      </q-popup-edit>
    </td>
    <td>{{ itemTotalWithDiscount }}{{ $t(currency) }}</td>
    <td>{{ itemTaxAmount }}{{ $t(currency) }}</td>
    <td>{{ itemTotalAmountTaxIncluded }}{{ $t(currency) }}</td>

    <td>
      <!-- delete current item -->
      <q-btn
        class="rmRecord"
        round
        icon="delete"
        color="negative"
        @click="deleteRecord"
        :disable="first"
      >
        <q-tooltip
          v-model="showing1"
          transition-show="scale"
          transition-hide="scale"
        >{{ $t('delete') }}</q-tooltip>
      </q-btn>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'invoiceTableEncapsulateItems',
  props: ['data', 'first', 'currency', 'profileMode'],
  data() {
    return {
      showing1: false,
      item: { ...this.data },
    };
  },
  methods: {
    passItemToUp() {
      this.item = {
        id: this.item.id,
        itemCode: this.item.itemCode,
        itemDescription: this.item.itemDescription,
        itemNumber: this.item.itemNumber,
        itemUnit: this.item.itemUnit,
        itemAmount: this.item.itemAmount,
        itemDiscount: this.item.itemDiscount,
        itemTotalAmount: this.itemTotalAmount,
        itemTotalWithDiscount: this.itemTotalWithDiscount,
        itemTaxAmount: this.itemTaxAmount,
        itemTotalAmountTaxIncluded: this.itemTotalAmountTaxIncluded,
        number: this.item.number,
      };
      console.log(this.item);
      console.log('innn');
      this.$emit('getFromItemEncapsulate', this.item);
    },
    deleteRecord() {
      this.$q
        .dialog({
          title: this.$t('deleteRecord'),
          message: this.$t('areyousureyouwanttodeletethisRecor'),
          cancel: true,
        })
        .onOk(() => {
          this.$emit('removeItem', this.item);
        })
        .onCancel(() => {
          console.log('Cancel');
        });
    },
  },
  computed: {
    itemTotalAmount() {
      return this.item.itemNumber * this.item.itemAmount;
    },
    itemTotalWithDiscount() {
      return this.itemTotalAmount - this.item.itemDiscount;
    },
    itemTaxAmount() {
      return this.itemTotalWithDiscount * 0.09;
    },
    itemTotalAmountTaxIncluded() {
      return this.itemTaxAmount + this.itemTotalWithDiscount;
    },
  },
};
</script>

<style lang="scss">
.invoiceItemRow {
  td {
    background-color: #e3e3e3;
  }
  .q-btn--round .q-btn__wrapper {
    min-width: 2.5em;
    min-height: 2.5em;
    .q-btn {
      font-size: 20px;
    }
  }
}
</style>

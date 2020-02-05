<template>
  <div class="clear">
    <div class="invoiceDescItem">
      <!-- description -->
      <div>
        <textarea
          rows="4"
          v-model="item.desc"
          :placeholder="$t('description')"
          class="w100 description pt20"
          @change="passItemToUp"
        ></textarea>
      </div>
    </div>
    <div class="invoiceItemAmount">
      <div class="invoiceItemAmountInnerWrap">
        <!-- Amount -->
        <q-input
          @input="passItemToUp"
          outlined
          required
          class="inputFieldText"
          color="light-blue-10"
          v-model.trim="item.amount"
          :label="$t('amount')"
          mask="#######################"
          lazy-rules
          :rules="[val => val && val.length > 0]"
        >
          <template v-slot:prepend>
            <q-icon name />
          </template>
        </q-input>
        <!-- number of item -->
        <div class="formailInvoiceDetails" v-if="invoiceType === 'FORMAL'">
          <q-input
            outlined
            required
            class="inputFieldText"
            color="light-blue-10"
            v-model.trim="item.num"
            :label="$t('number')"
            mask="#######################"
            lazy-rules
            :rules="[val => val && val.length > 0]"
          >
            <template v-slot:prepend>
              <q-icon name />
            </template>
          </q-input>
          <!-- unit of items -->
          <q-input
            outlined
            required
            class="inputFieldText pl16"
            color="light-blue-10"
            v-model.trim="item.unit"
            :label="$t('unit')"
            lazy-rules
            :rules="[val => val && val.length > 0]"
          >
            <template v-slot:prepend>
              <q-icon name />
            </template>
          </q-input>
        </div>

        <div class="invoiceItemDatePriod">
          <!-- time  start -->
          <q-input
            outlined
            v-model="item.priodStartdate"
            mask="date"
            :rules="['date']"
            :label="$t('priodStartdate')"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date
                    v-model="item.priodStartdate"
                    calendar="persian"
                    today-btn
                    @change="() => $refs.qDateProxy.hide()"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <!-- time end -->
          <q-input
            outlined
            v-model="item.periodEnddate"
            mask="date"
            :rules="['date']"
            :label="$t('periodEnddate')"
            class="pl16"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date
                    v-model="item.periodEnddate"
                    calendar="persian"
                    today-btn
                    @change="() => $refs.qDateProxy.hide()"
                    :options="computeEnddate"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <!-- delete current item -->
      <q-btn
        :disable="!first"
        class="mt12 ml12 rmRecord"
        round
        icon="delete"
        color="negative"
        @click="deleteRecord"
      >
        <q-tooltip
          v-model="showing1"
          transition-show="scale"
          transition-hide="scale"
        >{{ $t('delete') }}</q-tooltip>
      </q-btn>

      <!-- delete current item -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'invoiceItemEncapsulate',
  props: ['data', 'first', 'invoiceType'],
  data() {
    return {
      showing1: false,
      item: {
        ...this.data,
      },
    };
  },
  methods: {
    deleteRecord() {
      this.$emit('removeItem', this.item);
    },
    passItemToUp() {
      this.$emit('onChange', this.item);
    },
    computeEnddate(enddate) {
      return enddate >= this.item.priodStartdate;
    },
  },
};
</script>
<style lang="scss">
.invoiceItemAmount {
  float: left;
  padding-left: 16px;
  width: 34%;
  @media screen and (max-width: 640px) {
    width: 100%;
    padding: 0;
    margin-top: 16px;
  }
  display: flex;
}
.invoiceDescItem {
  width: 66%;
  float: left;
  @media screen and (max-width: 640px) {
    width: 100%;
    margin: 0;
  }
}
.invoiceItemDatePriod {
  display: flex;
  justify-content: space-between;
}
.rmRecord {
  display: block;
  align-self: self-start;
}
.formailInvoiceDetails {
  display: flex;
  justify-content: space-between;
}
</style>

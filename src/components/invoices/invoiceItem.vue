<template >
  <div>
    <div class="clear" v-for="item in items" :key="item.index">
      <div class="invoiceDescItem">
        <!-- description -->
        <div>
          <textarea
            rows="1"
            v-model="item.desc"
            :placeholder="$t('description')"
            class="w100 description pt20"
            @change="passItem"
          ></textarea>
        </div>
      </div>
      <div class="invoiceItemAmount">
        <!-- Amount -->
        <q-input
          @change="passItem"
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
      </div>
    </div>
    <q-btn class="mt12" round icon="add" color="primary" @click="addNewItem">
      <q-tooltip
        v-model="showing1"
        transition-show="scale"
        transition-hide="scale"
      >{{ $t('savenew') }}</q-tooltip>
    </q-btn>
  </div>
</template>

<script>
export default {
  name: 'invoiceItem',
  data() {
    return {
      showing1: false,
      items: [
        {
          desc: '',
          amount: '',
        },
      ],
    };
  },
  methods: {
    addNewItem() {
      this.items.push({ desc: '', amount: '' });
      console.log('click');
      console.log(typeof this.items.amount);
    },
    passItem() {
      this.$emit('addNewItem', this.items);
    },
  },
  computed: {
    totalRequest() {
      return this.items
        .map(item => item.amount)
        .reduce((prev, next) => Number(prev) + Number(next));
    },
  },
  watch: {
    totalRequest(newVal) {
      this.$emit('totalAmount', newVal);
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
}
.invoiceDescItem {
  width: 66%;
  float: left;
  @media screen and (max-width: 640px) {
    width: 100%;
    margin: 0;
  }
}
</style>

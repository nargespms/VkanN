<template>
  <div>
    <div v-for="item in items" :key="item.id">
      <invoiceItemEncapsulate
        :data="item"
        :first="firstItem"
        :invoiceType="invoiceType"
        @onChange="onItemChange"
        @removeItem="removeItem"
      />
    </div>
    <q-btn class="mt12" round icon="add" color="primary" @click="addNewItem">
      <q-tooltip
        v-model="showing"
        transition-show="scale"
        transition-hide="scale"
      >{{ $t('savenew') }}</q-tooltip>
    </q-btn>
  </div>
</template>

<script>
import uuidv4 from 'uuid/v4';
import invoiceItemEncapsulate from './invoiceItemEncapsulate.vue';

export default {
  name: 'invoiceItem',
  components: {
    invoiceItemEncapsulate,
  },
  props: ['invoiceType'],
  data() {
    return {
      // date: this.today,
      showing1: false,
      showing: false,
      enablePriodEndDate: false,
      items: [
        {
          id: uuidv4(),
          desc: '',
          priodStartdate: '',
          periodEnddate: '',
          amount: '',
        },
      ],
    };
  },

  methods: {
    addNewItem() {
      this.items.push({
        id: uuidv4(),
        desc: '',
        priodStartdate: '',
        periodEnddate: '',
        amount: '',
      });
    },
    removeItem(value) {
      const foundItemIndex = this.items.findIndex(item => item.id === value.id);
      if (foundItemIndex !== -1) {
        this.items.splice(foundItemIndex, 1);
      }
      this.updateItems();
    },
    onItemChange(value) {
      const foundItemIndex = this.items.findIndex(item => item.id === value.id);
      if (foundItemIndex !== -1) {
        this.items[foundItemIndex] = value;
      }
      this.updateItems();
    },
    updateItems() {
      this.$emit('onChange', this.items);
      //  calculate sum for invoice  amount pass to parrent
      const newVal = this.items
        .map(item => item.amount)
        .reduce((prev, next) => Number(prev) + Number(next));
      this.$emit('totalAmount', newVal);
    },
  },
  computed: {
    firstItem() {
      return this.items.length > 1;
    },
  },
};
</script>
<style lang="scss"></style>

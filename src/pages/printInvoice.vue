<template>
  <div>
    <q-btn class="returnBut" @click="returnBack" color="primary">{{
      $t('RETURNTOPANNEL')
    }}</q-btn>
    <printInvoiceCmp />
  </div>
</template>

<script>
import printInvoiceCmp from '../components/print/printInvoiceCmp.vue';

export default {
  name: 'printInvoice',
  meta() {
    return { title: this.$t('print') };
  },

  components: {
    printInvoiceCmp,
  },
  methods: {
    returnBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss">
.returnBut {
  margin: 12px;
}
</style>

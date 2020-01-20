<template >
  <div>
    <printInvoiceCmp />
    <div class="backtoProWrap">
      <q-btn color="primary" class="mr12">{{$t('returnTo')}} {{$t('profile')}}</q-btn>
      <q-btn color="primary" icon="print" />
    </div>
  </div>
</template>


<script>
import printInvoiceCmp from '../components/print/printInvoiceCmp.vue';

export default {
  name: 'printInvoice',
  components: {
    printInvoiceCmp,
  },
};
</script>
<style lang="scss">
.backtoProWrap {
  display: flex;
  justify-content: center;
  button {
    width: 200px;
    text-align: center;
  }
}
</style>

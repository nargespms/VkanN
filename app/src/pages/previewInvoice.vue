<template >
  <div>
    <previewInvoiceCmp />
  </div>
</template>


<script>
import previewInvoiceCmp from '../components/print/previewInvoiceCmp.vue';

export default {
  name: 'previewInvoice',
  meta() {
    return { title: this.$t('preview') };
  },

  components: {
    previewInvoiceCmp,
  },
  methods: {},
};
</script>
<style lang="scss">
</style>

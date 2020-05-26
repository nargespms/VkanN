<template>
  <div class="q-pa-xl">
    <invoiceProfile :key="componentKey" @reRender="reRender" />
  </div>
</template>

<script>
import invoiceProfile from '../components/invoices/invoiceProfile.vue';

export default {
  name: 'invoice',
  meta() {
    return {
      title: `${this.$t('invoice')}${this.$route.params.invoiceId}`,
    };
  },
  components: {
    invoiceProfile,
  },
  data() {
    return { componentKey: 0 };
  },
  methods: {
    reRender(value) {
      console.log(value);
      this.componentKey += 1;
    },
  },
};
</script>

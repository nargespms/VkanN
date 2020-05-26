<template >
  <div class="q-pa-xl">
    <contractProfile :key="componentKey" @reRender="reRender" />
  </div>
</template>

<script>
import contractProfile from '../components/contracts/contractProfile.vue';

export default {
  name: 'contract',
  meta() {
    return { title: `${this.$t('contract')} ${this.$route.params.contractId}` };
  },
  components: {
    contractProfile,
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

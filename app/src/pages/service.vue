<template >
  <div class="q-pa-xl">
    <serviceProfile :key="componentKey" @reRender="reRender" />
  </div>
</template>

<script>
import serviceProfile from '../components/services/serviceProfile.vue';

export default {
  meta() {
    return { title: `${this.$t('service')} ${this.$route.params.serviceId}` };
  },
  components: {
    serviceProfile,
  },
  data() {
    return {
      componentKey: 0,
    };
  },
  methods: {
    reRender(value) {
      console.log(value);
      this.componentKey += 1;
    },
  },
};
</script>

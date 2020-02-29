<template >
  <div class="q-pa-xl">
    <serviceProfile :data="serviceData" />
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
      serviceData: {},
    };
  },
  mounted() {
    this.$axios
      .get(`/v1/api/vkann/services/${this.$route.params.serviceId}`)
      .then(res => {
        console.log(res);
        this.serviceData = res.data;
      })
      .catch(e => {
        if (e.response.status === 422) {
          this.$q.notify({
            message: this.$t('serviceUnvalid'),
            color: 'negative',
            icon: 'warning',
            position: 'top',
          });
        }
      });
  },
};
</script>

<template>
  <div>
    <serviceList />
  </div>
</template>

<script>
import serviceList from '../components/services/serviceList.vue';

export default {
  meta() {
    return { title: this.$t('servicesList') };
  },

  components: {
    serviceList,
  },
};
</script>

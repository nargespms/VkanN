<template>
  <div>
    <contractList />
  </div>
</template>

<script>
import contractList from '../components/contracts/contractList.vue';

export default {
  name: 'contractsList',
  meta() {
    return { title: this.$t('contractsList') };
  },

  components: {
    contractList,
  },
};
</script>

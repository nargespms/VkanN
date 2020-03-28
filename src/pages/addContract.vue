<template>
  <div class="q-pa-xl">
    <h4 class="headerTitleInPage">
      <span>{{ $t('addContract') }}</span>
    </h4>
    <addContractCmp profileMode="Add" />
  </div>
</template>

<script>
import addContractCmp from '../components/contracts/addContractCmp.vue';

export default {
  name: 'addContract',
  meta() {
    return { title: this.$t('addContract') };
  },

  components: {
    addContractCmp,
  },
};
</script>

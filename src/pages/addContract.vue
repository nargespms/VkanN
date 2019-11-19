<template >
  <div>
    <h4 class="headerTitleInPage">
      <span>{{$t('addContract')}}</span>
    </h4>
    <addContractCmp />
  </div>
</template>

<script>
import addContractCmp from '../components/contracts/addContractCmp.vue';

export default {
  name: 'addContract',
  components: {
    addContractCmp,
  },
};
</script>

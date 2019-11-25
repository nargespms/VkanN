<template >
  <div class="q-pa-lg">
    <div class="userManagementListWrap">
      <tableDataWrap :endpoint="'/statics/contract.json'" />
    </div>
  </div>
</template>

<script>
import tableDataWrap from '../structure/tableDataWrap.vue';

export default {
  name: 'contractList',
  components: {
    tableDataWrap,
  },
};
</script>

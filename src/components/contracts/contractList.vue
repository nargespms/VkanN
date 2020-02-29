<template >
  <div class="q-pa-xl">
    <div class="userManagementListWrap">
      <tableDataWrap :endpoint="'/v1/api/vkann/contracts/list'" />
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
  mounted() {
    this.$axios.get('/v1/api/vkann/contracts/list').then(res => {
      console.log(res.data);
    });
  },
};
</script>

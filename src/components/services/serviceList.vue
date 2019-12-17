<template >
  <div class="q-pa-xl">
    <div class="userManagementListWrap">
      <tableDataWrap :endpoint="'/statics/service.json'" />
    </div>
  </div>
</template>

<script>
import tableDataWrap from '../structure/tableDataWrap.vue';

export default {
  name: 'serviceList',
  components: {
    tableDataWrap,
  },
};
</script>

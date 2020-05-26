<template>
  <div class="q-pa-xl pt32">
    <generalDashboardInfo />

    <billingDashboard />
  </div>
</template>


<script>
import billingDashboard from '../dashboard/billingDashboard.vue';
import generalDashboardInfo from '../dashboard/generalDashboardInfo.vue';

export default {
  name: 'pannelStatusCards',
  components: {
    billingDashboard,
    generalDashboardInfo,
  },
};
</script>
<style lang="scss">
.dashboardSeprator {
  background-color: #e1e1e1;
  padding: 12px;
  border-radius: 3px;
  border: 1px solid #c1c1c1;
  margin-bottom: 12px;
}
</style>

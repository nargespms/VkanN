<template>
  <div class="q-pa-xl pt32">
    <TicketsStatusCard />
    <charts />
    <div class="dashboardSeprator center">
      <span class="fn20">{{$t('billing')}}</span>
    </div>
    <billingStatusCard />
    <charts />
  </div>
</template>


<script>
import TicketsStatusCard from './TicketsStatusCard.vue';
import charts from './charts.vue';

import billingStatusCard from './billingStatusCard.vue';

export default {
  name: 'pannelStatusCards',
  components: {
    TicketsStatusCard,
    billingStatusCard,
    charts,
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

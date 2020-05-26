<template >
  <div>
    <div class="dashboardSeprator center">
      <span class="fn20">{{$t('billing')}}</span>
    </div>
    <billingStatusCard
      v-if="!expiredinvoicelLoading && !unpaidinvoicelLoading"
      :data="dashboardInfo"
    />
    <charts />
  </div>
</template>

<script>
import billingStatusCard from '../structure/billingStatusCard.vue';
import charts from '../structure/charts.vue';

export default {
  name: 'billingDashboard',
  components: {
    billingStatusCard,
    charts,
  },
  data() {
    return {
      dashboardInfo: {},
      expiredinvoicelLoading: true,
      unpaidinvoicelLoading: true,
      loading: true,
    };
  },
  methods: {
    expiredInvoices() {
      const d = new Date();
      d.setDate(d.getDate() - 1);

      const filter = {
        secondDueDate: d,
      };
      this.$axios
        .get('/v1/api/vkann/dashboard/invoice', {
          params: {
            filter,
          },
        })
        .then(res => {
          console.log(res);
          this.loading = false;
          this.expiredinvoicelLoading = false;
          this.dashboardInfo.expiredinvoice = res.data.quantity;
        });
    },
    unpaidInvoices() {
      const filter = {
        status: 'UNPAID',
      };
      this.$axios
        .get('/v1/api/vkann/dashboard/invoice', {
          params: {
            filter,
          },
        })
        .then(res => {
          console.log(res);
          this.unpaidinvoicelLoading = false;
          this.dashboardInfo.unpaidinvoice = res.data.quantity;
        });
    },
  },
  mounted() {
    this.expiredInvoices();
    this.unpaidInvoices();
  },
};
</script>

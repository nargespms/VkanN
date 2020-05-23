<template >
  <div>
    <TicketsStatusCard
      v-if="!openTicketlLading && !ipTicketlLading && !criticalTasklLading && !expiredTasklLading "
      :data="dashboardInfo"
    />
    <charts v-if="!loading" />
  </div>
</template>


<script>
import TicketsStatusCard from '../structure/TicketsStatusCard.vue';
import charts from '../structure/charts.vue';

export default {
  name: 'generalDashbardInfo',
  components: {
    TicketsStatusCard,
    charts,
  },
  data() {
    return {
      dashboardInfo: {},
      openTicketlLading: true,
      ipTicketlLading: true,
      criticalTasklLading: true,
      expiredTasklLading: true,
      loading: true,
    };
  },
  methods: {
    openTickets() {
      const filter = {
        status: 'OPEN',
      };
      this.$axios
        .get('/v1/api/vkann/dashboard/tickets', {
          params: {
            filter,
          },
        })
        .then(res => {
          console.log(res);
          this.loading = false;
          this.openTicketlLading = false;
          this.dashboardInfo.openTickets = res.data.quantity;
        });
    },
    wipTickets() {
      const filter = {
        status: 'INPROGRESS',
      };
      this.$axios
        .get('/v1/api/vkann/dashboard/tickets', {
          params: {
            filter,
          },
        })
        .then(res => {
          this.ipTicketlLading = false;
          this.dashboardInfo.ipTickets = res.data.quantity;
        });
    },
    criticalTasks() {
      const filter = {
        prority: 'CRITICAL',
      };
      this.$axios
        .get('/v1/api/vkann/dashboard/task', {
          params: {
            filter,
          },
        })
        .then(res => {
          this.criticalTasklLading = false;
          this.dashboardInfo.criticalTask = res.data.quantity;
        });
    },
    expiredTasks() {
      const d = new Date();
      d.setDate(d.getDate() - 1);

      const filter = {
        secondDueDate: d,
      };
      this.$axios
        .get('/v1/api/vkann/dashboard/task', {
          params: {
            filter,
          },
        })
        .then(res => {
          this.expiredTasklLading = false;
          this.dashboardInfo.expiredTask = res.data.quantity;
        });
    },
  },
  mounted() {
    this.openTickets();
    this.wipTickets();
    this.criticalTasks();
    this.expiredTasks();
  },
};
</script>

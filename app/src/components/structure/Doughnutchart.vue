<script>
import { Doughnut } from 'vue-chartjs';

export default {
  name: 'DoughnutChart',
  extends: Doughnut,
  props: ['chartdata', 'options'],
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
<style lang="scss"></style>

<script>
import { Line } from 'vue-chartjs';

export default {
  name: 'lineChart',
  extends: Line,
  props: ['chartdata', 'options'],
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
<style lang="scss"></style>

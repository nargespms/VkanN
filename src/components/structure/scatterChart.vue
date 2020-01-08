<script>
import { Scatter } from 'vue-chartjs';

export default {
  name: 'scatterChart',
  extends: Scatter,
  props: ['chartdata', 'options'],
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
<style lang="scss"></style>

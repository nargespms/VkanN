<script>
import { Line } from 'vue-chartjs';

export default {
  name: 'lineChart',
  extends: Line,
  props: ['chartdata', 'options'],
  mounted() {
    this.renderChart(this.chartdata, this.options);
    console.log(this.chartdata);
  },
};
</script>
<style lang="scss"></style>

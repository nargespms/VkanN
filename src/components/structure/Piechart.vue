<script>
import { Pie } from 'vue-chartjs';

export default {
  name: 'Piechart',
  extends: Pie,
  props: ['chartdata', 'options'],
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
<style lang="scss"></style>

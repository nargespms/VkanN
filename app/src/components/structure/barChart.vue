<script>
import { Bar } from 'vue-chartjs';

export default {
  name: 'barChart',
  extends: Bar,
  props: ['chartdata', 'options'],
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
<style lang="scss"></style>

<script>
import { Radar } from 'vue-chartjs';

export default {
  name: 'Radarchart',
  extends: Radar,
  props: ['chartdata', 'options'],
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
<style lang="scss"></style>

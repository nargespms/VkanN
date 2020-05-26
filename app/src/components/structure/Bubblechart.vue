<script>
import { Bubble } from 'vue-chartjs';

export default {
  name: 'Bubblechart',
  extends: Bubble,
  props: ['chartdata', 'options'],
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
<style lang="scss"></style>

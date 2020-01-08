<template>
  <div class="q-pa-xl">
    <div class="width-1of2 lg-width-1of3 sm-auto">
      <lineChart :chartdata="chartData" :options="chartOptions"></lineChart>
      <barChart :chartdata="chartData" :options="chartOptions"></barChart>
      <Doughnutchart
        :chartdata="chartData"
        :options="chartOptions"
      ></Doughnutchart>
      <Piechart :chartdata="chartData" :options="chartOptions"></Piechart>
      <Radarchart :chartdata="chartData" :options="chartOptions"></Radarchart>
      <Bubblechart :chartdata="chartData" :options="chartOptions"></Bubblechart>
      <scatterChart
        :chartdata="chartData"
        :options="chartOptions"
      ></scatterChart>
    </div>
  </div>
</template>
<script>
import lineChart from '../components/structure/lineChart.vue';
import barChart from '../components/structure/barChart.vue';
import Doughnutchart from '../components/structure/Doughnutchart.vue';
import Piechart from '../components/structure/Piechart.vue';
import Radarchart from '../components/structure/Radarchart.vue';
import Bubblechart from '../components/structure/Bubblechart.vue';
import scatterChart from '../components/structure/scatterChart.vue';

export default {
  components: {
    lineChart,
    barChart,
    Doughnutchart,
    Piechart,
    Radarchart,
    Bubblechart,
    scatterChart,
  },
  data() {
    return {
      chartData: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        datasets: [
          { label: 'Data One', backgroundColor: '#f87979', data: [40, 20, 12] },
          {
            label: 'Data Two',
            backgroundColor: '#f87921',
            data: [50, 40, 56, 12, -11],
          },
          {
            label: 'Data Three',
            backgroundColor: '#f84021',
            data: [100, 80, 10],
          },
          {
            label: 'Data Four',
            backgroundColor: '#000',
            data: [40, 20, 10, 40, 39, 80, 40, 20, 12, 11],
          },
          {
            label: 'Data Five',
            backgroundColor: '#e45622',
            data: [
              { x: -22, y: 4 },
              { x: -12, y: 1 },
              { x: 0, y: 20 },
              { x: 1, y: 21 },
              { x: 2, y: 24 },
            ],
          },
          {
            label: 'Data six',
            backgroundColor: '#328a69',
            data: [
              { x: -2, y: 4 },
              { x: -12, y: 1 },
              { x: 0, y: 20 },
              { x: 12, y: 1 },
              { x: 2, y: 4 },
            ],
          },
        ],
      },
      chartOptions: { responsive: true, maintainAspectRatio: false },
    };
  },
};
</script>

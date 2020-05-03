<template>
  <div>
    <div class="width-1of2 lg-width-1of3 sm-auto chartsWrap">
      <lineChartWrap />
      <!-- <barChart :chartdata="chartData" :options="chartOptions" />
      <Doughnutchart :chartdata="chartData" :options="chartOptions" />
      <Piechart :chartdata="chartData" :options="chartOptions" />
      <Radarchart :chartdata="chartData" :options="chartOptions" />
      <Bubblechart :chartdata="chartData" :options="chartOptions" />
      <scatterChart :chartdata="chartData" :options="chartOptions" />-->
    </div>
  </div>
</template>
<script>
import lineChartWrap from './charts/lineChartWrap.vue';
// import barChart from './barChart.vue';
// import Doughnutchart from './Doughnutchart.vue';
// import Piechart from './Piechart.vue';
// import Radarchart from './Radarchart.vue';
// import Bubblechart from './Bubblechart.vue';
// import scatterChart from './scatterChart.vue';

export default {
  name: 'charts',

  components: {
    lineChartWrap,
    // barChart,
    // Doughnutchart,
    // Piechart,
    // Radarchart,
    // Bubblechart,
    // scatterChart,
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
          {
            label: 'Data One',
            backgroundColor: '#00ffdb4f',
            borderColor: '#32fde1',
            data: [40, 20, 12],
          },
          {
            label: 'Data Two',
            backgroundColor: '#1a467e78',
            borderColor: '#2d4968',
            yAxisID: 'A',

            data: [
              { x: -2, y: 4, y1: 1 },
              { x: 12, y: 1, y1: 13 },
              { x: 50, y: 20, y1: 14 },
              { x: 51, y: 21, y1: 15 },
              { x: 51, y: 21, y1: 1 },
              { x: 51, y: 21, y1: 17 },
              { x: 25, y: 24, y1: 177 },
            ],
          },
          {
            label: 'Data Three',
            backgroundColor: '#438ad670',
            borderColor: '#68a7ec',

            data: [
              { x: 22, y: 4, B: 5 },
              { x: 25, y: 50, B: 5 },
              { x: 0, y: 20, B: 5 },
              { x: 0, y: 10, B: 5 },
              { x: 0, y: 30, B: 5 },
              { x: 1, y: 51, B: 5 },
              { x: 5, y: 24, B: 5 },
            ],
          },
          {
            label: 'Data Four',
            backgroundColor: '#0000006b',
            borderColor: '#606060',
            yAxisID: 'A',

            data: [
              { x: 0, y: 4 },
              { x: -1, y: 1 },
              { x: -1, y: 1 },
              { x: 0, y: 50 },
              { x: 1, y: 11 },
              { x: 1, y: 21 },
              { x: 2, y: 1 },
            ],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,

        scales: {
          yAxes: [
            {
              id: 'A',
              type: 'linear',
              position: 'left',
            },
            {
              id: 'B',
              type: 'linear',
              position: 'right',
              ticks: {
                max: 5,
                min: 0,
              },
            },
          ],
        },
      },
    };
  },
};
</script>

<style lang="scss"></style>

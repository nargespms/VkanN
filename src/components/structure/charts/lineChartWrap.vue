<template>
  <div class="q-pa-xl">
    <div class="width-1of2 lg-width-1of3 sm-auto chartsWrap">
      <lineChart :chartdata="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
<script>
import lineChart from '../lineChart.vue';

export default {
  name: 'lineChartWrap',

  components: {
    lineChart,
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
            data: [40, 20, 12, 0, 1, 5, 56, 20, 10, 1, 40],
          },
          {
            label: 'Data Two',
            backgroundColor: '#d64367c7',
            borderColor: '#d64367',

            data: [
              { x: -2, y: 4 },
              { x: 12, y: 1 },
              { x: 50, y: 20 },
              { x: 51, y: 21 },
              { x: 51, y: 1 },
              { x: 51, y: 10 },
              { x: 25, y: 40 },
              { x: 25, y: 50 },
              { x: 25, y: 60 },
              { x: 25, y: 30 },
              { x: 25, y: 20 },
              { x: 25, y: 10 },
            ],
          },
          {
            label: 'Data Three',
            backgroundColor: '#3eae1eab',
            borderColor: '#3eae1e',

            data: [
              { x: 22, y: 4 },
              { x: 25, y: 50 },
              { x: 0, y: 20 },
              { x: 0, y: 10 },
              { x: 0, y: 30 },
              { x: 1, y: 51 },
              { x: 5, y: 24 },
            ],
          },
          {
            label: 'Data Four',
            backgroundColor: '#1a467e78',
            borderColor: '#2d4968',
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

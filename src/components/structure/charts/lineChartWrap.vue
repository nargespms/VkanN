<template>
  <div class="q-pa-md">
    <div class="width-1of2 lg-width-1of3 sm-auto chartsWrap">
      <div class="controls">
        <span
          :class="tab === 'today' ? 'active' : ''"
          class="dateRangeControl"
          @click="changeTab('today')"
        >{{$t('daily')}}</span>
        <span
          :class="tab === 'monthly' ? 'active' : ''"
          class="dateRangeControl"
          @click="changeTab('monthly')"
        >{{$t('lastMonth')}}</span>
        <span
          class="dateRangeControl"
          :class="tab === 'year' ? 'active' : ''"
          @click="changeTab('year')"
        >{{$t('lastYear')}}</span>
      </div>
      <lineChart
        v-if="tab ==='today'"
        :key="componentKey"
        :chartdata="chartData3"
        :options="chartOptions3"
      />
      <lineChart
        v-if="tab ==='monthly'"
        :key="componentKey"
        :chartdata="chartData2"
        :options="chartOptions2"
      />
      <lineChart
        v-if="tab ==='year'"
        :key="componentKey"
        :chartdata="chartData"
        :options="chartOptions"
      />
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
      componentKey: 0,
      tab: 'today',
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
              { x: 25, y: 0 },
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
      },
      chartData2: {
        labels: [
          '1th',
          '2th',
          '3th',
          '4th',
          '5th',
          '6th',
          '7th',
          '8th',
          '9th',
          '10th',
          '11th',
          '12th',
          '13th',
          '14th',
          '15th',
          '16th',
          '17th',
          '18th',
          '19th',
          '20th',
          '21th',
          '22th',
          '23th',
          '24th',
          '25th',
          '26th',
          '27th',
          '28th',
          '29th',
          '30th',
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
              { x: 25, y: 0 },
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
        ],
      },
      chartOptions2: {
        responsive: true,
        maintainAspectRatio: false,
      },
      chartData3: {
        labels: [
          '9am',
          '10am',
          '11am',
          '12am',
          '1pm',
          '2pm',
          '3pm',
          '4pm',
          '6pm',
          '7pm',
          '8pm',
          '9pm',
          '10pm',
          '11pm',
          '12pm',
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
              { x: 25, y: 0 },
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
        ],
      },
      chartOptions3: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    changeTab(value) {
      this.tab = value;
      this.componentKey += 1;
      this.isActive = !this.isActive;
      console.log(this.isActive);
    },
  },
};
</script>

<style lang="scss">
.controls {
  width: 300px;
  background-color: #d5d5d5;
  border: 1px solid #b9b9b9;
  border-radius: 2px;
  display: flex;
  justify-content: space-evenly;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
  .dateRangeControl {
    cursor: pointer;
    width: calc(100% / 3);
    text-align: center;
    border-right: 1px solid #b9b9b9;
    padding: 4px;
    &:hover {
      background-color: #b9b9b9;
    }
  }
  .active {
    background-color: #fff;
  }
}
</style>

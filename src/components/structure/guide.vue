<template>
  <div>
    <h3>
      <!-- common methods and markup -->
      <!-- for select boxes that have map-options -->
      <!-- :option-label="opt => $t(opt.label)" -->

      <!-- for select box without any furthoemore options -->
      <!-- <template v-slot:selected-item="scope">{{ $t(scope.opt) }}</template> -->
    </h3>
  </div>
</template>

<script>
export default {
  methods: {
    // convert gregorian timestamp date to string for date picker
    gregorianTopersianString(value) {
      return new this.$persianDate(new Date(value))
        .toArray()
        .slice(0, 3)
        .map(i => (i < 10 ? `0${i}` : i))
        .join('');
    },
    // convert out put of date picker to gregorian timestamp for server
    persionToGregorian(value) {
      const dateValue = value.split('/').map(i => parseInt(i, 10));
      return new this.$persianDate(dateValue).toDate().toISOString();
    },
  },
};
</script>

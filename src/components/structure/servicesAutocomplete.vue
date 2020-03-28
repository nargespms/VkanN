<template>
  <div>
    <q-select
      outlined
      :required="isRequired"
      v-model="selectedvalue"
      :options="options"
      option-value="id"
      option-label="name"
      map-options
      use-input
      hide-selected
      fill-input
      @filter="filterFn"
      :label="$t('Service')"
      input-debounce="0"
      @blur="sendValue"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">{{
            $t('noResults')
          }}</q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script>
export default {
  name: 'servicesAutocomplete',
  props: ['isRequired', 'editData'],

  data() {
    return {
      selectedvalue: '',
      options: Object.freeze(this.data),
      data: [],
    };
  },
  methods: {
    sendValue() {
      this.$emit('getAutoCompleteValue', this.selectedvalue);
    },
    createValue(val, done) {
      if (val.length > 0) {
        if (!this.options.includes(val)) {
          this.options.push(val);
        }
        done(val, 'toggle');
      }
    },
    filterFn(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        this.options = this.data.filter(
          v => v.name.toLowerCase().indexOf(needle) > -1
        );
      });
    },
  },
  mounted() {
    this.$axios.get('/v1/api/vkann/services/get-services').then(res => {
      // console.log(res.data.services);
      this.data = res.data.services;
    });
  },
  watch: {
    editData(newVal) {
      this.selectedvalue = newVal;
    },
  },
};
</script>

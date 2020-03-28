<template>
  <div>
    <q-select
      outlined
      :required="isRequired"
      v-model="selectedvalue"
      :options="options"
      option-value="id"
      option-label="lastName"
      map-options
      use-input
      hide-selected
      fill-input
      @filter="filterFn"
      :label="$t('employeeName')"
      input-debounce="0"
      @input="sendValue"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            {{ $t('noResults') }}
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script>
export default {
  name: 'staffsAutocomplete',
  props: ['isRequired', 'editData'],
  data() {
    return {
      selectedvalue: {},
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
          v => v.lastName.toLowerCase().indexOf(needle) > -1
        );
      });
    },
  },
  watch: {
    editData(newVal) {
      this.selectedvalue = newVal;
    },
  },
  mounted() {
    this.$axios.get('/v1/api/vkann/users/get-staffs').then(res => {
      this.data = res.data.users;
    });
    this.selectedvalue = this.editData;
  },
};
</script>

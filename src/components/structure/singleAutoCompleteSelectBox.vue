<template >
  <div>
    <q-select
      outlined
      v-model="selectedvalue"
      :options="localOptions"
      :option-label="localOptionLable"
      :option-value="localOptionValue"
      map-options
      :label="$t(this.name)"
      @filter="filterFn"
      input-debounce="0"
      use-input
      @new-value="createValue"
      @blur="sendValue"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">No results</q-item-section>
        </q-item>
      </template>
    </q-select>
    {{localOptionLable}}
  </div>
</template>

<script>
export default {
  name: 'singleAutoCompleteSelectBox',
  props: ['options', 'optionValue', 'optionLable', 'lable', 'name'],
  data() {
    return {
      selectedvalue: '',
    };
  },
  methods: {
    sendValue() {
      this.$emit('getAutoCompleteValue', this.selectedvalue);
    },
    createValue(val, done) {
      if (val.length > 0) {
        if (!this.localData.includes(val)) {
          this.localData.push(val);
        }
        done(val, 'toggle');
      }
    },
    filterFn(val, update) {
      update(() => {
        if (val === '') {
          this.localOptions = this.localData;
        } else {
          const needle = val.toLowerCase();
          this.localOptions = this.localData.filter(
            v => v.firstName.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    },
  },
  computed: {
    localData() {
      return this.options;
    },
    localOptions: {
      get() {
        return this.options;
      },
      set(newVal) {
        return newVal;
      },
    },
    localOptionValue() {
      return this.optionValue;
    },
    localOptionLable() {
      return this.optionLable;
    },
  },
};
</script>

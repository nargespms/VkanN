<template>
  <div>
    <q-select
      outlined
      v-model="chosedTags"
      multiple
      :options="options"
      :label="$t('addTag')"
      @filter="filterFn"
      input-debounce="0"
      use-input
      use-chips
      @new-value="createValue"
      @blur="sendTags"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            No results
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script>
export default {
  name: 'tagsSelection',
  data() {
    return {
      chosedTags: [],
      tags: ['tag1', 'tag2', 'tag3'],
      options: this.tags,
    };
  },
  methods: {
    sendTags() {
      this.$emit('addTagFn', this.chosedTags);
    },
    createValue(val, done) {
      if (val.length > 0) {
        if (!this.tags.includes(val)) {
          this.tags.push(val);
        }
        done(val, 'toggle');
      }
    },
    filterFn(val, update) {
      update(() => {
        if (val === '') {
          this.options = this.tags;
        } else {
          const needle = val.toLowerCase();
          this.options = this.tags.filter(
            v => v.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    },
  },
};
</script>

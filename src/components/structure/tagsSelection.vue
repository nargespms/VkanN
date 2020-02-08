<template>
  <div>
    <q-select
      outlined
      v-model="chosedTags"
      multiple
      :options="options"
      option-label="title"
      option-value="id"
      map-options
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
          <q-item-section class="text-grey">No results</q-item-section>
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
      tags: [],
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
            v => v.title.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    },
  },
  mounted() {
    this.$axios.get('/v1/api/vkann/tags/get-tags').then(response => {
      this.tags = response.data.tags;
      console.log(this.tags);
    });
  },
};
</script>

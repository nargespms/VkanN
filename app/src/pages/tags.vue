<template>
  <div class="q-pa-xl">
    <tagWrapper />
  </div>
</template>

<script>
import tagWrapper from '../components/tags/tagWrapper.vue';

export default {
  name: 'tags',
  meta() {
    return { title: this.$t('tagsManagement') };
  },

  components: {
    tagWrapper,
  },
};
</script>

<style></style>

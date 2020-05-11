<template>
  <div class="q-pa-xl">
    <fileListWrap />
  </div>
</template>

<script>
import fileListWrap from '../components/files/fileListWrap.vue';

export default {
  name: 'filesList',
  meta() {
    return { title: this.$t('filesList') };
  },
  components: {
    fileListWrap,
  },
  methods: {},
};
</script>

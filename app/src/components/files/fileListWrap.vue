<template>
  <div>
    <file />
    {{files}}
  </div>
</template>

<script>
import file from './file.vue';

export default {
  name: 'fileListWrap',
  components: {
    file,
  },
  data() {
    return {
      files: [],
    };
  },
  methods: {},
  mounted() {
    this.$axios.get('/v1/api/vkann/_i/list').then(res => {
      console.log(res);
      this.files = res.data.list;
    });
  },
};
</script>

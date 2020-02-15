<template >
  <div class="q-pa-xl">{{$route.params.taskId}}</div>
</template>

<script>
export default {
  meta() {
    return { title: this.$t('task') };
  },
};
</script>

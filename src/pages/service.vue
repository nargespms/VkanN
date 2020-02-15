<template >
  <div>{{$route.params.serviceId}}</div>
</template>

<script>
export default {
  meta() {
    return { title: this.$t('service') };
  },
};
</script>

<template >
  <div>{{$route.params.contractId}}</div>
</template>

<script>
export default {
  name: 'contract',
  meta() {
    return { title: this.$t('contract') };
  },
};
</script>

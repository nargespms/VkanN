<template>
  <div class="q-pa-xl">
    <h4 class="headerTitleInPage">
      <span>{{ $t('addService') }}</span>
    </h4>
    <addservice />
  </div>
</template>

<script>
import addservice from '../components/services/addservice.vue';

export default {
  name: 'addServices',
  meta() {
    return { title: this.$t('addService') };
  },

  components: {
    addservice,
  },
};
</script>

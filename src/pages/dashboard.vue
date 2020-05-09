<template>
  <div>
    <div class="pannelStatusCards">
      <pannelStatusCards />
    </div>
  </div>
</template>
<script>
import pannelStatusCards from '../components/structure/pannelStatusCards.vue';

export default {
  meta() {
    return {
      title: this.$t('dashboard'),
    };
  },

  components: {
    pannelStatusCards,
  },
};
</script>

<style lang="scss"></style>

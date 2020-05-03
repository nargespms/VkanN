<template>
  <div>
    <div class="pannelStatusCards">
      <pannelStatusCards />
    </div>
    <charts />
  </div>
</template>
<script>
import pannelStatusCards from '../components/structure/pannelStatusCards.vue';
import charts from '../components/structure/charts.vue';

export default {
  meta() {
    return {
      title: this.$t('dashboard'),
    };
  },

  components: {
    pannelStatusCards,
    charts,
  },
};
</script>

<style lang="scss"></style>

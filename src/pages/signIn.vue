<template >
  <div class="q-pa-xl">
    <signInCard />
  </div>
</template>
<script>
import signInCard from '../components/signIn/signInCard.vue';

export default {
  name: 'signIn',
  components: {
    signInCard,
  },
};
</script>

<template>
  <div class="q-pa-lg">
    <div class="cardActionWrap">
      <cardsAction :data="services.list" />
      <cardsAction :data="services.addService" />
    </div>
  </div>
</template>


<script>
import cardsAction from '../components/structure/cardsAction.vue';

export default {
  name: 'services',
  components: {
    cardsAction,
  },
  data() {
    return {
      services: {
        list: {
          number: 15,
          icon: 'settings_applications',
          bg: '#26A69A',
          cardName: 'servicesList',
          parentUrl: 'services',
        },
        addService: {
          icon: 'perm_data_setting',
          bg: '#ffa900',
          cardName: 'addService',
          parentUrl: 'services',
        },
      },
    };
  },
};
</script>
<style lang="scss">
</style>

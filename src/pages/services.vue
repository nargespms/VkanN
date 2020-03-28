<template>
  <div class="q-pa-xl">
    <div class="cardActionWrap">
      <cardsAction :data="services.list" />

      <cardsAction
        v-if="
          ($store.state.module1.userData.role === 'MANAGER' && $store.state.module1.userData.department === 'GENERAL') ||
            ($store.state.module1.userData.role === 'MANAGER' && $store.state.module1.userData.department === 'TECH') ||
            ($store.state.module1.userData.role === 'MANAGER' && $store.state.module1.userData.department === 'BILLING') ||
            ($store.state.module1.userData.role === 'ASSISTANT' && $store.state.module1.userData.department === 'GENERAL') ||
            ($store.state.module1.userData.role === 'ASSISTANT' && $store.state.module1.userData.department === 'TECH') ||
            ($store.state.module1.userData.role === 'ASSISTANT' && $store.state.module1.userData.department === 'BILLING')
        "
        :data="services.addService"
      />
    </div>
  </div>
</template>

<script>
import cardsAction from '../components/structure/cardsAction.vue';

export default {
  name: 'services',
  meta() {
    return { title: this.$t('services') };
  },

  components: {
    cardsAction,
  },
  data() {
    return {
      services: {
        list: {
          number: 15,
          icon: 'fa fa-table',
          bg: '#26A69A',
          cardName: 'servicesList',
          parentUrl: 'services',
        },
        addService: {
          icon: 'fas fa-plus',
          bg: '#ffa900',
          cardName: 'addService',
          parentUrl: 'services',
        },
      },
    };
  },
};
</script>
<style lang="scss"></style>

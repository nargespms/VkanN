<template>
  <div class="q-pa-xl">
    <div class="cardActionWrap">
      <cardsAction :data="services.list" />

      <cardsAction
        v-if="
          ($store.state.module1.userData.user.role === 'MANAGER' && $store.state.module1.userData.user.department === 'GENERAL') ||
            ($store.state.module1.userData.user.role === 'MANAGER' && $store.state.module1.userData.user.department === 'TECH') ||
            ($store.state.module1.userData.user.role === 'MANAGER' && $store.state.module1.userData.user.department === 'BILLING') ||
            ($store.state.module1.userData.user.role === 'ASSISTANT' && $store.state.module1.userData.user.department === 'GENERAL') ||
            ($store.state.module1.userData.user.role === 'ASSISTANT' && $store.state.module1.userData.user.department === 'TECH') ||
            ($store.state.module1.userData.user.role === 'ASSISTANT' && $store.state.module1.userData.user.department === 'BILLING')
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

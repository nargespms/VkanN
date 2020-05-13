<template>
  <div class="q-pa-xl">
    <div class="cardActionWrap">
      <cardsAction
        v-if="
      $store.state.module1.userData.user.role === 'MANAGER'
      "
        :data="users.staffs"
      />
      <cardsAction
        :data="users.clients"
        v-if="$store.state.module1.userData.user.role !== 'CLIENT'"
      />
      <cardsAction
        v-if="

            $store.state.module1.userData.user.role === 'MANAGER' ||
            $store.state.module1.userData.user.role === 'ASSISTANT'
        "
        :data="users.addMember"
      />
    </div>
  </div>
</template>

<script>
import cardsAction from '../components/structure/cardsAction.vue';

export default {
  meta() {
    return { title: this.$t('userManagement') };
  },

  components: {
    cardsAction,
  },
  name: 'userManagement',
  data() {
    return {
      users: {
        staffs: {
          icon: 'person_pin',
          bg: '#26A69A',
          cardName: 'staffs',
          parentUrl: 'userManagement',
        },
        clients: {
          icon: 'people',
          bg: '#D64367',
          cardName: 'clients',
          parentUrl: 'userManagement',
        },
        addMember: {
          icon: 'person_add',
          bg: '#ffa900',
          cardName: 'addMember',
          parentUrl: 'userManagement',
        },
      },
    };
  },
};
</script>
<style lang="scss"></style>

<template>
  <div class="q-pa-lg">
    <div class="cardActionWrap">
      <cardsAction :data="users.staffs" />
      <cardsAction :data="users.clients" />
      <cardsAction :data="users.addMember" />
    </div>
  </div>
</template>


<script>
import cardsAction from '../components/structure/cardsAction.vue';

export default {
  components: {
    cardsAction,
  },
  data() {
    return {
      name: 'userManagement',
      users: {
        staffs: {
          number: 15,
          icon: 'person_pin',
          bg: '#26A69A',
          cardName: 'staffs',
        },
        clients: {
          number: 150,
          icon: 'people',
          bg: '#D64367',
          cardName: 'clients',
        },
        addMember: {
          icon: 'person_add',
          bg: '#ffa900',
          cardName: 'addMember',
        },
      },
    };
  },
};
</script>
<style lang="scss">
.cardActionWrap {
  display: flex;
  justify-content: center;
}
</style>

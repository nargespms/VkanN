<template >
  <div class="q-pa-xl">
    <div class="cardActionWrap">
      <cardsAction :data="contracts.list" />
      <cardsAction
        v-if="$store.state.module1.userData.role !== 'CLIENT'"
        :data="contracts.addContract"
      />
    </div>
  </div>
</template>

<script>
import cardsAction from '../components/structure/cardsAction.vue';

export default {
  name: 'contracts',
  components: {
    cardsAction,
  },
  data() {
    return {
      contracts: {
        list: {
          number: 15,
          icon: 'fas fa-handshake',
          bg: '#26A69A',
          cardName: 'contractsList',
          parentUrl: 'billing/contracts',
        },
        addContract: {
          icon: 'fas fa-handshake',
          bg: '#ffa900',
          cardName: 'addContract',
          parentUrl: 'billing/contracts',
        },
      },
    };
  },
};
</script>

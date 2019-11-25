<template >
  <div class="q-pa-lg">
    <div class="cardActionWrap">
      <cardsAction :data="contracts.list" />
      <cardsAction :data="contracts.addContract" />
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
          icon: 'settings_applications',
          bg: '#26A69A',
          cardName: 'contractsList',
          parentUrl: 'contracts',
        },
        addContract: {
          icon: 'perm_data_setting',
          bg: '#ffa900',
          cardName: 'addContract',
          parentUrl: 'contracts',
        },
      },
    };
  },
};
</script>

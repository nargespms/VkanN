<template >
  <div class="q-pa-xl">
    <div class="cardActionWrap">
      <cardsAction :data="files.invoices" />
      <cardsAction :data="files.contracts" />
    </div>
  </div>
</template>

<script>
import cardsAction from '../components/structure/cardsAction.vue';

export default {
  name: 'fileManagements',
  components: {
    cardsAction,
  },
  data() {
    return {
      files: {
        invoices: {
          number: 15,
          icon: 'fas fa-copy',
          bg: '#26A69A',
          cardName: 'filesList',
          parentUrl: 'fileManagements',
        },
        contracts: {
          icon: 'fa fa-upload',
          bg: '#ffa900',
          cardName: 'uploadFile',
          parentUrl: 'fileManagements',
        },
      },
    };
  },
};
</script>

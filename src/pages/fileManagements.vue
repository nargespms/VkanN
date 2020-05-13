<template>
  <div class="q-pa-xl">
    <div class="cardActionWrap">
      <cardsAction :data="files.list" />
      <cardsAction :data="files.add" />
    </div>
  </div>
</template>

<script>
import cardsAction from '../components/structure/cardsAction.vue';

export default {
  name: 'fileManagements',
  meta() {
    return { title: this.$t('fileManagements') };
  },

  components: {
    cardsAction,
  },
  data() {
    return {
      files: {
        list: {
          icon: 'fas fa-copy',
          bg: '#26A69A',
          cardName: 'filesList',
          parentUrl: 'fileManagements',
        },
        add: {
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

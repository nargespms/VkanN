<template>
  <div class="q-pa-xl">
    <div class="cardActionWrap">
      <cardsAction :data="tasks.myList" />
      <cardsAction :data="tasks.addTasks" />
      <cardsAction
        v-if=" ($store.state.module1.userData.user.role === 'MANAGER' &&
            $store.state.module1.userData.user.department === 'GENERAL') ||
            ($store.state.module1.userData.user.role === 'MANAGER' &&
            $store.state.module1.userData.user.department === 'TECH') ||
            ($store.state.module1.userData.user.role === 'MANAGER' &&
            $store.state.module1.userData.user.department === 'BILLING') ||
            ($store.state.module1.userData.user.role === 'ASSISTANT' &&
            $store.state.module1.userData.user.department === 'GENERAL') ||
            ($store.state.module1.userData.user.role === 'ASSISTANT' &&
            $store.state.module1.userData.user.department === 'TECH') ||
            ($store.state.module1.userData.user.role === 'ASSISTANT' &&
            $store.state.module1.userData.user.department === 'BILLING') "
        :data="tasks.list"
      />
      <cardsAction :data="tasks.kanboard" />
    </div>
  </div>
</template>

<script>
import cardsAction from '../components/structure/cardsAction.vue';

export default {
  name: 'tasks',
  meta() {
    return { title: this.$t('tasks') };
  },

  components: {
    cardsAction,
  },
  data() {
    return {
      tasks: {
        addTasks: {
          icon: 'play_for_work',
          bg: '#ffa900',
          cardName: 'addTask',
          parentUrl: 'tasks',
        },
        myList: {
          number: 18,
          icon: 'play_for_work',
          bg: '#26A69A',
          cardName: 'myTasksList',
          parentUrl: 'tasks',
        },
        list: {
          number: 150,
          icon: 'play_for_work',
          bg: '#D64367',
          cardName: 'tasksList',
          parentUrl: 'tasks',
        },
        kanboard: {
          number: 100,
          icon: 'fa fa-table',
          bg: '#1a667e',
          cardName: 'kanBoard',
          parentUrl: 'tasks',
        },
      },
    };
  },
};
</script>

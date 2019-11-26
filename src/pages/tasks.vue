<template>
  <div class="q-pa-lg">
    <div class="cardActionWrap">
      <cardsAction :data="tasks.myList" />
      <cardsAction :data="tasks.addTasks" />
      <cardsAction :data="tasks.list" />
    </div>
  </div>
</template>

<script>
import cardsAction from '../components/structure/cardsAction.vue';

export default {
  name: 'tasks',
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
      },
    };
  },
};
</script>

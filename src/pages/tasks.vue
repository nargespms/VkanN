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
  name: 'myTasks',
  components: {
    cardsAction,
  },
  data() {
    return {
      tasks: {
        addTasks: {
          icon: 'system_update_alt',
          bg: '#ffa900',
          cardName: 'addTask',
          parentUrl: 'tasks',
        },
        myList: {
          number: 18,
          icon: 'system_update_alt',
          bg: '#26A69A',
          cardName: 'myTasksList',
          parentUrl: 'tasks',
        },
        list: {
          number: 150,
          icon: 'system_update_alt',
          bg: '#D64367',
          cardName: 'tasksList',
          parentUrl: 'tasks',
        },
      },
    };
  },
};
</script>

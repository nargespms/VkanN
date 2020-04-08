<template>
  <div>
    secondSpirint
    <draggable
      :emptyInsertThreshold="100"
      class="kanboardColumns"
      @change="log"
      @add="add"
      group="task"
    >
      <transition-group name="list-complete">
        <template v-for="item in data">
          <taskCard :data="item" :key="item.id" />
        </template>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import taskCard from './taskCard.vue';

export default {
  name: 'secondSpirint',
  components: {
    taskCard,
    draggable,
  },
  data() {
    return {
      data: [],
      newItem: {},
    };
  },
  methods: {
    log(evt) {
      window.console.log(evt);
      console.log('update in second');
    },

    add(evt) {
      // window.console.log(evt);
      // eslint-disable-next-line no-underscore-dangle
      this.newItem = evt.item.__vue__._data.item;
      this.$axios
        .patch(`/v1/api/vkann/tasks/state/${this.newItem.id}`, {
          state: 'SPRINT2',
        })

        .catch(e => {
          if (e.response.status === 403) {
            this.$q.notify({
              message: this.$t('accessDenied'),
              color: 'negative',
              icon: 'warning',
              position: 'top',
            });
          }
        });
      this.$emit('reloadCmp', true);
    },
  },
  mounted() {
    this.$axios.get('/v1/api/vkann/kanboard/sprint2').then(res => {
      console.log(res);
      this.data = res.data.result.docs;
    });
  },
};
</script>

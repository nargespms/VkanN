<template>
  <div>
    <draggable class="kanboardColumns" @change="log" @add="add" group="task">
      test
      <div name="list-complete">
        <template v-for="item in data">
          <taskCard :data="item" :key="item.id" @deleteTaskOperation="deleteTaskOperation" />
        </template>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import taskCard from './taskCard.vue';

export default {
  name: 'kanboardTest',
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
    deleteTaskOperation(value) {
      this.$axios
        .delete(`/v1/api/vkann/tasks/${value.id}`)
        .then(res => {
          console.log(res);
          this.$emit('reloadCmp', true);
        })
        .catch(e => {
          console.log(e);
        });
    },

    log(evt) {
      console.log('update in DRAFT');
      console.log(evt);
    },
    add(evt) {
      // eslint-disable-next-line no-underscore-dangle
      this.newItem = evt.item.__vue__._data.item;
      this.$axios
        .patch(`/v1/api/vkann/tasks/state/${this.newItem.id}`, {
          state: 'DRAFT',
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
    this.$axios.get('/v1/api/vkann/kanboard/test').then(res => {
      this.data = res.data.result.docs;
    });
  },
};
</script>

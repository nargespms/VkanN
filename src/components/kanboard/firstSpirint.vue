<template>
  <div>
    <span class="headerTitleKanboard">{{ $t('firstSpirint') }}</span>

    <draggable
      :emptyInsertThreshold="100"
      class="kanboardColumns"
      @change="log"
      @add="add"
      group="task"
    >
      <div name="list-complete">
        <template v-for="item in data">
          <taskCard
            :data="item"
            :key="item.id"
            @deleteTaskOperation="deleteTaskOperation"
            @taskModalEdit="taskModalEdit"
          />
        </template>
      </div>
    </draggable>
    <taskModal :editData="task" :edit="enableEdit" @disable="disable" />
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import taskCard from './taskCard.vue';
import taskModal from '../structure/taskModal.vue';

export default {
  name: 'firstSpirint',
  components: {
    taskCard,
    draggable,
    taskModal,
  },
  data() {
    return {
      data: [],
      newItem: {},
      task: {},
      enableEdit: false,
    };
  },
  methods: {
    disable(value) {
      this.enableEdit = value;
    },
    taskModalEdit(value) {
      this.task = value;
      this.enableEdit = true;
    },
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
      console.log('update in first');
      console.log(evt.data);
    },

    add(evt) {
      // window.console.log(evt);
      // eslint-disable-next-line no-underscore-dangle
      this.newItem = evt.item.__vue__._data.item;
      this.$axios
        .patch(`/v1/api/vkann/tasks/state/${this.newItem.id}`, {
          state: 'SPRINT1',
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
    this.$axios.get('/v1/api/vkann/kanboard/sprint1').then(res => {
      this.data = res.data.result.docs;
    });
  },
};
</script>

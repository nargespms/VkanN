<template>
  <div class="kanboardColumns bgdarkBlue">
    <span class="headerTitleKanboard">{{ $t('toDo') }}</span>
    <q-scroll-area ref="scrollArea" :visible="visible" class="kanboardScrollArea">
      <draggable :emptyInsertThreshold="100" @change="log" @add="add" group="task">
        <transition-group name="list-complete">
          <template v-for="item in data">
            <taskCard
              :data="item"
              :key="item.id"
              @deleteTaskOperation="deleteTaskOperation"
              @taskModalEdit="taskModalEdit"
            />
          </template>
        </transition-group>
      </draggable>
      <taskModal
        v-show="false"
        :editData="task"
        :edit="enableEdit"
        @disable="disable"
        @reloadCmp="reloadCmp"
      />
    </q-scroll-area>
    <q-pagination class="mt12" color="black" v-model="pageNumber" :max="5" :direction-links="true" />

    <q-btn round icon="fas fa-arrow-up" class="goUpBut" @click="animateScroll" />
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import taskCard from './taskCard.vue';
import taskModal from '../structure/taskModal.vue';

export default {
  name: 'todoTasks',
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
      visible: false,
      position: 0,
      pageNumber: 1,
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
    reloadCmp(value) {
      this.$emit('reloadCmp', value);
      console.log('firstSpirint');
    },
    deleteTaskOperation(value) {
      this.$axios.delete(`/v1/api/vkann/tasks/${value}`).then(res => {
        console.log(res).catch(e => {
          console.log(e);
        });
      });
    },

    log(evt) {
      console.log('update in todo');
      console.log(evt);
    },
    add(evt) {
      // eslint-disable-next-line no-underscore-dangle
      this.newItem = evt.item.__vue__._data.item;
      this.$axios
        .patch(`/v1/api/vkann/tasks/state/${this.newItem.id}`, {
          state: 'TODO',
        })
        .then(res => {
          if (res.status === 200) {
            this.$emit('reloadCmp', true);
          }
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
    },

    animateScroll() {
      this.$refs.scrollArea.setScrollPosition(0);
      this.position = Math.floor(Math.random() * 1001) * 20;
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  },
  mounted() {
    this.$axios.get('/v1/api/vkann/kanboard/todo').then(res => {
      this.data = res.data.result.docs;
    });
  },
};
</script>

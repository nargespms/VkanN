<template>
  <div class="kanboardColumns bgd9">
    <span class="headerTitleKanboard">{{ $t('draft') }}</span>
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
    <q-btn round icon="fas fa-arrow-up" class="goUpBut" @click="animateScroll" />
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import taskCard from './taskCard.vue';
import taskModal from '../structure/taskModal.vue';

export default {
  name: 'drafts',
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
      enableEdit: '',
      visible: false,
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
    animateScroll() {
      this.$refs.scrollArea.setScrollPosition(0);
      this.position = Math.floor(Math.random() * 1001) * 20;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
  mounted() {
    this.$axios.get('/v1/api/vkann/kanboard/draft').then(res => {
      this.data = res.data.result.docs;
    });
  },
};
</script>

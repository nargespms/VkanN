<template>
  <div class="kanboardColumns bgdarkBlue">
    <span class="headerTitleKanboard">
      {{ $t('secondSpirint') }}
      <span
        class="searchColumn"
        @click="kanboardFilterColumn =!kanboardFilterColumn"
      >
        <q-icon name="fas fa-undo" @click="reloadCmp()"></q-icon>
        <q-icon name="fas fa-filter"></q-icon>
      </span>
    </span>
    <kanboardFilterColumn @getFilterColumn="getFilterColumn" v-if="kanboardFilterColumn" />

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
    <q-pagination
      v-if="!loading"
      class="mt12 paginationNum"
      color="black"
      v-model="pagination.page"
      :max="totalPages"
      :direction-links="true"
      @input="onRequest()"
    />
    <q-btn round icon="fas fa-arrow-up" class="goUpBut" @click="animateScroll" />
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import taskCard from './taskCard.vue';
import taskModal from '../structure/taskModal.vue';
import kanboardFilterColumn from './kanboardFilterColumn.vue';

export default {
  name: 'secondSpirint',
  components: {
    taskCard,
    draggable,
    taskModal,
    kanboardFilterColumn,
  },
  data() {
    return {
      data: [],
      newItem: {},
      task: {},
      enableEdit: '',
      visible: false,
      position: 0,
      pageNumber: 1,
      totalPages: 2,
      collumnSearch: '',
      filter: '',
      pagination: { descending: false, page: 1, limit: 5 },
      kanboardFilterColumn: false,
      filterable: false,
      loading: true,
    };
  },
  methods: {
    getFilterColumn(value) {
      this.filter = value;
      this.filterable = true;
      this.onRequest();
    },

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
    animateScroll() {
      this.$refs.scrollArea.setScrollPosition(0);
      this.position = Math.floor(Math.random() * 1001) * 20;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    onRequest() {
      // eslint-disable-next-line prefer-destructuring
      const filter = this.filter;

      const { page, limit, descending } = this.pagination;
      // const { collumnSearch, filter } = props;
      // console.log(props);
      this.$axios
        .get('/v1/api/vkann/kanboard/sprint2', {
          params: {
            page,
            limit,
            descending,
            // collumnSearch,
            ...(this.filterable ? { filter } : ''),
          },
        })
        .then(response => {
          console.log(response.data);
          this.data = response.data.result.docs;
          // this.pagination.rowsNumber = response.data.result.length;
          this.totalPages = response.data.result.totalPages;
          // don't forget to update local pagination object
          this.pagination.page = page;
          this.pagination.limit = limit;
          this.pagination.descending = descending;
          this.loading = false;
        });
    },
  },
  mounted() {
    this.onRequest();
  },
};
</script>

<template>
  <div class="kanboardColumns bgd9">
    <span class="headerTitleKanboard">
      {{ $t('firstSpirint') }}
      <span class="searchColumn">
        <q-icon class="pointer" name="fas fa-undo" @click="reloadCmp()"></q-icon>
        <q-icon
          class="pointer"
          name="fas fa-filter"
          @click="kanboardFilterColumn =!kanboardFilterColumn"
        ></q-icon>
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
              @taskModalComment="taskModalComment"
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
      <q-dialog v-model="enableComments" transition-show="jump-down" transition-hide="jump-up">
        <taskComment
          @setCommentValue="setCommentValue"
          v-show="enableComments"
          class="bg-white q-pa-lg"
          view="Lhh lpR fff"
          style="width: 1000px;max-width:50vw;"
        />
      </q-dialog>
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
import taskComment from '../tasks/taskComment.vue';

export default {
  name: 'firstSpirint',
  components: {
    taskCard,
    taskComment,
    draggable,
    taskModal,
    kanboardFilterColumn,
  },
  props: ['staffFilter'],
  data() {
    return {
      data: [],
      newItem: {},
      task: {},
      enableEdit: false,
      visible: false,
      position: 0,
      pageNumber: 1,
      totalPages: 2,
      collumnSearch: '',
      filter: '',
      pagination: {
        descending: false,
        page: 1,
        limit: 5,
      },
      kanboardFilterColumn: false,
      filterable: false,
      loading: true,
      enableComments: false,
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
    taskModalComment(value) {
      console.log(value);
      this.enableComments = true;
    },
    setCommentValue(value) {
      console.log(value);
      console.log('edit comment');
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
      console.log('update in first');
      console.log(evt.data);
    },

    add(evt) {
      this.$axios
        .patch(`/v1/api/vkann/tasks/state/${evt.item.id}`, {
          state: 'SPRINT1',
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
    onRequest() {
      // eslint-disable-next-line prefer-destructuring
      const filter = this.filter;

      const { page, limit, descending } = this.pagination;
      // const { collumnSearch, filter } = props;
      // console.log(props);
      this.$axios
        .get('/v1/api/vkann/kanboard/sprint1', {
          params: {
            page,
            limit,
            descending,
            // collumnSearch,
            ...(this.filterable ? { filter } : ''),
          },
        })
        .then(response => {
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
  watch: {
    staffFilter(newVal) {
      const asignee = { asignee: newVal };
      this.filter = asignee;
      this.filterable = true;
      this.onRequest();
    },
  },
};
</script>

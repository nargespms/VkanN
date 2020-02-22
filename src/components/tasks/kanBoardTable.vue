<template>
  <div>
    <div class="row" v-drag-and-drop="options">
      <!-- tickets -->
      <div class="ticketsKanBoard">
        <h3 class="center">
          tickets
        </h3>
        <q-item v-for="ticket in tickets" :key="ticket.id">
          {{ ticket.id }}
        </q-item>
      </div>
      <!-- tickets -->

      <!-- tasks -->
      <q-list
        v-for="task in tasks"
        :key="task.id"
        class="tasksListState"
        :data-id="task.id"
        @added="added($event, task)"
        @removed="removed($event, task)"
        @reordered="reordered($event, task)"
      >
        <h3 class="center">
          {{ task.name }}
        </h3>
        <q-card v-for="item in task.items" :key="item.id" :data-id="item.id" class=" taskPacket">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>
                {{ item.name }}
              </q-item-label>
              <q-item-label caption>Subhead</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-icon name="calendar"></q-icon>
            <q-item-section>
              <span>
                {{ item.dueDate }}
              </span>
            </q-item-section>
          </q-item>
        </q-card>
      </q-list>
      <!-- tasks -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'kanBoardTable',
  data() {
    return {
      tickets: [],
      tasks: [],
      options: {
        multipleDropzonesItemsDraggingEnabled: false,
        dropzoneSelector: '.q-list',
        draggableSelector: '.q-card',
      },
    };
  },
  methods: {
    // localdate(item) {
    //   // return item.toLocaleDateString('fa');
    //   // console.log(item.toLocaleString(`${this.$route.params.locale}`));
    //   // return item.toLocaleString(this.$route.params.locale);
    //   // const standardStartDate = new Date();
    //   // console.log(standardStartDate.toLocaleDateString(this.$route.params.locale));
    // },
    added(event, group) {
      const newItems = this.tasks
        .map(g => g.items)
        .reduce((prev, curr) => [...prev, ...curr], [])
        .filter(item => event.detail.ids.map(Number).indexOf(item.id) >= 0);
      group.items.splice(event.detail.index, 0, ...newItems);
    },
    removed(event, group) {
      group.items = group.items.filter(item => event.detail.ids.map(Number).indexOf(item.id) < 0);
    },
    reordered(event, group) {
      const reorderedItems = group.items.filter(item => event.detail.ids.map(Number).indexOf(item.id) >= 0);
      const newItems = group.items.filter(item => event.detail.ids.map(Number).indexOf(item.id) < 0);
      newItems.splice(event.detail.index, 0, ...reorderedItems);
      group.items = newItems;
    },
  },
  mounted() {
    this.$axios.get('/statics/tickets.json').then(res => {
      this.tickets = res.data.data;
    });
    this.$axios.get('/statics/kanBoardTasks.json').then(res => {
      console.log(res.data);
      this.tasks = res.data;
    });
  },
};
</script>

<style lang="scss">
.tasksListState {
  min-width: 10rem;
  margin-top: 0 !important;
  border: 1px solid grey;
  padding: 0px 12px;
}
.taskPacket[aria-grabbed='true'] {
  background: #5cc1a6;
  color: #fff;
}
@keyframes nodeInserted {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 0.8;
  }
}
.item-dropzone-area {
  height: 2rem;
  background: #888;
  opacity: 0.8;
  animation-duration: 0.5s;
  animation-name: nodeInserted;
  margin-left: 0.6rem;
  margin-right: 0.6rem;
}
// mine style
.taskPacket {
  cursor: move;
  border: 1px solid #bdbdbd;
  background-color: #e4e4e4;
  margin: 8px 0px;
}
.ticketsKanBoard {
  border: 1px solid grey;
}
.center {
  text-align: center;
}
h3 {
  font-size: 15px;
  font-weight: bold;
  padding: 4px 8px;
}
</style>

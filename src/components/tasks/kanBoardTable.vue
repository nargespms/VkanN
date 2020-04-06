<template>
  <div>
    <table class="ticketsKanBoard">
      <!-- <thead>
        <tr>
          <th>{{ $t('toDo') }}</th>
          <th>{{ $t('firstSpirint') }}</th>
          <th>{{ $t('secondSpirint') }}</th>
          <th>{{ $t('draft') }}</th>
          <th>{{ $t('WIP') }}</th>
          <th>{{ $t('test') }}</th>
          <th>{{ $t('done') }}</th>
        </tr>
      </thead>-->
      <tbody>
        <tr class="flex">
          <td>
            <todoTasks :key="todoKey" @reloadCmp="reloadTodo" />
          </td>
          <td>
            <firstSpirint :key="spirint1Key" @reloadCmp="reloadSpirint1" />
          </td>
          <td>
            <secondSpirint :key="spirint2Key" @reloadCmp="reloadSpirint2" />
          </td>
          <td>
            <drafts :key="draftsKey" @reloadCmp="reloadDrafts" />
          </td>
          <td>
            <WIP :key="wipKey" @reloadCmp="reloadWIP" />
          </td>
          <!-- <td>
            <kanboardTest :key="testKey" @reloadCmp="reloadTest" />
          </td>-->
          <td>
            <kanboardDone :key="doneKey" @reloadCmp="reloadDone" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import todoTasks from '../kanboard/todoTasks.vue';
import firstSpirint from '../kanboard/firstSpirint.vue';
import secondSpirint from '../kanboard/secondSpirint.vue';
import drafts from '../kanboard/drafts.vue';
import WIP from '../kanboard/WIP.vue';
import kanboardDone from '../kanboard/kanboardDone.vue';

export default {
  name: 'kanBoardTable',
  components: {
    todoTasks,
    firstSpirint,
    secondSpirint,
    drafts,
    WIP,
    kanboardDone,
  },
  data() {
    return {
      tickets: [],
      tasks: [],
      todoKey: 0,
      spirint1Key: 0,
      spirint2Key: 0,
      draftsKey: 0,
      wipKey: 0,
      doneKey: 0,
    };
  },
  methods: {
    reloadTodo(value) {
      console.log(value);
      this.todoKey += 1;
    },
    reloadSpirint1(value) {
      console.log(value);
      console.log('umad to reload sprint1');

      this.spirint1Key += 1;
    },
    reloadSpirint2(value) {
      console.log(value);
      this.spirint2Key += 1;
    },
    reloadDrafts(value) {
      console.log(value);
      this.draftsKey += 1;
    },
    reloadWIP(value) {
      console.log(value);
      this.wipKey += 1;
    },
    reloadDone(value) {
      console.log(value);
      this.doneKey += 1;
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.tasksListState {
  min-width: 10rem;
  margin-top: 0 !important;
  border: 1px solid grey;
  padding: 0px 12px;
  background-color: #e6e6e6;
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
  background-color: #f7f7f7;
  margin: 8px 0px;
}
.ticketsKanBoard {
  border: 1px solid grey;
}
@media screen and (max-width: 800px) {
  .ticketsKanBoard {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
}
.center {
  text-align: center;
}
h3 {
  font-size: 15px;
  font-weight: bold;
  padding: 4px 8px;
}
.kanboardColumns {
  border: 1px solid red;
  background-color: pink;
  width: 200px;
  min-height: 550px;
}
</style>

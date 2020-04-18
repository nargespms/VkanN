<template>
  <div class="w100">
    <table class="ticketsKanBoard">
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
.headerTitleKanboard {
  background-color: #353535;
  padding: 12px;
  color: white;
  text-align: center;
  display: block;
}
.ticketsKanBoard {
  border: 1px solid grey;
  width: 100%;
  td {
    width: calc(100% / 6);
  }
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
  border: 1px solid #bab1f9;
  padding: 8px;
  min-height: 900px;
}
.bgdarkBlue {
  background-color: #2f718f40;
}
.bgd9 {
  background-color: #d9d9d9;
}
.kanboardScrollArea {
  height: 850px;
  width: 100%;
}
.goUpBut {
  display: block;
  // margin: 8px auto;
  margin-top: 12px;
  background-color: #347f97;
  color: #fff;
  .q-btn__wrapper {
    min-width: 2.5em;
    min-height: 2.5em;
    i {
      font-size: 16px;
    }
  }
}
.paginationNum {
  justify-content: space-evenly;
}
.paginationNum {
  button:active {
    background: transparent !important;
    color: grey !important;
    box-shadow: none !important;
  }
}
</style>

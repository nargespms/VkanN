<template>
  <q-card
    class="taskPacket"
    :id="item.id"
    @drag="dragged"
    :class="item.priority === 'CRITICAL' ? 'border-red': 'border-default'"
  >
    <span class="operationBut" @click="enableOp = !enableOp">
      ...
      <q-tooltip
        v-model="showing"
        transition-show="scale"
        transition-hide="scale"
      >{{ $t('operation') }}</q-tooltip>
    </span>

    <q-item class="taskHead">
      <q-item-section avatar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ item.title }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />

    <ul class="taskMoreOpt">
      <li class="priorityTask">
        <div class="departmentTask" v-if="$store.state.module1.userData.user.role === 'MANAGER'">
          <q-icon
            v-if="item.department === 'TECH'"
            class="pr12 fn18"
            name="fas fa-cogs"
            color="primary"
          >
            <q-tooltip
              v-model="showing1"
              transition-show="scale"
              transition-hide="scale"
            >{{ $t('TECH') }}</q-tooltip>
          </q-icon>
          <q-icon
            v-if="item.department === 'INFO'"
            class="pr12 fn18"
            name="fas fa-info-circle"
            color="primary"
          >
            <q-tooltip
              v-model="showing1"
              transition-show="scale"
              transition-hide="scale"
            >{{ $t('INFO') }}</q-tooltip>
          </q-icon>
          <q-icon
            v-if="item.department === 'BILLING'"
            class="pr12 fn18"
            name="fas fa-file-invoice-dollar"
            color="primary"
          >
            <q-tooltip
              v-model="showing1"
              transition-show="scale"
              transition-hide="scale"
            >{{ $t('BILLING') }}</q-tooltip>
          </q-icon>
          <q-icon
            v-if="item.department === 'GENERAL'"
            class="pr12 fn18"
            name="fas fa-user-secret"
            color="primary"
          >
            <q-tooltip
              v-model="showing1"
              transition-show="scale"
              transition-hide="scale"
            >{{ $t('GENERAL') }}</q-tooltip>
          </q-icon>
        </div>
        <q-icon
          class="pr12 fn18 pl12"
          v-if="item.priority === 'CRITICAL'"
          name="warning"
          color="negative"
        >
          <q-tooltip
            v-model="showing2"
            transition-show="scale"
            transition-hide="scale"
          >{{ $t('CRITICAL') }}</q-tooltip>
        </q-icon>
      </li>
      <li v-if="item.dueDate">
        <span>
          <q-icon name="fa fa-clock" color="negative"></q-icon>
          <span>{{$t('dueDate')}} :</span>
          <span class="numberDir">
            {{ new Date(item.dueDate).toLocaleDateString(`${$route.params.locale}`)
            }}
          </span>
        </span>
      </li>
      <li class="operationCel" v-if="enableOp">
        {{$t('operation')}}
        <q-icon name="fas fa-comment" @click="commentTask">
          <q-tooltip transition-show="scale" transition-hide="scale" v-model="comment">
            {{
            $t('comments')
            }}
          </q-tooltip>
        </q-icon>
        <q-icon name="edit" @click="editTask">
          <q-tooltip transition-show="scale" transition-hide="scale" v-model="edit">
            {{
            $t('editTask')
            }}
          </q-tooltip>
        </q-icon>
        <q-icon
          @click="deleteTask"
          name="fa fa-trash"
          v-if="$store.state.module1.userData.user.role === 'MANAGER'"
        >
          <q-tooltip transition-show="scale" transition-hide="scale" v-model="del">
            {{
            $t('deleteTask')
            }}
          </q-tooltip>
        </q-icon>
      </li>
    </ul>
  </q-card>
</template>

<script>
export default {
  name: 'taskCard',

  props: ['data'],
  data() {
    return {
      item: { ...this.data },
      enableOp: false,
      showing: false,
      showing1: false,
      showing2: false,
      comment: false,
      edit: false,
      del: false,
    };
  },
  methods: {
    dragged() {
      this.$emit('dragedItem', this.item);
    },
    deleteTask() {
      this.$q
        .dialog({
          title: this.$t('deleteTask'),
          message: this.$t('areyousureyouwanttodeletethisTask'),
          cancel: true,
        })
        .onOk(() => {
          this.$emit('deleteTaskOperation', this.item);
        })
        .onCancel(() => {
          console.log('Cancel');
        });
    },
    editTask() {
      this.$emit('taskModalEdit', this.item);
    },
    commentTask() {
      this.$emit('taskModalComment', this.item);
    },
  },
};
</script>
<style lang="scss">
.taskPacket {
  cursor: move;
  background-color: #f7f7f7;
  margin: 8px 0px;
  width: 95%;
  border-left: 5px solid #2f718f !important;
  overflow: hidden;
}
.border-red {
  border: 1px solid #dd0707;
}
.border-default {
  border: 1px solid #bdbdbd;
}
.taskMoreOpt {
  li {
    width: 100%;
    border-bottom: 1px solid #c8c8c8;
    padding: 8px 12px;

    &:last-child {
      border-bottom: none;
    }
  }
}
.operationCel {
  background-color: #2f718f;
  color: #fff;
  justify-content: space-around;
  display: flex;
  i {
    align-self: center;
    cursor: pointer;
    padding: 12px;
  }
}
.priorityTask {
  padding: 8px 12px;
  display: flex;
  i {
    padding-top: 8px;
  }
}
.departmentTask {
  display: flex;
  i {
    padding-top: 8px;
  }
}
.operationBut {
  font-size: 18px;
  color: #000;
  float: right;
  // background-color: #2f718f;
  padding: 0px 12px 8px 12px;
  border-radius: 0 0 0 5px;
  cursor: pointer;
}
@media screen and (max-width: 1200px) {
  .taskHead {
    display: block;
  }
}
</style>

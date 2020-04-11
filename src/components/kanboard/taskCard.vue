<template>
  <q-card
    class="taskPacket"
    @drag="dragged"
    :class="item.priority === 'CRITICAL' ? 'border-red': 'border-default'"
  >
    <q-item>
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
        <q-icon class="pr12" v-if="item.priority === 'CRITICAL'" name="warning" color="negative" />
        <span :class="item.priority === 'CRITICAL' ? 'text-red-9': ''">{{$t(item.priority)}}</span>
      </li>
      <li class="departmentTask" v-if="$store.state.module1.userData.role === 'MANAGER'">
        <q-icon class="pr12" name="far fa-building" color="primary" />
        <span class="text-primary">{{ $t(item.department) }}</span>
      </li>
      <li>
        <q-icon name="calendar"></q-icon>
        <span>{{ item.dueDate }}</span>
      </li>
      <li class="operationCel">
        {{$t('operation')}}
        <q-icon name="edit" @click="editTask">
          <q-tooltip transition-show="scale" transition-hide="scale">
            {{
            $t('editTask')
            }}
          </q-tooltip>
        </q-icon>
        <q-icon
          @click="deleteTask"
          name="fa fa-trash"
          v-if="$store.state.module1.userData.role === 'MANAGER'"
        >
          <q-tooltip transition-show="scale" transition-hide="scale">
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
  },
};
</script>
<style lang="scss">
.taskPacket {
  cursor: move;
  background-color: #f7f7f7;
  margin: 8px 0px;
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
  padding: 8px 12px;
  display: flex;
  i {
    padding-top: 8px;
  }
}
</style>

<template>
  <div class="newTaskWrapper">
    <q-form @submit="submitTask">
      <div class="primarynewTaskInfo taskWrapper">
        <div class="newTaskInfoHeader">{{ $t('essentialInformation') }}</div>
        <div class="primarynewTaskContent">
          <div class="taskText pt20">
            <q-input
              autofocus
              outlined
              class="inputFieldText"
              color="light-blue-10"
              v-model.trim="task.title"
              :label="$t('title')"
              required
              lazy-rules
              :rules="[val => val && val.length > 0]"
            >
              <template v-slot:prepend>
                <q-icon name />
              </template>
            </q-input>

            <editor
              v-if="profileMode !== 'Edit' && state !== 'kanboard'"
              @getTextFromEditor="getTextFromEditor"
            />

            <editorProp
              v-if="profileMode === 'Edit' || state === 'kanboard'"
              v-bind="{data: task.description || '' }"
              @changeEditedText="getTextFromEditor"
            />
          </div>
          <div class="taskDetail pt20">
            <q-input
              outlined
              class="inputFieldText"
              color="light-blue-10"
              v-model.trim="task.ticketId"
              :label="$t('ticketId')"
              lazy-rules
            >
              <template v-slot:append>
                <q-icon
                  name="fa fa-table"
                  color="primary"
                  @click="ticketPicker = !ticketPicker"
                  class="ticketPicker"
                >
                  <q-tooltip
                    v-model="showing1"
                    transition-show="scale"
                    transition-hide="scale"
                    content-style="font-size: 16px"
                  >{{ $t('selectTicket') }}</q-tooltip>
                </q-icon>
                <q-dialog
                  v-model="ticketPicker"
                  ref="ticketPicker"
                  transition-show="scale"
                  transition-hide="scale"
                  content-class="task"
                >
                  <tableDataWrap
                    @pickerInfo="pickerInfo"
                    module="ticket"
                    :columns="columns"
                    :endpoint="'/v1/api/vkann/tickets/list'"
                    style="width: 1000px; max-width: 80vw;"
                  />
                </q-dialog>
              </template>
            </q-input>

            <servicesAutocomplete
              :editData="profileMode === 'Edit' || state === 'kanboard' ? serviceEdit : ''"
              class="pt20"
              :isRequired="false"
              @getAutoCompleteValue="getAutoCompleteValueService"
            />

            <q-select
              outlined
              :label="$t('priority')"
              v-model.trim="$v.task.priority.$model"
              :options="priorities"
              class="inputStyle pt20"
              required
              :rules="[val => val && val.length > 0]"
              :error="$v.task.priority.$error"
              ref="priority"
            >
              <template v-slot:prepend>
                <q-icon name="fas fa-sort-amount-up" />
              </template>
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                  <q-item-section>
                    <q-item-label>{{ $t(scope.opt) }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:selected-item="scope">{{ $t(scope.opt) }}</template>

              <p v-if="errors" class="error">
                <span v-if="!$v.task.priority.required">*{{ $t('thisfieldisrequired') }}.</span>
              </p>
            </q-select>

            <q-select
              outlined
              :label="$t('departman')"
              v-model.trim="task.departman"
              :options="departmans"
              class="inputStyle"
              required
              :rules="[val => val && val.length > 0]"
              :error="$v.task.departman.$error"
              ref="departman"
            >
              <template v-slot:prepend>
                <q-icon name="far fa-building" />
              </template>
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                  <q-item-section>
                    <q-item-label>{{ $t(scope.opt) }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:selected-item="scope">{{ $t(scope.opt) }}</template>

              <p v-if="errors" class="error">
                <span v-if="!$v.task.departman.required">*{{ $t('thisfieldisrequired') }}.</span>
              </p>
            </q-select>

            <tagsSelection
              :editData="profileMode === 'Edit' || state === 'kanboard' ? tagEdit : ''"
              @addTagFn="addTagFn"
            />
          </div>
        </div>

        <div class="w100 mt12">
          <uploadfile :UploadButton="false" ref="upload" :text="'attachments'" />
        </div>
      </div>
      <div class="taskWrapper mt32">
        <div class="newTaskInfoHeader" @click="taskStateAssign = !taskStateAssign">
          <span class="pr12">
            <q-icon v-if="!taskStateAssign" class="text-blue-grey-8" name="fa fa-arrow-down" />
            <q-icon v-if="taskStateAssign" class="text-blue-grey-8" name="fa fa-arrow-up" />
          </span>
          {{ $t('assignInformation') }}
        </div>
        <q-slide-transition>
          <div
            class="assignTaskContent mt24"
            v-if="taskStateAssign"
            transition-show="scale"
            transition-hide="scale"
          >
            <staffsAutocomplete
              :editData="profileMode === 'Edit' || state === 'kanboard' ? staffEdit : ''"
              :isRequired="false"
              @getAutoCompleteValue="getAutoCompleteValuestaff"
            />

            <q-input
              outlined
              :label="$t('stimateTime')"
              mask="time"
              v-model="task.stimateTime"
              class="pb0"
            >
              <template v-slot:prepend>
                <q-icon name="access_time" class="cursor-pointer" color="primary">
                  <q-popup-proxy ref="qTimeProxy1" transition-show="scale" transition-hide="scale">
                    <q-time
                      v-model="task.stimateTime"
                      :minute-options="minuteOptions"
                      :hour-options="hourOptions"
                      @input="() => $refs.qTimeProxy1.hide()"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <q-input
              outlined
              v-model.trim="task.dueDate"
              mask="date"
              :label="$t('dueDate')"
              name="event"
              class="pb0"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date
                      v-model.trim="task.dueDate"
                      @input="() => $refs.qDateProxy.hide()"
                      today-btn
                      calendar="persian"
                      :options="taskDueDate"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            {{taskDueDate()}}
          </div>
        </q-slide-transition>
      </div>

      <div class="saveButTask">
        <q-btn
          style="width:250px;"
          class="savebutton mr12"
          color="primary"
          type="submit"
        >{{ $t('save') }}</q-btn>
        <q-btn
          v-if="profileMode !== 'Edit' || state !== 'kanboard'"
          @click="newTicket = !newTicket"
          class="savebutton mr12"
          color="primary"
          type="submit"
        >{{ $t('savenew') }}</q-btn>
      </div>
    </q-form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

import editor from '../structure/editor.vue';
import editorProp from '../structure/editorProp.vue';
import tagsSelection from '../structure/tagsSelection.vue';
import uploadfile from '../structure/uploadfile.vue';
import servicesAutocomplete from '../structure/servicesAutocomplete.vue';
import staffsAutocomplete from '../structure/staffsAutocomplete.vue';
import tableDataWrap from '../structure/tableDataWrap.vue';

export default {
  name: 'addNewTask',
  meta() {
    return { title: this.$t('addNewTask') };
  },
  props: ['profileMode', 'state', 'boardData'],

  components: {
    editor,
    editorProp,
    tagsSelection,
    uploadfile,
    servicesAutocomplete,
    tableDataWrap,
    staffsAutocomplete,
  },
  data() {
    return {
      localBoardData: this.boardData,
      newTicket: false,
      errors: false,
      empty: true,
      showing1: false,
      ticketPicker: false,
      taskStateComment: false,
      taskStateAssign: false,
      hourOptions: [0, 1, 2],
      hourOptions1: [0, 1, 2, 3, 4, 5, 6],
      minuteOptions: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
      time: '',
      options: this.staffMember,
      departmans: ['INFO', 'TECH', 'BILLING'],
      priorities: ['CRITICAL', 'IMPORTANT', 'NORMAL', 'LOW'],
      task: {
        title: '',
        description: '',
        serviceName: '',
        departman: '',
        tags: [],
        priority: '',
        ticketId: '',
        assigner: this.$store.state.module1.userData.user.id,
        assignee: '',
        stimateTime: '',
        dueDate: '',
        attachments: '',
      },
      serviceEdit: '',
      tagEdit: '',
      staffEdit: '',
      columns: [
        {
          lable: 'ticketNum',
          filterable: true,
          sortable: false,
          filterType: 'text',
        },
        {
          lable: 'title',
          filterable: true,
          sortable: false,
          filterType: 'text',
        },
        {
          lable: 'client',
          filterable: true,
          sortable: true,
          filterType: 'text',
        },

        {
          lable: 'department',
          filterable: true,
          sortable: false,
          filterType: 'DropBox',
        },
        {
          lable: 'service',
          filterable: true,
          sortable: false,
          filterType: 'text',
        },
        {
          lable: 'priority',
          filterable: true,
          sortable: false,
          filterType: 'DropBox',
        },

        {
          lable: 'status',
          filterable: true,
          sortable: true,
          filterType: 'DropBox',
        },
      ],
    };
  },
  validations: {
    task: {
      departman: { required },
      priority: { required },
    },
  },

  methods: {
    persionToGregorian(value) {
      const dateValue = value.split('/').map(i => parseInt(i, 10));
      return new this.$persianDate(dateValue).toDate().toISOString();
    },
    today() {
      const date = new this.$persianDate();
      date.formatPersian = false;
      return date.format('YYYY/MM/DD');
    },
    taskDueDate(date) {
      return date >= this.today();
    },
    getAutoCompleteValueService(value) {
      this.task.serviceName = value.id;
    },

    getAutoCompleteValuestaff(value) {
      this.task.assignee = value.id;
    },

    pickerInfo(value) {
      this.task.ticketId = value.ticketNum;
      this.ticketPicker = false;
    },
    getTextFromEditor(value) {
      this.task.description = value;
    },
    addTagFn(value) {
      this.task.tags = value.map(v => v.id);
    },

    submitTask() {
      this.empty = !this.$v.task.$anyDirty;
      this.errors = !this.$v.task.$anyError;

      this.$refs.priority.$el.focus();
      this.$refs.departman.$el.focus();

      console.log(`dueDate:${this.task.dueDate}`);

      if (this.profileMode !== 'Edit' && this.state !== 'kanboard') {
        if (
          this.task.priority.length !== 0 &&
          this.task.title.length !== 0 &&
          this.task.departman.length !== 0
        ) {
          this.$axios
            .post('/v1/api/vkann/tasks', {
              title: this.task.title,
              department: this.task.departman,
              service: this.task.serviceName,
              tags: this.task.tags,
              priority: this.task.priority,
              ...(this.task.ticketId.length > 0
                ? { ticketNum: this.task.ticketId }
                : ''),
              ...(this.task.dueDate.length > 0
                ? { dueDate: this.persionToGregorian(this.task.dueDate) }
                : ''),
              estimatedTime: this.task.stimateTime,
              asignee: this.task.assignee,
              asigner: this.task.assigner,
              description: this.task.description,
            })
            .then(res => {
              console.log(res);
              if (res.status === 200) {
                this.$q.notify({
                  message: this.$t('newTaskAdded'),
                  color: 'positive',
                  icon: 'check',
                  position: 'top',
                });
                this.$emit('taskState', false);
                if (this.newTicket) {
                  this.task = {};
                } else {
                  this.$router.push({
                    path: `/${this.$route.params.locale}/tasks/tasksList`,
                  });
                }
              }
            });
        } else {
          this.$q.notify({
            message: this.$t('Theformabovehaserrors'),
            color: 'negative',
            icon: 'warning',
            position: 'top',
          });
        }
      } else if (this.profileMode === 'Edit') {
        if (
          this.task.priority.length !== 0 &&
          this.task.title.length !== 0 &&
          this.task.departman.length !== 0
        ) {
          const standardDueDate = this.persionToGregorian(this.task.dueDate);
          this.$axios
            .put(`/v1/api/vkann/tasks/${this.$route.params.taskId}`, {
              title: this.task.title,
              department: this.task.departman,
              ...(this.task.serviceName.length > 0
                ? { service: this.task.serviceName }
                : ''),
              tags: this.task.tags,
              priority: this.task.priority,
              ticketId: this.task.ticketId,
              dueDate: standardDueDate,
              estimatedTime: this.task.stimateTime,
              // eslint-disable-next-line no-underscore-dangle
              ...(this.task.assignee.length > 0
                ? { asignee: this.task.assignee }
                : ''),
              asigner: this.task.assigner,
              description: this.task.description,
            })
            .then(res => {
              console.log(res);
              if (res.status === 200) {
                console.log('submit task');
                this.$q.notify({
                  message: this.$t('taskEdited'),
                  color: 'positive',
                  icon: 'check',
                  position: 'top',
                });
                this.$emit('taskState', false);
                if (this.newTicket) {
                  this.task = {};
                } else {
                  this.$emit('tabChanged', 'taskProfile');
                }
              }
            });
        } else {
          this.$q.notify({
            message: this.$t('Theformabovehaserrors'),
            color: 'negative',
            icon: 'warning',
            position: 'top',
          });
        }
      }
      if (this.state === 'kanboard') {
        if (
          this.task.priority.length !== 0 &&
          this.task.title.length !== 0 &&
          this.task.departman.length !== 0
        ) {
          this.$axios
            .put(`/v1/api/vkann/tasks/${this.localBoardData.id}`, {
              title: this.task.title,
              department: this.task.departman,
              ...(this.task.serviceName.length > 0
                ? { service: this.task.serviceName }
                : ''),

              tags: this.task.tags,
              priority: this.task.priority,
              ticketId: this.task.ticketId,
              dueDate: new Date(this.task.dueDate),
              estimatedTime: this.task.stimateTime,
              // eslint-disable-next-line no-underscore-dangle
              ...(this.task.assignee.length > 0
                ? { asignee: this.task.assignee }
                : ''),

              asigner: this.task.assigner,
              description: this.task.description,
            })
            .then(res => {
              console.log(res);
              if (res.status === 200) {
                console.log('submit task');
                this.$q.notify({
                  message: this.$t('taskEdited'),
                  color: 'positive',
                  icon: 'check',
                  position: 'top',
                });
                this.$emit('taskState', false);
                this.$emit('reloadCmp', true);
              }
            });
        }
      }
    },
  },
  mounted() {
    if (this.profileMode === 'Edit') {
      this.$axios
        .get(`/v1/api/vkann/tasks/${this.$route.params.taskId}`)
        .then(res => {
          console.log(res);

          this.task.title = res.data.task.title;
          this.task.description = res.data.task.description;
          this.task.departman = res.data.task.department;
          this.task.ticketId = res.data.task.ticket;
          this.serviceEdit = res.data.task.service;
          this.task.priority = res.data.task.priority;
          this.task.dueDate = res.data.task.dueDate;
          this.task.stimateTime = res.data.task.estimatedTime;
          if (res.data.task.service) {
            // eslint-disable-next-line no-underscore-dangle
            this.task.serviceName = res.data.task.service._id;
          }
          this.staffEdit = res.data.task.asignee;

          // eslint-disable-next-line no-underscore-dangle
          this.task.assignee = res.data.task.asignee._id;
          const serverItems = res.data.task.tags.map(item => ({
            // eslint-disable-next-line no-underscore-dangle
            id: item._id,
            title: item.title,
          }));
          this.tagEdit = serverItems;
          this.task.tags = serverItems.map(item => {
            // eslint-disable-next-line no-underscore-dangle
            return item.id;
          });
        })
        .catch(e => {
          if (e.response.status === 422) {
            this.$q.notify({
              message: this.$t('tasksUnvalid'),
              color: 'negative',
              icon: 'warning',
              position: 'top',
            });
          }
        });
    }
    if (this.state === 'kanboard') {
      console.log('kanboard');
      console.log(this.localBoardData);
      this.$axios
        .get(`/v1/api/vkann/tasks/${this.localBoardData.id}`)
        .then(res => {
          console.log(res);
          this.task.title = res.data.task.title;
          this.task.description = res.data.task.description;
          console.log(res.data.task);
          this.task.departman = res.data.task.department;
          this.task.priority = res.data.task.priority;
          this.task.ticketId = res.data.task.ticket;
          this.serviceEdit = res.data.task.service;
          this.task.dueDate = res.data.task.dueDate;
          this.task.stimateTime = res.data.task.estimatedTime;
          // eslint-disable-next-line no-underscore-dangle
          this.task.serviceName = res.data.task.service._id;
          const serverItems = res.data.task.tags.map(item => ({
            // eslint-disable-next-line no-underscore-dangle
            id: item._id,
            title: item.title,
          }));
          this.tagEdit = serverItems;
          this.task.tags = serverItems.map(item => {
            // eslint-disable-next-line no-underscore-dangle
            return item.id;
          });
          this.staffEdit = res.data.task.asignee;
          // eslint-disable-next-line no-underscore-dangle
          this.task.assignee = res.data.task.asignee._id;
        })
        .catch(e => {
          if (e.response.status === 422) {
            this.$q.notify({
              message: this.$t('tasksUnvalid'),
              color: 'negative',
              icon: 'warning',
              position: 'top',
            });
          }
        });
    }
  },
};
</script>

<style lang="scss">
.taskWrapper {
  border: 1px solid #aaa;
  padding: 24px;
  position: relative;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
  background-color: #f9f9f9;
}
.newTaskInfoHeader {
  text-align: center;
  background-color: #dbdbdb;
  border: 1px solid #bcbcbc;
  border-radius: 12px;
  padding: 3px;
  font-size: 16px;
  color: #000;
  width: 40%;
  position: absolute;
  top: -15px;
  cursor: pointer;
}
.primarynewTaskContent {
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 850px) {
    display: block;
  }
}
.taskText {
  width: 70%;
  @media screen and (max-width: 850px) {
    margin-top: 12px;
    width: 100%;
  }
  .q-editor__content {
    min-height: 250px !important;
  }
}
.taskDetail {
  width: 30%;
  @media screen and (max-width: 850px) {
    width: 100%;
    padding-left: 0;
  }
  padding-left: 16px;
}
.assignTaskContent {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media screen and (max-width: 850px) {
    display: block;
  }
  .q-field {
    padding-right: 12px;
    margin-top: 12px;
    @media screen and (max-width: 850px) {
      width: 100%;
    }
  }
}
.saveButTask {
  margin-top: 16px;
  margin-bottom: 16px;
  text-align: center;
}
.ticketPicker {
  cursor: pointer;
  font-size: 20px;
  padding: 12px;
}
.listNameTable,
.q-table thead th {
  color: #000;
  font-size: 16px;
  text-align: center;
}
.task {
  .ticketTable tr:hover {
    .idPicker {
      box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
        0 3px 1px -2px rgba(0, 0, 0, 0.12);
      cursor: pointer;
      transition: ease-in 0.25s;
    }
  }
}
</style>

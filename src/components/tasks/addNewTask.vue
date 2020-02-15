<template>
  <div class="newTaskWrapper">
    <div class="primarynewTaskInfo taskWrapper">
      <div class="newTaskInfoHeader">{{ $t('essentialInformation') }}</div>
      <div class="primarynewTaskContent">
        <div class="taskText pt20">
          <q-input
            autofocus
            outlined
            required
            class="inputFieldText"
            color="light-blue-10"
            v-model.trim="task.title"
            :label="$t('title')"
            lazy-rules
            :rules="[val => val && val.length > 0]"
          >
            <template v-slot:prepend>
              <q-icon name />
            </template>
          </q-input>
          <!-- description -->
          <editor @getTextFromEditor="getTextFromEditor" />
        </div>
        <div class="taskDetail pt20">
          <!-- ticketId -->
          <q-input
            outlined
            class="inputFieldText"
            color="light-blue-10"
            v-model.trim="task.ticketId"
            :label="$t('ticketId')"
            lazy-rules
            mask="######"
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
                  >{{ $t('selectTicket') }}</q-tooltip
                >
              </q-icon>
              <q-dialog
                v-model="ticketPicker"
                ref="ticketPicker"
                transition-show="scale"
                transition-hide="scale"
              >
                <tableDataWrap
                  @pickerInfo="pickerInfo"
                  :endpoint="'/statics/tickets.json'"
                  style="width: 1000px; max-width: 80vw;"
                />
              </q-dialog>
            </template>
          </q-input>

          <!--  Service name -->
          <q-select
            color="light-blue-10 "
            outlined
            v-model.trim="task.serviceName"
            :options="servicesName"
            :label="$t('serviceName')"
            class="inputStyle pt20"
            lazy-rules
          >
            <template v-slot:prepend>
              <q-icon name="settings_applications" />
            </template>
          </q-select>
          <!-- choose priority -->
          <q-select
            outlined
            :label="$t('priority')"
            v-model.trim="task.priority"
            :options="priorities"
            class="inputStyle"
          >
            <template v-slot:prepend>
              <q-icon name="fas fa-sort-amount-up" />
            </template>
          </q-select>

          <!-- choose departman for ticet -->
          <q-select
            outlined
            :label="$t('departman')"
            v-model.trim="task.departman"
            :options="departmans"
            class="inputStyle"
          >
            <template v-slot:prepend>
              <q-icon name="far fa-building" />
            </template>
          </q-select>
          <!-- tags -->
          <tagsSelection @addTagFn="addTagFn" />
        </div>
      </div>
      <div class="w100 mt12">
        <uploadfile :UploadButton="false" ref="upload" :text="'attachments'" />
      </div>
    </div>
    <div class="taskWrapper mt32">
      <div
        class="newTaskInfoHeader"
        @click="taskStateAssign = !taskStateAssign"
      >
        {{ $t('assignInformation') }}
      </div>
      <q-slide-transition>
        <div
          class="assignTaskContent mt24"
          v-if="taskStateAssign"
          transition-show="scale"
          transition-hide="scale"
        >
          <!-- assignee person -->
          <!-- <q-select
            outlined
            v-model="task.assignee"
            :label="$t('assign')"
            input-debounce="0"
            @filter="filterFn"
            :options="options"
            option-label="name"
            option-value="id"
            map-options
            emit-value
            use-input
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">No results</q-item-section>
              </q-item>
            </template>
          </q-select> -->
          <singleAutoCompleteSelectBox
            :options="staffs"
            :optionLable="'firstName'"
            :optionValue="'id'"
            :name="'employeeName'"
            label="firstName"
            @getAutoCompleteValue="getAutoCompleteValuestaff"
          />

          <!-- estimated time -->
          <q-input
            outlined
            :label="$t('stimateTime')"
            mask="time"
            v-model="task.stimateTime"
            class="pb0"
          >
            <template v-slot:prepend>
              <q-icon name="access_time" class="cursor-pointer" color="primary">
                <q-popup-proxy
                  ref="qTimeProxy1"
                  transition-show="scale"
                  transition-hide="scale"
                >
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

          <!-- Due Date -->
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
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model.trim="task.dueDate"
                    @input="() => $refs.qDateProxy.hide()"
                    today-btn
                    calendar="persian"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <!-- done time -->
          <q-input
            outlined
            v-model="task.doneTime"
            :label="$t('doneTime')"
            mask="time"
          >
            <template v-slot:prepend>
              <q-icon name="access_time" class="cursor-pointer" color="primary">
                <q-popup-proxy
                  ref="qTimeProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time
                    v-model="task.doneTime"
                    :minute-options="minuteOptions"
                    :hour-options="hourOptions1"
                    @input="() => $refs.qTimeProxy.hide()"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-slide-transition>
    </div>
    <div class="taskWrapper mt32">
      <div
        class="newTaskInfoHeader"
        @click="taskStateComment = !taskStateComment"
      >
        {{ $t('comments') }}
      </div>
      <div class="taskCommentContent">
        <q-slide-transition>
          <taskComment
            v-if="taskStateComment"
            transition-show="scale"
            transition-hide="scale"
          />
        </q-slide-transition>
      </div>
    </div>
    <div class="saveButTask">
      <q-btn
        style="width:250px;"
        class="savebutton mr12"
        color="primary"
        type="submit"
        @click="submitTask"
      >
        {{ $t('save') }}
      </q-btn>
      <q-btn class="savebutton mr12" color="primary" type="submit">
        {{ $t('savenew') }}
      </q-btn>
    </div>
  </div>
</template>

<script>
import editor from '../structure/editor.vue';
import tagsSelection from '../structure/tagsSelection.vue';
import uploadfile from '../structure/uploadfile.vue';
import taskComment from './taskComment.vue';
import tableDataWrap from '../structure/tableDataWrap.vue';
import singleAutoCompleteSelectBox from '../structure/singleAutoCompleteSelectBox.vue';

export default {
  name: 'addNewTask',
  meta() {
    return { title: this.$t('addNewTask') };
  },

  components: {
    editor,
    tagsSelection,
    uploadfile,
    taskComment,
    tableDataWrap,
    singleAutoCompleteSelectBox,
  },
  data() {
    return {
      showing1: false,
      staffs: {},
      staffsLable: '',
      staffsid: '',

      ticketPicker: false,
      taskStateComment: false,
      taskStateAssign: false,
      hourOptions: [0, 1, 2],
      hourOptions1: [0, 1, 2, 3, 4, 5, 6],
      minuteOptions: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
      time: '',
      staffMember: [
        {
          id: '1',
          name: 'narges',
          freeTime: 2,
        },
        {
          id: '2',
          name: 'mohsen',
          freeTime: 2,
        },
        {
          id: '3',
          name: 'maryam',
          freeTime: 2,
        },
        {
          id: '4',
          name: 'arash',
          freeTime: 2,
        },
        {
          id: '5',
          name: 'khashi',
          freeTime: 2,
        },
        {
          id: '6',
          name: 'sara',
          freeTime: 2,
        },
      ],
      options: this.staffMember,

      servicesName: ['name1', 'name2', 'name3'],
      departmans: ['INFO', 'SUPPORT', 'BILLING'],
      priorities: [
        this.$t('emergency'),
        this.$t('middle'),
        this.$t('take your time'),
      ],
      task: {
        title: '',
        description: '',
        serviceName: '',
        departman: '',
        tags: [],
        priority: '',
        ticketId: '',
        assigner: this.$store.state.module1.userData.firstName,
        assignee: '',
        stimateTime: '',
        doneTime: '',
        dueDate: '',
        comments: [
          {
            writerName: '',
            description: '',
          },
        ],
        attachments: '',
      },
    };
  },

  methods: {
    getAutoCompleteValuestaff(value) {
      this.task.assignee = value.id;
    },

    pickerInfo(value) {
      this.task.ticketId = value.id;
      this.ticketPicker = false;

      console.log(value);
    },
    getTextFromEditor(value) {
      this.task.description = value;
    },
    addTagFn(value) {
      this.task.tags = value.map(v => v.id);
    },
    filterFn(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        this.options = this.staffMember.filter(
          v => v.name.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    submitTask() {
      if (this.task.title.length === 0) {
        this.$q.notify({
          message: this.$t('emptyForm'),
          color: 'negative',
          icon: 'warning',
          position: 'top',
        });
      } else {
        console.log('submit task');
        this.$q.notify({
          message: this.$t('new task added'),
          color: 'positive',
          icon: 'check',
          position: 'top',
        });
        this.$emit('taskState', false);
      }
    },
  },
  mounted() {
    this.$axios.get('v1/api/vkann/users/get-staffs').then(response => {
      this.staffs = response.data.users;
      this.staffsLable = this.staffs.map(v => v.firstName);
      this.staffsid = this.staffs.map(v => v.id);
    });
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
  border: 1px solid #bcbcff;
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
</style>

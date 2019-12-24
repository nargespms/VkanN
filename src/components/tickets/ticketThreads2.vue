<template >
  <div class="ticketThread2">
    <ul>
      <li v-for="ticket in tickets" :key="ticket.id">
        <template v-if="ticket.status !== 'deleted'">
          <!-- client part -->
          <div v-if="ticket.role === 'client'" class="clientReq">
            <div class="senderName">
              <p>{{ticket.user}}</p>
              <p>{{ticket.role}}</p>
              <!-- functional buttons for admin -->
              <q-btn
                class="editDesc text-grey-10"
                v-if="!editTicket"
                @click="editDesc()"
              >{{$t('edit')}}</q-btn>

              <q-btn
                class="editDesc bg-positive"
                v-if="editTicket"
                @click="saveEditedTicket(ticket)"
              >{{$t('ok')}}</q-btn>

              <q-btn class="deleteDesc text-white" @click="deleteTicket(ticket)">{{$t('delete')}}</q-btn>
            </div>

            <div class="requestDesc">
              <span class="time">
                {{ticket.date}}
                <q-icon name="fas fa-ellipsis-v" />
                {{ticket.time}}
              </span>
              <p v-if="!editTicket">{{ticket.desc}}</p>
              <p v-if="editTicket">
                <editorProp :data="ticket" @changeEditedText="changeEditedText" />
              </p>
              <div v-if="ticket.attachments.status">
                <q-separator class="mt12" />
                <div v-for="file in ticket.attachments.files" :key="file.index">
                  <p>{{file.name}}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- staff part -->
          <div v-if="ticket.role === 'staff' " class="staffRep">
            <div class="senderName">
              <p>{{ticket.user}}</p>
              <p>{{ticket.role}}</p>
              <!-- functional buttons for admin -->
              <q-btn
                class="editDesc text-grey-10"
                v-if="!editTicket"
                @click="editDesc"
              >{{$t('edit')}}</q-btn>

              <q-btn
                class="editDesc bg-positive"
                v-if="editTicket"
                @click="saveEditedTicket(ticket)"
              >{{$t('ok')}}</q-btn>
              <q-btn class="deleteDesc text-white" @click="deleteTicket(ticket)">{{$t('delete')}}</q-btn>
            </div>
            <div class="requestDesc">
              <span class="time">
                {{ticket.date}}
                <q-icon name="fas fa-ellipsis-v" />
                {{ticket.time}}
              </span>
              <p v-if="!editTicket">{{ticket.desc}}</p>
              <p v-if="editTicket">
                <editorProp :data="ticket" @changeEditedText="changeEditedText" />
              </p>
              <div v-if="ticket.attachments.status">
                <q-separator class="mt12" />
                <div v-for="file in ticket.attachments.files" :key="file.index">
                  <p>{{file.name}}</p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import editorProp from '../structure/editorProp.vue';

export default {
  name: 'ticketThreads2',
  props: ['data'],
  components: {
    editorProp,
  },
  data() {
    return {
      editTicket: false,
    };
  },
  methods: {
    deleteTicket(ticket) {
      this.$q
        .dialog({
          title: this.$t('deleteticket'),
          message: this.$t('areyousureyouwanttodeletethis'),
          cancel: true,
        })
        .onOk(() => {
          console.log('OK');
          ticket.status = 'deleted';
          this.$emit('deletedTickets', this.tickets);
          // console.log(ticket);
        })
        .onCancel(() => {
          console.log('Cancel');
        });
    },
    editDesc() {
      this.editTicket = true;
      // console.log(ticket);
    },
    changeEditedText(value) {
      this.tickets = value;
      // console.log(value);
      // console.log(this.tickets);

      // console.log('threads2');
    },
    saveEditedTicket() {
      this.tickets.push();
      this.editTicket = false;
      this.$emit('changedText', this.tickets);
    },
  },
  computed: {
    tickets: {
      get() {
        return this.data.threads;
      },
      set(newName) {
        return newName;
      },
      // return this.data.threads;
    },
  },
};
</script>

<style lang="scss">
.ticketThread2 {
  padding: 16px;
}
.clientReq {
  background-color: #f7fafd;
  border: 1px solid #c5d8eb;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
  margin-top: 12px;
  display: flex;
}
.senderName {
  border-right: 1px solid #d4d4d4;
  padding: 16px;
  width: 18%;
  text-align: center;
}
.requestDesc {
  padding: 16px;
  line-height: 29px;
  width: 82%;
  .time {
    color: #727272;
    i {
      font-size: 10px;
    }
  }
}
.staffRep {
  border: 1px solid #efe9d3;
  background-color: #faf8f1;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
  margin-top: 12px;
  display: flex;
}
.editDesc {
  margin-right: 8px;
  margin-top: 16px;
  background-color: #b9cad299;
  font-size: 11px;
}
.deleteDesc {
  margin-left: 8px;
  margin-top: 16px;
  font-size: 12px;
  background-color: #e72323 !important;
}
</style>

<template>
  <div>
    <!-- client part -->
    <div v-if="ticket.role === 'client'" class="clientReq">
      <div class="senderName">
        <p>{{ ticket.user }}</p>
        <p>{{ ticket.role }}</p>
        <!-- functional buttons for admin -->
        <q-btn class="editDesc text-grey-10" v-if="!editTicket" @click="editDesc">{{ $t('edit') }}</q-btn>

        <q-btn class="editDesc bg-positive" v-if="editTicket" @click="saveEditedTicket(ticket)">{{ $t('ok') }}</q-btn>

        <q-btn
          v-if="$store.state.module1.userData.role === 'MANAGER'"
          class="deleteDesc text-white"
          @click="deleteTicket(ticket)"
          >{{ $t('delete') }}</q-btn
        >
      </div>

      <div class="requestDesc">
        <div clas="infoThreads">
          <span class="time">
            {{ ticket.date }}
            <q-icon name="fas fa-ellipsis-v" />
            {{ ticket.time }}
          </span>
          <q-icon name="fas fa-comments" class="replyTicketIcon" @click="replyToCurrentThread(ticket)">
            <q-tooltip v-model="showing1" transition-show="scale" transition-hide="scale">{{ $t('reply') }}</q-tooltip>
          </q-icon>
        </div>
        <p v-if="!editTicket" v-html="ticket.desc"></p>
        <p v-if="editTicket">
          <editorProp :data="ticket" @changeEditedText="changeEditedText" />
        </p>
        <div v-if="ticket.attachments.status">
          <q-separator class="mt12" />
          <div v-for="file in ticket.attachments.files" :key="file.index">
            <p>{{ file.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- staff part -->
    <div v-if="ticket.role === 'staff'" class="staffRep">
      <div class="senderName">
        <p>{{ ticket.user }}</p>
        <p>{{ ticket.role }}</p>
        <!-- functional buttons for admin -->
        <q-btn class="editDesc text-grey-10" v-if="!editTicket" @click="editDesc">{{ $t('edit') }}</q-btn>

        <q-btn class="editDesc bg-positive" v-if="editTicket" @click="saveEditedTicket(ticket)">{{ $t('ok') }}</q-btn>
        <q-btn
          v-if="$store.state.module1.userData.role === 'MANAGER'"
          class="deleteDesc text-white"
          @click="deleteTicket(ticket)"
          >{{ $t('delete') }}</q-btn
        >
      </div>
      <div class="requestDesc">
        <div clas="infoThreads">
          <span class="time">
            {{ ticket.date }}
            <q-icon name="fas fa-ellipsis-v" />
            {{ ticket.time }}
          </span>
          <q-icon name="fas fa-comments" class="replyTicketIcon" @click="replyToCurrentThread(ticket)">
            <q-tooltip v-model="showing1" transition-show="scale" transition-hide="scale">{{ $t('reply') }}</q-tooltip>
          </q-icon>
        </div>
        <p v-if="!editTicket" v-html="ticket.desc"></p>
        <p v-if="editTicket">
          <editorProp :data="ticket" @changeEditedText="changeEditedText" />
        </p>
        <div v-if="ticket.attachments.status">
          <q-separator class="mt12" />
          <div v-for="file in ticket.attachments.files" :key="file.index">
            <p>{{ file.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import editorProp from '../structure/editorProp.vue';

export default {
  name: 'ticketReplyEncapsulate',
  props: ['data'],
  components: {
    editorProp,
  },
  data() {
    return {
      editTicket: false,
      ticket: this.data,
      showing1: false,
      showing: false,
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
          this.$emit('deletedTickets', this.ticket);
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
      this.ticket = value;
      // console.log(value);
      // console.log(this.tickets);

      // console.log('threads2');
    },
    saveEditedTicket() {
      this.editTicket = false;
      this.$emit('changedText', this.ticket);
    },
    replyToCurrentThread(ticket) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      this.$emit('replyThread', ticket.desc);
    },
  },
  watch: {
    data(newVal) {
      this.ticket = newVal;
      console.log(this.ticket);
    },
  },
};
</script>

<style lang="scss">
.clientReq {
  background-color: #f7fafd;
  border: 1px solid #c5d8eb;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
  margin-top: 12px;
  display: flex;
  @media screen and (max-width: 640px) {
    display: block;
  }
}
.senderName {
  border-right: 1px solid #d4d4d4;
  padding: 16px;
  width: 18%;
  text-align: center;
  @media screen and (max-width: 640px) {
    width: 100%;
    border-bottom: 1px solid #d4d4d4;
    border-right: none;
  }
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
  @media screen and (max-width: 640px) {
    width: 100%;
  }
}
.staffRep {
  border: 1px solid #efe9d3;
  background-color: #faf8f1;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
  margin-top: 12px;
  display: flex;
  @media screen and (max-width: 640px) {
    display: block;
  }
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
.replyTicketIcon {
  color: #b7b7b7;
  float: right;
  cursor: pointer;
}
</style>

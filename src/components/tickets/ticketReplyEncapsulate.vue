<template>
  <div>
    <!-- client part -->
    <div v-if="ticket.createdBy.role === 'CLIENT'" class="clientReq">
      <div class="senderName">
        <router-link
          class="senderNameLink"
          :to="

                  '/' +
                    $route.params.locale +
                    '/' +
                    'userManagement' +
                    '/' +
                    ticket.createdBy._id
                "
        >
          <span>{{ ticket.createdBy.firstName }}</span>
          &nbsp;
          <span>{{ ticket.createdBy.firstName }}</span>
        </router-link>
        <p class="text-primary">{{ ticket.createdBy.role }}</p>
        <router-link
          class="serviceName"
          :to="
                  '/' +
                    $route.params.locale +
                    '/' +
                    'services' +
                    '/' +
                    service._id
                "
        >
          <p>{{service.name }}</p>
        </router-link>
        <!-- functional buttons for admin -->
        <q-btn class="editDesc text-grey-10" v-if="!editTicket" @click="editDesc">{{ $t('edit') }}</q-btn>

        <q-btn
          class="editDesc bg-positive"
          v-if="editTicket"
          @click="saveEditedTicket(ticket)"
        >{{ $t('ok') }}</q-btn>
        <q-btn
          class="editDesc bg-grey"
          v-if="editTicket"
          @click="editTicket=!editTicket"
        >{{ $t('cancel') }}</q-btn>

        <q-btn
          v-if="$store.state.module1.userData.role === 'MANAGER' && !editTicket"
          class="deleteDesc text-white"
          @click="deleteTicket(ticket)"
        >{{ $t('delete') }}</q-btn>
      </div>

      <div class="requestDesc">
        <div clas="infoThreads">
          <span class="time">
            {{ creationDate }}
            <q-icon name="fas fa-ellipsis-v" />
            {{ creationTime }}
          </span>

          <q-icon
            name="fas fa-comments"
            class="replyTicketIcon"
            @click="replyToCurrentThread(ticket)"
          >
            <q-tooltip
              v-model="showing1"
              transition-show="scale"
              transition-hide="scale"
            >{{ $t('reply') }}</q-tooltip>
          </q-icon>
        </div>

        <div v-if="!editTicket">
          <p v-html="ticket.description"></p>
        </div>
        <p v-if="editTicket">
          <editorProp :data="ticket.description" @changeEditedText="changeEditedText" />
        </p>
        <!-- <div v-if="ticket.attachments.status">
          <q-separator class="mt12" />
          <div v-for="file in ticket.attachments.files" :key="file.index">
            <p>{{ file.name }}</p>
          </div>
        </div>-->
      </div>
    </div>
    <!-- staff part -->
    <div v-else class="staffRep">
      <div class="senderName">
        <router-link
          class="senderNameLink"
          :to="

                  '/' +
                    $route.params.locale +
                    '/' +
                    'userManagement' +
                    '/' +
                    ticket.createdBy._id
                "
        >
          <span>{{ ticket.createdBy.firstName }}</span>
          &nbsp;
          <span>{{ ticket.createdBy.firstName }}</span>
        </router-link>
        <p class="text-primary">{{ ticket.createdBy.role }}</p>
        <!-- functional buttons for admin -->
        <q-btn class="editDesc text-grey-10" v-if="!editTicket" @click="editDesc">{{ $t('edit') }}</q-btn>

        <q-btn
          class="editDesc bg-positive"
          v-if="editTicket"
          @click="saveEditedTicket(ticket)"
        >{{ $t('ok') }}</q-btn>
        <q-btn
          class="editDesc bg-grey"
          v-if="editTicket"
          @click="editTicket=!editTicket"
        >{{ $t('cancel') }}</q-btn>

        <q-btn
          v-if="$store.state.module1.userData.role === 'MANAGER' && !editTicket"
          class="deleteDesc text-white"
          @click="deleteTicket(ticket)"
        >{{ $t('delete') }}</q-btn>
      </div>
      <div class="requestDesc">
        <div clas="infoThreads">
          <span class="time">
            {{ creationDate }}
            <q-icon name="fas fa-ellipsis-v" />
            {{ creationTime }}
          </span>
          <q-icon
            name="fas fa-comments"
            class="replyTicketIcon"
            @click="replyToCurrentThread(ticket)"
          >
            <q-tooltip
              v-model="showing1"
              transition-show="scale"
              transition-hide="scale"
            >{{ $t('reply') }}</q-tooltip>
          </q-icon>
        </div>
        <p v-if="!editTicket" v-html="ticket.description"></p>
        <p v-if="editTicket">
          <editorProp :data="ticket.description" @changeEditedText="changeEditedText" />
        </p>
        <!-- <div v-if="ticket.attachments.status">
          <q-separator class="mt12" />
          <div v-for="file in ticket.attachments.files" :key="file.index">
            <p>{{ file.name }}</p>
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import editorProp from '../structure/editorProp.vue';

export default {
  name: 'ticketReplyEncapsulate',
  props: ['data', 'service'],
  components: {
    editorProp,
  },
  data() {
    return {
      editTicket: false,
      ticket: this.data,
      showing1: false,
      showing: false,
      creationDate: '',
      creationTime: '',
      changedDecs: '',
    };
  },
  mounted() {
    this.dateCalc();
    this.timeCalc();
  },
  methods: {
    dateCalc() {
      this.creationDate = new Date(this.data.createdAt).toLocaleDateString(
        `${this.$route.params.locale}`
      );
    },
    timeCalc() {
      this.creationTime = new Date(this.data.createdAt).toLocaleTimeString(
        `${this.$route.params.locale}`
      );
    },
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
        })
        .onCancel(() => {
          console.log('Cancel');
        });
    },
    editDesc() {
      this.editTicket = true;
    },
    changeEditedText(value) {
      console.log(value);
      this.changedDecs = value;
    },
    saveEditedTicket() {
      this.editTicket = false;
      this.$axios
        .put(`/v1/api/vkann/threads/${this.ticket.id}`, {
          ticketId: this.$route.params.ticket,
          description: this.changedDecs,
        })
        .then(res => {
          this.ticket.description = res.data.description;
        });
    },
    replyToCurrentThread(ticket) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      this.$emit('replyThread', ticket.description);
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
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
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
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
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
.senderNameLink {
  color: #000;
}
.clientReq {
  .serviceName {
    color: #71086a;
  }
}
</style>

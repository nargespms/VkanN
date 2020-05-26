<template>
  <div class="ticketInfoWrap">
    <div class="ticketInfo">
      <h3>
        <span>#{{ data.ticketNum }}</span>
        - {{ data.title }}
      </h3>
      <q-select
        outlined
        class="ticketStatus"
        v-model.trim="localStatus"
        :label="$t('status')"
        :options="ticketStatus"
        @input="changeStatusTicket"
      >
        <template v-slot:prepend>
          <q-icon name="settings_applications" />
        </template>
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
            <q-item-section>
              <q-item-label>{{ $t(scope.opt) }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:selected-item="scope">{{ $t(scope.opt) }}</template>
      </q-select>

      <q-btn color="primary" @click="editorState" class="replyTicketBut">
        <q-icon name="fas fa-edit" />
        <span v-if="!replyEnable">{{ $t('reply') }}</span>
        <span v-if="replyEnable">{{ $t('close') }}</span>
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ticketInfo',
  props: ['data'],
  data() {
    return {
      ticketStatus: ['CLOSED', 'ANSEWRED', 'UNANSWERD', 'INPROGRESS', 'ONHOLD'],
      localStatus: this.status,
      replyEnable: false,
    };
  },
  computed: {
    status: {
      get() {
        return this.data.status;
      },
      set(newVal) {
        return newVal;
      },
    },
  },
  watch: {
    status(newVal) {
      this.localStatus = newVal;
    },
  },
  methods: {
    editorState() {
      this.$emit('editorState');
      this.replyEnable = !this.replyEnable;
    },
    changeStatusTicket() {
      this.$emit('changeStatus', this.localStatus);
    },
  },
  mounted() {
    console.log(this.data.ticket);
  },
};
</script>

<style lang="scss">
.ticketInfoWrap {
  padding: 16px;
}
.ticketInfo {
  overflow: auto;
  width: 100%;
  h3 {
    font-size: 18px;
    float: left;
    @media screen and (max-width: 680px) {
      float: none;
      text-align: center;
    }
  }
  .ticketStatus {
    float: left;
    width: 270px;
    padding-left: 24px;
    @media screen and (max-width: 680px) {
      float: none;
      margin: auto;
      width: 100%;
      padding-left: 0;
    }
  }
}
.replyTicketBut {
  width: 200px;
  margin-left: 12px;
  padding: 15px 12px;
  i {
    padding-right: 24px;
    font-size: 17px;
  }
  @media screen and (max-width: 900px) {
    width: 100%;
    margin: 12px 0 !important;
  }
}
</style>

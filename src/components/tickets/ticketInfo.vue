<template >
  <div class="ticketInfoWrap">
    <div class="ticketInfo">
      <h3>
        <span>#{{data.id}}</span>
        - {{data.title}}
      </h3>
      <q-select
        outlined
        class="ticketStatus"
        v-model.trim="status"
        :label="$t('status')"
        :options="ticketStatus"
      >
        <template v-slot:prepend>
          <q-icon name="settings_applications" />
        </template>
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">No results</q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-btn color="primary" @click="editorState" class="replyTicketBut">
        <q-icon name="fas fa-edit" />
        {{$t('reply')}}
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
      ticketStatus: ['OnHold', 'Answered', 'CustomerReply'],
      status: this.data.status,
    };
  },
  methods: {
    editorState() {
      this.$emit('editorState');
    },
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

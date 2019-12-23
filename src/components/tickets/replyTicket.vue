<template >
  <div class="replyTicketWrap">
    <editor />
    <div class="attachments mb16">
      <span class="attachHeader">
        <q-icon name="fas fa-paperclip" />
        {{$t('attachments')}}
      </span>

      <uploadfile />
    </div>
    <q-btn class="uploadTicket" color="primary" type="submit" @click.prevent="submitTicket">
      <q-icon name="fas fa-paper-plane " />
      {{ $t('send') }}
    </q-btn>
  </div>
</template>



<script>
import editor from '../structure/editor.vue';
import uploadfile from '../structure/uploadfile.vue';

export default {
  name: 'replyTicket',
  components: {
    editor,
    uploadfile,
  },
  methods: {
    submitTicket() {
      console.log('ssss');
    },
  },
};
</script>

<style lang="scss">
.replyTicketWrap {
  padding: 16px;
}
</style>

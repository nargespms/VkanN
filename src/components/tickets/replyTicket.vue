<template >
  <div class="replyTicketWrap">
    <editor :data="data" @getTextFromEditor="getTextFromEditor" />
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
  props: ['data'],
  components: {
    editor,
    uploadfile,
  },
  data() {
    return {
      textValue: '',
      editorText: '',
    };
  },
  methods: {
    getTextFromEditor(value) {
      this.textValue = value;
      console.log(value);
      // console.log(value);
    },
    submitTicket() {
      console.log(this.textValue);
      this.$emit('addToThreads', this.textValue);
    },
  },
};
</script>

<style lang="scss">
.replyTicketWrap {
  padding: 16px;
}
</style>

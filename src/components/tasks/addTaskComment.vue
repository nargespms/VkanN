<template >
  <div class="addTaskComment">
    <h5 class="center">{{$t('addNewComment')}}</h5>
    <!-- description for comment -->
    <div class="w100 mt32">
      <editor :data="emtyDesc" @getTextFromEditor="getTextFromEditor" :key="componentKey" />
    </div>

    <q-btn class="sendTaskBut mt32" color="primary" @click="sendComment">
      <q-icon name="fas fa-paper-plane" round color="text-white" />
      <q-tooltip v-model="showing" transition-show="scale" transition-hide="scale">{{ $t('send') }}</q-tooltip>
    </q-btn>
  </div>
</template>


<script>
import editor from '../structure/editor.vue';

export default {
  name: 'addTaskComment',
  components: {
    editor,
  },
  data() {
    return {
      emtyDesc: '',
      componentKey: 0,
      showing: false,
      comment: {
        writer: this.$store.state.module1.userData.firstName,
        description: '',
      },
    };
  },
  methods: {
    getTextFromEditor(value) {
      this.comment.description = value;
      console.log(value);
    },
    sendComment() {
      //  post to server
      console.log('sending comment');
      console.log(this.comment);
      this.$q.dialog({ title: 'ارسال شد ' });
      this.componentKey += 1;
    },
  },
};
</script>
<style lang="scss">
.addTaskComment {
  width: 100%;
  h6 {
    display: block;
    width: 100%;
  }
  padding: 24px;
  background-color: #e4e4e4;
  border-radius: 12px;
}
.sendTaskBut {
  width: 200px;
  margin-left: 16px;
  align-self: flex-end;
}
</style>

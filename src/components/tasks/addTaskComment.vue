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
        description: '',
        createdAt: new Date(),
        createdBy: {
          id: this.$store.state.module1.userData.user.id,
          firstName: this.$store.state.module1.userData.user.firstName,
          lastName: this.$store.state.module1.userData.user.lastName,
        },
      },
    };
  },
  methods: {
    getTextFromEditor(value) {
      this.comment.description = value;
    },
    sendComment() {
      //  post to server
      console.log(this.comment);
      this.$emit('setCommentValue', this.comment);
      this.$q.dialog({ title: 'ارسال شد ' });
      this.componentKey += 1;
    },
  },
};
</script>
<style lang="scss">
.addTaskComment {
  width: 60%;
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

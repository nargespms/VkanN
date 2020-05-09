<template >
  <div class="taskCommentListWrap" v-if="this.comments.length > 0">
    <q-timeline class="taskCommentList" color="secondary">
      <q-timeline-entry
        class="taskComment"
        v-for="comment in comments"
        :key="comment.id"
        :title="comment.name"
        subtitle="February 21, 1986"
        icon="person"
        :body="comment.description"
      />
    </q-timeline>
  </div>
</template>

<script>
export default {
  name: 'taskCommentList',
  data() {
    return {
      comments: {},
    };
  },
  mounted() {
    this.$axios.get('/statics/taskComments.json').then(res => {
      this.comments = res.data.comments;
      console.log(res.data.comments);
    });
  },
};
</script>
<style lang="scss">
.taskCommentList {
  .taskComment:nth-child(2n) {
    background-color: #f0f0f0;
  }
}
.taskComment {
  border-radius: 12px;
}
.taskCommentListWrap {
  padding: 24px;
  width: 40%;
}
</style>

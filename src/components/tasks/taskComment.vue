<template >
  <div class="taskCommentWrap">
    <taskCommentList />
    <addTaskComment @setCommentValue="setCommentValue" />
  </div>
</template>



<script>
import addTaskComment from './addTaskComment.vue';
import taskCommentList from './taskCommentList.vue';

export default {
  name: 'taskComment',
  data() {
    return {};
  },
  components: {
    addTaskComment,
    taskCommentList,
  },
  methods: {
    setCommentValue(value) {
      this.$emit('setCommentValue', value);
    },
  },
};
</script>
<style lang="scss">
.taskCommentWrap {
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1024px) {
    flex-wrap: wrap;
  }
}
</style>

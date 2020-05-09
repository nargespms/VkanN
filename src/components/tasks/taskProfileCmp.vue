<template>
  <div class="taskProfileCmpWrap">
    <div class="item">
      <div class="item-content">
        <span class="introParam">{{ $t('taskNum') }}</span>
        <span class="valueIntro">{{ data.taskNum }}</span>
      </div>
      <div class="item-content">
        <span class="introParam">{{ $t('title') }}</span>
        <span class="valueIntro">{{ data.title }}</span>
      </div>
      <div class="item-content" v-if="data.description">
        <span class="introParam">{{ $t('description') }}</span>
        <span class="valueIntro" v-html="data.description"></span>
      </div>
      <div class="item-content">
        <span class="introParam">{{ $t('priority') }}</span>
        <span class="valueIntro">{{ $t(data.priority) }}</span>
      </div>
      <div class="item-content" v-if="data.service">
        <span class="introParam">{{ $t('Service') }}</span>
        <router-link
          class="valueIntro"
          :to="
            '/' +
              $route.params.locale +
              '/' +
              'services' +
              '/' +
              data.service._id
          "
        >
          <span class="valueIntro">{{ data.service.name }}</span>
        </router-link>
      </div>

      <div class="item-content" v-if="data.asignee">
        <span class="introParam">{{ $t('assignee') }}</span>
        <router-link
          class="valueIntro"
          :to="
            '/' +
              $route.params.locale +
              '/' +
              'userManagement' +
              '/' +
              data.asignee._id
          "
        >
          <span class="valueIntro">
            {{ data.asignee.firstName }}
            &nbsp;
            {{ data.asignee.lastName }}
          </span>
        </router-link>
      </div>
      <div class="item-content" v-if="data.asigner">
        <span class="introParam">{{ $t('assigner') }}</span>
        <router-link
          class="valueIntro"
          :to="
            '/' +
              $route.params.locale +
              '/' +
              'userManagement' +
              '/' +
              data.asigner._id
          "
        >
          <span class="valueIntro">
            {{ data.asigner.firstName }}
            &nbsp;
            {{ data.asigner.lastName }}
          </span>
        </router-link>
      </div>

      <div class="item-content">
        <span class="introParam">{{ $t('tags') }}</span>
        <div class="valueIntro">
          <p v-for="tag in data.tags" :key="tag._id">{{ tag.title }}</p>
        </div>
      </div>

      <div class="item-content">
        <span class="introParam">{{ $t('departman') }}</span>
        <span class="valueIntro">{{ $t(data.department) }}</span>
      </div>

      <div class="item-content">
        <span class="introParam">{{ $t('attachments') }}</span>
        <span class="valueIntro">{{ data.attachments }}</span>
      </div>
    </div>
    <div class="taskWrapper mt32">
      <div class="newTaskInfoHeader" @click="taskStateComment = !taskStateComment">
        <span class="pr12">
          <q-icon v-if="!taskStateComment" class="text-blue-grey-8" name="fa fa-arrow-down" />
          <q-icon v-if="taskStateComment" class="text-blue-grey-8" name="fa fa-arrow-up" />
        </span>
        {{ $t('comments') }}
      </div>
      <div class="taskCommentContent">
        <q-slide-transition>
          <taskComment
            @setCommentValue="setCommentValue"
            v-if="taskStateComment"
            transition-show="scale"
            transition-hide="scale"
          />
        </q-slide-transition>
      </div>
    </div>
  </div>
</template>

<script>
import taskComment from './taskComment.vue';

export default {
  name: 'taskProfileCmp',
  components: {
    taskComment,
  },
  props: ['data'],
  data() {
    return {
      taskStateComment: false,
      comments: {},
    };
  },
  methods: {
    setCommentValue(value) {
      this.comments = value;
      console.log(value);
      this.$axios
        .post('/v1/api/vkann/comments', {
          taskId: this.data.id,
          description: value.description,
        })
        .then(res => {
          console.log(res);
        });
    },
  },
};
</script>

<style lang="scss">
.taskProfileCmpWrap {
  @media screen and (max-width: 800px) {
    width: 100%;
  }
  @media screen and (min-width: 800px) {
    width: 80%;
  }

  .item {
    display: flex;
    flex-wrap: wrap;
    border: 1px solid #f3f3f3;
    padding: 12px;
    .item-content {
      display: flex;
      width: calc(100%);
      border-bottom: 1px solid #ededed;
      padding: 12px;
      &:last-child {
        border-bottom: none;
      }
      .introParam {
        color: #000;
        font-size: 16px;
        width: 50%;
        display: inline-block;
      }
      .valueIntro {
        color: #027be3;
        width: 50%;
        display: inline-block;
        font-size: 15px;
      }
    }
  }
}
</style>

<template>
  <div class="taskProfileCmpWrap">
    <div class="item">
      <div class="item-content">
        <span class="introParam">{{ $t('taskNum') }}</span>
        <span class="valueIntro">{{ data.id }}</span>
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
            {{ data.asignee.firstName }}
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
            {{ data.asigner.firstName }}
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
  </div>
</template>

<script>
export default {
  name: 'taskProfileCmp',
  props: ['data'],
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

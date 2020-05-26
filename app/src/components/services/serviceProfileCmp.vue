<template >
  <div class="serviceProfileCmpWrap">
    <div class="item">
      <div class="item-content">
        <span class="introParam">{{ $t('Service') }}</span>
        <span class="valueIntro">{{ data.name }}</span>
      </div>

      <div class="item-content">
        <span class="introParam">{{ $t('clientName') }}</span>
        <router-link
          class="valueIntro"
          :to=" '/' + $route.params.locale + '/' + 'userManagement' + '/' +data.client._id "
        >
          <span class="valueIntro">
            {{ data.client.firstName}}
            &nbsp;
            {{ data.client.lastName}}
          </span>
        </router-link>
      </div>
      <div class="item-content">
        <span class="introParam">{{ $t('status') }}</span>
        <span class="valueIntro">{{ $t(data.status) }}</span>
      </div>

      <div class="item-content">
        <span class="introParam">{{ $t('tags') }}</span>
        <div class="valueIntro">
          <p v-for="tag in data.tags" :key="tag._id">{{ tag.title }}</p>
        </div>
      </div>

      <div class="item-content">
        <span class="introParam">{{ $t('primaryDomain') }}</span>
        <span class="valueIntro">{{ data.primaryDomain }}</span>
      </div>
      <div class="item-content">
        <span class="introParam">{{ $t('parkDomain') }}</span>
        <span class="valueIntro">{{ data.parkDomain }}</span>
      </div>
      <div class="item-content">
        <span class="introParam">{{ $t('billingStatus') }}</span>
        <span class="valueIntro">{{ $t(data.billingStatus) }}</span>
      </div>
      <div class="item-content">
        <span class="introParam">{{ $t('description') }}</span>
        <span class="valueIntro">{{ data.description }}</span>
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
  name: 'serviceProfileCmp',
  props: ['data'],
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.serviceProfileCmpWrap {
  @media screen and (max-width: 800px) {
    width: 100%;
  }
  @media screen and (min-width: 800px) {
    width: 80%;
    padding-left: 16px;
  }
  .item {
    display: flex;
    flex-wrap: wrap;
    border: 1px solid #f3f3f3;
    padding: 12px;
    float: right;
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

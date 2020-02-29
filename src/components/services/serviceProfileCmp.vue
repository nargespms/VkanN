<template >
  <div class="serviceProfileCmpWrap">
    <div class="item">
      <div class="item-content">
        <span class="introParam">{{ $t('Service') }}</span>
        <span class="valueIntro">{{ data.name }}</span>
      </div>
      <div class="item-content">
        <span class="introParam">{{ $t('employeeName') }}</span>
        <span class="valueIntro">{{ data.staff }}</span>
      </div>
      <div class="item-content">
        <span class="introParam">{{ $t('clientName') }}</span>
        <span class="valueIntro">{{ data.client }}</span>
      </div>
      <div class="item-content">
        <span class="introParam">{{ $t('status') }}</span>
        <span class="valueIntro">{{ data.status }}</span>
      </div>
      <div class="item-content">
        <span class="introParam">{{ $t('type') }}</span>
        <span class="valueIntro">{{data.type}}</span>
      </div>
      <div class="item-content">
        <span class="introParam">{{ $t('tags') }}</span>
        <span class="valueIntro">{{ data.tags }}</span>
      </div>
      <div class="item-content">
        <span class="introParam">{{ $t('bilingStatus') }}</span>
        <span class="valueIntro">{{ data.billingStatus }}</span>
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
};
</script>

<style lang="scss">
.serviceProfileCmpWrap {
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

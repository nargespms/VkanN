<template>
  <div class="userInfoDetails">
    <div class="item">
      <div class="item-content">
        <span class="introParam">{{ $t('tag') }}</span>
        <span class="valueIntro" v-for="tag in data.tags" :key="tag.index">{{ tag }}</span>
      </div>
      <div class="item-content">
        <span class="introParam">{{ $t('gender') }}</span>
        <span class="valueIntro">{{ data.gender }}</span>
      </div>
      <div class="item-content">
        <span class="introParam">{{ $t('nationalCode') }}</span>
        <span class="valueIntro">{{data.nationalId}}</span>
      </div>
      <div class="item-content">
        <span class="introParam">{{ $t('postalCode') }}</span>
        <span class="valueIntro">{{data.zipCode}}</span>
      </div>
      <div class="item-content">
        <span class="introParam">{{ $t('linkdin') }}</span>
        <span class="valueIntro">{{data.linkedin}}</span>
      </div>
      <div class="item-content">
        <span class="introParam">{{ $t('git') }}</span>
        <span class="valueIntro">{{data.git}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userInformationDetailsInfo',
  props: ['data'],
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.userInfoDetails {
  padding: 24px;
  .item {
    border: 1px solid #f3f3f3;
    padding: 12px;
  }
  .item-content:last-child {
    border-bottom: none;
  }
}
</style>

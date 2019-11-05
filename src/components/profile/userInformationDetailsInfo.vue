<template>
  <div class="userInfoDetails">
    <div class="item">
      <div class="item-content">
        <span class="introParam">{{$t('tag')}}</span>
        <span class="valueIntro">{{Details.tag}}</span>
      </div>
      <div class="item-content">
        <span class="introParam">{{$t('gender')}}</span>
        <span class="valueIntro">{{Details.gender}}</span>
      </div>
      <div class="item-content">
        <span class="introParam">{{$t('nationalCode')}}</span>
        <span class="valueIntro">{{Details.nationalId}}</span>
      </div>
      <div class="item-content">
        <span class="introParam">{{$t('postalCode')}}</span>
        <span class="valueIntro">{{Details.postalCode}}</span>
      </div>
      <div class="item-content">
        <span class="introParam">{{$t('linkdin')}}</span>
        <span class="valueIntro">{{Details.linkdin}}</span>
      </div>
      <div class="item-content">
        <span class="introParam">{{$t('git')}}</span>
        <span class="valueIntro">{{Details.git}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userInformationDetailsInfo',
  data() {
    return {
      Details: {
        tag: 'فرانت اند',
        gender: 'مرد',
        nationalId: 817498333,
        postalCode: 12124578,
        linkdin: '',
        git: 'github.com/nargespms',
      },
    };
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

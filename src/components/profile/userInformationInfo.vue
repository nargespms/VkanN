<template>
  <div>
    <!-- <div class="text-h6">{{$t('profileInfo')}}</div> -->
    <div class="list item-delimiter userInformationInfo">
      <div class="item">
        <div class="item-content">
          <span class="introParam">{{ $t('firstName') }}</span>
          <span class="valueIntro">{{ data.firstName }}</span>
        </div>
        <div class="item-content">
          <span class="introParam">{{ $t('lastName') }}</span>
          <span class="valueIntro">{{ data.lastName }}</span>
        </div>
        <div class="item-content">
          <span class="introParam">{{ $t('email') }}</span>
          <span class="valueIntro">{{ data.email }}</span>
        </div>
        <div class="item-content">
          <span class="introParam">{{ $t('mobile') }}</span>
          <span class="valueIntro">{{ data.mobile }}</span>
        </div>
        <div class="item-content">
          <span class="introParam">{{ $t('landLine') }}</span>
          <span class="valueIntro">{{}}</span>
        </div>
        <div class="item-content">
          <span class="introParam">{{ $t('status') }}</span>
          <span class="valueIntro">{{ data.status }}</span>
        </div>
        <div class="item-content">
          <span class="introParam">{{ $t('role') }}</span>
          <span class="valueIntro">{{ data.role }}</span>
        </div>
        <div class="item-content">
          <span class="introParam">{{ $t('country') }}</span>
          <span class="valueIntro">{{ data.country }}</span>
        </div>
        <div class="item-content">
          <span class="introParam">{{ $t('city') }}</span>
          <span class="valueIntro">{{}}</span>
        </div>
        <div class="item-content">
          <span class="introParam">{{ $t('adress') }}</span>
          <span class="valueIntro">{{}}</span>
        </div>
        <div class="item-content">
          <span class="introParam">{{ $t('spirintTime') }}</span>
          <span class="valueIntro">{{}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userInformationInfo',
  props: ['data'],
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.item-content {
  display: flex;
  width: calc(100%);
  border-bottom: 1px solid #ededed;
  padding: 12px;
}
.introParam {
  color: #000;
  font-size: 16px;
  width: 50%;
  display: inline-block;
  // font-family: 'ShabnamBold';
}
.valueIntro {
  color: $primary;
  width: 50%;
  display: inline-block;
  font-size: 15px;
}
.userInformationInfo {
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

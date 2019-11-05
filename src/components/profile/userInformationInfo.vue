<template>
  <div>
    <!-- <div class="text-h6">{{$t('profileInfo')}}</div> -->
    <div class="list item-delimiter userInformationInfo">
      <div class="item">
        <div class="item-content">
          <span class="introParam">{{$t('firstName')}}</span>
          <span class="valueIntro">{{lists.firstName}}</span>
        </div>
        <div class="item-content">
          <span class="introParam">{{$t('lastName')}}</span>
          <span class="valueIntro">{{lists.lastName}}</span>
        </div>
        <div class="item-content">
          <span class="introParam">{{$t('email')}}</span>
          <span class="valueIntro">{{lists.email}}</span>
        </div>
        <div class="item-content">
          <span class="introParam">{{$t('mobile')}}</span>
          <span class="valueIntro">{{lists.mobile}}</span>
        </div>
        <div class="item-content">
          <span class="introParam">{{$t('landLine')}}</span>
          <span class="valueIntro">{{lists.landLine}}</span>
        </div>
        <div class="item-content">
          <span class="introParam">{{$t('status')}}</span>
          <span class="valueIntro">{{lists.status}}</span>
        </div>
        <div class="item-content">
          <span class="introParam">{{$t('role')}}</span>
          <span class="valueIntro">{{lists.role}}</span>
        </div>
        <div class="item-content">
          <span class="introParam">{{$t('country')}}</span>
          <span class="valueIntro">{{lists.country}}</span>
        </div>
        <div class="item-content">
          <span class="introParam">{{$t('city')}}</span>
          <span class="valueIntro">{{lists.city}}</span>
        </div>
        <div class="item-content">
          <span class="introParam">{{$t('adress')}}</span>
          <span class="valueIntro">{{lists.adress}}</span>
        </div>
        <div class="item-content">
          <span class="introParam">{{$t('spirintTime')}}</span>
          <span class="valueIntro">{{lists.spirintTime}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userInformationInfo',
  data() {
    return {
      lists: {
        firstName: 'نرگس',
        lastName: 'پورمقدسی',
        email: 'nargespm@gmail.com',
        mobile: '09193802025',
        landLine: '02144656565',
        personality: 'natural',
        status: 'state1',
        role: 'teck',
        country: 'ایران',
        city: '',
        adress: 'شهران',
        spirintTime: 59,
      },
      Details: {
        tag: 'tag1',
        gender: 'man',
        nationalId: '',
        postalCode: 12124578,
        linkdin: '',
        git: '',
      },
    };
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
  font-family: 'ShabnamBold';
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

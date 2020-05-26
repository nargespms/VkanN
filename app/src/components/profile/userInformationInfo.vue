<template>
  <div>
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
          <span class="valueIntro numberDir">{{ data.mobile }}</span>
        </div>
        <div class="item-content">
          <span class="introParam">{{ $t('landLine') }}</span>
          <span class="valueIntro numberDir">{{ data.tel }}</span>
        </div>
        <div class="item-content">
          <span class="introParam">{{ $t('status') }}</span>
          <span class="valueIntro">{{ $t(data.status) }}</span>
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
          <span class="valueIntro">{{ data.city }}</span>
        </div>
        <div class="item-content">
          <span class="introParam">{{ $t('address') }}</span>
          <span class="valueIntro">{{ data.address }}</span>
        </div>
        <div v-if="$store.state.module1.userData.user.role !== 'CLIENT'" class="item-content">
          <span class="introParam">{{ $t('department') }}</span>
          <span class="valueIntro">{{ $t(data.department) }}</span>
        </div>
        <div class="item-content wrap">
          <span class="introParam">{{ $t('Service') }}</span>
          <p v-for="service in data.services" :key="service._id" class="valueIntro">
            <router-link
              class="valueIntro"
              :to="
                '/' +
                  $route.params.locale +
                  '/' +
                  'services' +
                  '/' +
                  service._id
              "
            >
              <span class="valueIntro">{{ service.name }}</span>
            </router-link>
          </p>
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

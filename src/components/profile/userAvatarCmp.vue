<template>
  <div class="userAvatar">
    <q-card class="my-card">
      <div class="avatarWrapp">
        <img src="~assets/Default-user.png" />
        <p class="absolute-bottom text-h6 choosePhoto">{{$t('choosePhoto')}}</p>
      </div>
      <q-card-section class="usrInfoAvatar">
        <p>ssssssssssssssssssssssssssssss</p>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'userAvatarCmp',
};
</script>

<style lang="scss">
.userAvatar {
  width: calc(100% / 6);
  padding-left: 16px;
  img {
    max-width: 100%;
  }
}
.choosePhoto {
  cursor: pointer;
  background-color: #38373799;
  padding: 12px;
  text-align: center;
  color: #fff;
  font-size: 15px;
}
.usrInfoAvatar {
  padding: 12px;
}
.avatarWrapp {
  position: relative;
}
</style>

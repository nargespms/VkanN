<template>
  <div class="userAvatar">
    <q-card class="my-card">
      <div class="avatarWrapp">
        <img src="~assets/Default-user.png" />
        <p class="absolute-bottom text-h6 choosePhoto">{{ $t('choosePhoto') }}</p>
      </div>
      <q-card-section class="usrInfoAvatar">
        <p>
          <span>{{ this.data.firstName }}</span>
          <span>{{ this.data.lastName }}</span>
        </p>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'userAvatarCmp',
  props: ['data'],
};
</script>

<style lang="scss">
.userAvatar {
  width: calc(100% / 6);
  padding-right: 16px;
  @media screen and (max-width: 1024px) and (min-width: 640px) {
    width: 30%;
  }
  @media screen and (max-width: 640px) {
    width: 100%;
    margin-bottom: 16px;
  }
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

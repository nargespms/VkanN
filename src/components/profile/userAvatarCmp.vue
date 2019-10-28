<template>
  <div class="userAvatar">
    <q-card class="my-card">
      <q-img src="/img/Default-user.png" basic>
        <div class="absolute-bottom text-h6 choosePhoto">{{$t('choosePhoto')}}</div>
      </q-img>
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
  width: 15%;
  display: flex;
}
.choosePhoto {
  cursor: pointer;
  font-size: 13px;
}
.usrInfoAvatar {
  padding: 12px;
}
</style>

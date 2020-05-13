<template>
  <div class="profileInfoWrapper">
    <userAvatarCmp :data="data" />
    <userInformation :data="data" />
  </div>
</template>

<script>
import userAvatarCmp from '../profile/userAvatarCmp';
import userInformation from '../profile/userInformation';

export default {
  name: 'profileInfoCmp',
  components: {
    userAvatarCmp,
    userInformation,
  },

  props: ['data'],
};
</script>

<style lang="scss">
.profileInfoWrapper {
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 640px) {
    display: block;
  }
}
</style>

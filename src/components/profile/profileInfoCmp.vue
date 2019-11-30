<template >
  <div class="profileInfoWrapper">
    <!-- avatar and name -->
    <userAvatarCmp />
    <!-- user Data and Information -->
    <userInformation />
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

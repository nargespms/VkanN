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
  mounted() {
    this.$axios
      .patch('/v1/api/vkann/profile/5e08987475f05f318e8dbcfb')
      .then(response => {
        console.log(response);
        if (response.status === 204) {
          console.log(response.data);
        } else {
          this.$q.notify({
            message: this.$t('incorrectcaptcha'),
            color: 'negative',
            icon: 'warning',
            position: 'top',
          });
        }
      });
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

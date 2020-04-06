<template>
  <div>
    <profileInfoCmp :data="userData" />
  </div>
</template>

<script>
import profileInfoCmp from '../profile/profileInfoCmp.vue';

export default {
  name: 'userProfileCmp',
  components: {
    profileInfoCmp,
  },
  data() {
    return {
      userData: {},
    };
  },
  mounted() {
    this.$axios
      .get(`/v1/api/vkann/users/${this.$route.params.userId}`)
      .then(res => {
        console.log(res);
        this.userData = res.data.user;
      });
  },
};
</script>

<template>
  <div class="q-pa-lg pt50">
    <profileEditForm />
  </div>
</template>

<script>
import profileEditForm from '../components/profile/profileEditForm.vue';

export default {
  name: 'addMember',
  components: {
    profileEditForm,
  },
};
</script>

<style lang="scss">
.pt50 {
  padding-top: 50px;
}
</style>

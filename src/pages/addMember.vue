<template>
  <div class="q-pa-lg">
    <h4 class="headerTitle">
      <span>
        {{$t('addMember')}}
      </span>
    </h4>
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
.headerTitle {
  font-size: 25px;
  margin: 12px;
}
</style>

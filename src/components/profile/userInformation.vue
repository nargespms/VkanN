<template>
  <div class="userInformationWrapper">
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey block460"
        active-color="primary"
        align="justify"
      >
        <q-tab name="profileInfo" :label="$t('profileInfo')" />
        <q-tab name="profileInfoDetails" :label="$t('profileInfoDetails')" />
        <q-tab name="editProfile" :label="$t('editProfile')" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="profileInfo">
          <userInformationInfo :data="userData" />
        </q-tab-panel>

        <q-tab-panel name="profileInfoDetails">
          <userInformationDetailsInfo :data="userData" />
        </q-tab-panel>

        <q-tab-panel name="editProfile">
          <profileEditForm />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import userInformationInfo from './userInformationInfo.vue';
import userInformationDetailsInfo from './userInformationDetailsInfo.vue';
import profileEditForm from './profileEditForm.vue';

export default {
  name: 'userInformation',
  components: {
    userInformationInfo,
    userInformationDetailsInfo,
    profileEditForm,
  },
  data() {
    return {
      tab: 'profileInfo',
    };
  },
  computed: {
    userData() {
      return this.$store.state.module1.userData;
    },
  },
};
</script>

<style lang="scss">
.userInformationWrapper {
  width: calc(100%);
  @media screen and (max-width: 1024px) and (min-width: 640px) {
    width: 70%;
  }
  @media screen and (max-width: 640px) {
    width: 100%;
  }
}
[dir] .q-tab--active {
  border-bottom: 3px solid $orange;
}
.q-tab__indicator {
  height: 0px;
}
</style>

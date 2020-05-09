<template>
  <div class="userInformationWrapper">
    <q-card>
      <q-tabs v-model="tab" dense class="text-grey block460" active-color="primary" align="justify">
        <q-tab name="profileInfo" :label="$t('profileInfo')" />
        <q-tab name="profileInfoDetails" :label="$t('profileInfoDetails')" />
        <q-tab name="editProfile" :label="$t('editProfile')" v-if="!userEdit" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="profileInfo">
          <userInformationInfo :data="profileData" />
        </q-tab-panel>

        <q-tab-panel name="profileInfoDetails">
          <userInformationDetailsInfo :data="profileData" />
        </q-tab-panel>

        <q-tab-panel name="editProfile" v-if="!userEdit">
          <profileEditForm :profileMode="'Edit'" @editDataUser="editDataUser" />
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
  props: ['data'],
  components: {
    userInformationInfo,
    userInformationDetailsInfo,
    profileEditForm,
  },

  data() {
    return {
      tab: 'profileInfo',
      form: {},
      profileData: {},
    };
  },

  methods: {
    editDataUser(value) {
      this.form = value;
      if (
        this.$route.path
          .split('/')
          .slice(2, 3)
          .toString() === 'profile'
      ) {
        this.$axios
          .put('/v1/api/vkann/profile', {
            firstName: this.form.FirstName,
            lastName: this.form.LastName,
            gender: this.form.gender,
            personality: this.form.personality,
            department: this.form.departman,
            nationalId: this.form.nationalId,
            mobile: this.form.MobileNumber,
            tel: this.form.tel,
            role: this.form.role,
            status: this.form.status,
            email: this.form.email,
            country: this.form.country,
            city: this.form.city,
            zipCode: this.form.postalCode,
            sprintTime: this.form.spirintTime,
            tags: this.form.tags,
            linkedin: this.form.linkdin,
            git: this.form.git,
            address: this.form.address,
            password: this.form.PassWord,
          })
          .then(res => {
            if (res.status === 200) {
              this.$q.notify({
                message: this.$t('userEdited'),
                color: 'positive',
                icon: 'check',
                position: 'top',
              });
              this.tab = 'profileInfo';
            }
          })
          .catch(e => {
            if (e.response.status === 409) {
              this.$q.notify({
                message: this.$t('mobileOrEmailEnteredAreReserved'),
                color: 'negative',
                icon: 'warning',
                position: 'top',
              });
            }
          });
      } else {
        this.$axios
          .put(`/v1/api/vkann/users/${this.$route.params.userId}`, {
            firstName: this.form.FirstName,
            lastName: this.form.LastName,
            gender: this.form.gender,
            department: this.form.departman,
            personality: this.form.personality,
            nationalId: this.form.nationalId,
            mobile: this.form.MobileNumber,
            tel: this.form.tel,
            role: this.form.role,
            status: this.form.status,
            email: this.form.email,
            country: this.form.country,
            city: this.form.city,
            zipCode: this.form.postalCode,
            sprintTime: this.form.spirintTime,
            tags: this.form.tags,
            linkedin: this.form.linkdin,
            git: this.form.git,
            address: this.form.address,
            password: this.form.PassWord,
          })
          .then(res => {
            if (res.status === 200) {
              this.$q.notify({
                message: this.$t('userEdited'),
                color: 'positive',
                icon: 'check',
                position: 'top',
              });
              this.$router.push({
                path: `/${this.$route.params.locale}/userManagement`,
              });
            }
          })
          .catch(e => {
            if (e.response.status === 409) {
              this.$q.notify({
                message: this.$t('mobileOrEmailEnteredAreReserved'),
                color: 'negative',
                icon: 'warning',
                position: 'top',
              });
            }
          });
      }
    },
  },
  computed: {
    userEdit() {
      return (
        this.$route.path
          .split('/')
          .slice(2, 3)
          .toString() !== 'profile' &&
        this.$store.state.module1.userData.user.role !== 'MANAGER'
      );
    },
  },
  mounted() {
    this.$axios.get('/v1/api/vkann/profile').then(response => {
      this.profileData = response.data.user;
    });
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

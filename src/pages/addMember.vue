<template>
  <div class="q-pa-xl">
    <div class="addMemberPage">
      <userAvatarCmp :data="data" />
      <profileEditForm :profileMode="'ADD'" @sendDataUser="sendDataUser" />
    </div>
  </div>
</template>

<script>
import profileEditForm from '../components/profile/profileEditForm.vue';
import userAvatarCmp from '../components/profile/userAvatarCmp.vue';

export default {
  name: 'addMember',
  meta() {
    return { title: this.$t('addMember') };
  },

  components: {
    profileEditForm,
    userAvatarCmp,
  },
  data() {
    return {
      form: {},
      data: {},
      profileMode: 'ADD',
    };
  },
  methods: {
    sendDataUser(value) {
      this.form = value;
      console.log(this.form);
      if (this.profileMode === 'ADD') {
        this.$axios
          .post('/v1/api/vkann/users', {
            firstName: this.form.FirstName,
            lastName: this.form.LastName,
            gender: this.form.gender,
            personality: this.form.personality,
            nationalId: this.form.nationalId,
            mobile: this.form.MobileNumber,
            tel: this.form.tel,
            role: this.form.role,
            ...(this.form.role !== 'CLIENT'
              ? {
                  department: this.form.departman,
                }
              : ''),
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
                message: this.$t('newUserAdded'),
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
            console.log(e.response.status);
            if (e.response.status === 400) {
              this.$q.notify({
                message: this.$t('Theformabovehaserrors'),
                color: 'negative',
                icon: 'warning',
                position: 'top',
              });
            }
          });
      }
    },
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
.addMemberPage {
  display: flex;

  @media screen and (max-width: 800px) {
    display: block;
    .userAvatar {
      margin: 12px auto;
    }
    .editProfileWrap {
      width: 100%;
    }
  }
}
</style>

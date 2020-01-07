<template>
  <div class="q-pa-xl">
    <h4 class="headerTitle">
      <span>{{ $t('addMember') }}</span>
    </h4>
    <profileEditForm @sendDataUser="sendDataUser" />
  </div>
</template>

<script>
import profileEditForm from '../components/profile/profileEditForm.vue';

export default {
  name: 'addMember',
  components: {
    profileEditForm,
  },
  data() {
    return {
      form: '',
    };
  },
  methods: {
    sendDataUser(value) {
      this.form = value;
      console.log(this.form);
      this.$axios
        .post('/v1/api/vkann/users', {
          firstName: this.form.FirstName,
          lastName: this.form.LastName,
          gender: this.form.gender,
          password: this.form.PassWord,
          personality: this.form.personality,
          INSEECode: 0,
          nationalId: this.form.nationalId,
          birthDay: '2020-01-06T09:00:49.079Z',
          mobile: this.form.MobileNumber,
          tel: 'string',
          fax: 'string',
          service: ['string'],
          contract: ['string'],
          role: this.form.role,
          status: this.form.status,
          email: this.form.email,
          country: 'IR',
          city: this.form.city,
          zipCode: this.form.postalCode,
          sprintTime: 0,
          tags: this.form.tags,
          linkedin: this.form.linkdin,
          git: this.form.git,
          location: [0],
          languages: ['fa'],
          avatarFile: 'string',
          addresses: 'string',
        })
        .then(response => {
          console.log(response);
          this.$router.push({
            path: `/${this.$route.params.locale}/userManagement`,
          });
        })
        .catch(e => {
          console.log(e.response.status);
          if (e.response.status === 403) {
            this.$q.notify({
              message: this.$t('forbidenAccess'),
              color: 'negative',
              icon: 'warning',
              position: 'top',
            });
          }
        });
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
</style>

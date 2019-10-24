<template >
  <div>
    <q-form v-if ="enableRegister"
      @submit="onSubmit"
      class="q-gutter-md RegisterForm"
    >
      <!-- user name -->
      <q-input  outlined required class="inputFieldText"
                    color="light-blue-10" v-model="form.FirstName"
                    :label="$t('firstName')"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 ]">
        <template v-slot:prepend>
          <q-icon name="fas fa-user" />
        </template>
      </q-input>
      <!-- last name -->
      <q-input  outlined required class="inputFieldText"
                    color="light-blue-10" v-model="form.LastName"
                    :label="$t('lastName')"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 ]">
        <template v-slot:prepend>
          <q-icon name="fas fa-user" />
        </template>
      </q-input>
      <!-- Email -->
      <q-input outlined required :label="$t('email')"
        v-model="form.email"
        @blur="$v.form.email.$touch"
        @keyup.enter="submit"
        :error="$v.form.email.$error"
      />
      <!-- Phone Number -->
        <vue-tel-input required v-model="MobileNumber"
                       :placeholder="$t('pleaseEnterYourPhoneNumber')"></vue-tel-input>
      <!-- Gender -->
      <div class="genderRegister">
        <label >
          {{$t('gender')}}:
        </label>
        <q-radio class="genderOpt" v-model="form.Gender" val="female" >
          {{$t('female')}}
        </q-radio>
        <q-radio class="genderOpt" v-model="form.Gender" val="male" >
          {{$t('male')}}
        </q-radio>
      </div>
      <!-- password -->
      <q-input  outlined required class="inputFieldText passwordField" color="light-blue-10"
                :label="$t('EnterYourPassword')"
                v-model="form.PassWord"  :type="isPwd ? 'password' : 'text'"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']">
        <template v-slot:prepend>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer visibilityPass"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <!-- Re enter password -->
      <q-input  outlined required class="inputFieldText passwordField" color="light-blue-10"
                :label="$t('ReEnterYourPassword')"
                v-model="form.Confirmpass"  :type="isPwd ? 'password' : 'text'"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']">
        <template v-slot:prepend>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer visibilityPass"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-btn color="primary" @click="onSubmit">
        {{$t('submit')}}
      </q-btn>
    </q-form>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { VueTelInput } from 'vue-tel-input';

export default {
  components: {
    VueTelInput,
  },
  data() {
    return {
      enableRegister: true,
      MobileNumber: '',
      isPwd: true,
      form: {
        email: '',
        FirstName: '',
        LastName: '',
        Gender: '',
        PassWord: '',
        Confirmpass: '',
      },
    };
  },
  validations: {
    form: {
      email: { required, email },
    },
  },
  methods: {
    onSubmit() {
      if (
        this.form.email.length !== 0 &&
        this.form.FirstName.length !== 0 &&
        this.form.Gender.length !== 0 &&
        this.form.LastName.length !== 0 &&
        this.form.PassWord.length !== 0 &&
        this.form.Confirmpass.length !== 0
      ) {
        this.$v.form.$touch();
        if (this.$v.form.$error) {
          this.$q.notify({
            message: 'Please Enter A valid Email',
            color: 'negative',
            icon: 'warning',
            position: 'top',
          });
        }
        if (this.form.PassWord === this.form.Confirmpass) {
          this.enableRegister = false;
          this.$q.notify({
            color: 'dark',
            icon: 'verified_user',
            message: `Welcome ${this.form.FirstName}!`,
            position: 'top',
            timeout: Math.random() * 5000 + 3000,
          });
          console.log('Logged In');
          this.$router.push({
            path: `/${this.$route.params.locale}/dashboard`,
          });
        } else {
          this.$q.notify({
            message: 'Password dosnt match',
            color: 'negative',
            icon: 'warning',
            position: 'top',
          });
        }
      } else {
        console.log(this.form.email.length);
        this.$q.notify({
          message: 'Please fill the required fields',
          color: 'negative',
          icon: 'warning',
          position: 'top',
        });
      }
    },
  },
};
</script>

<style lang="scss">
.RegisterForm {
  width: 400px;
  margin: 12px auto;
  [dir='rtl'] .RegisterForm .vti__dropdown-list {
    position: absolute;
    right: 0;
    direction: ltr;
  }
  .vti__dropdown-list {
    left: 0 !important;
    text-align: left;
    width: 382px;
  }
}
.q-panel-parent {
  overflow: unset;
}
.scroll {
  overflow: unset;
}
.vue-tel-input {
  padding: 8px 2px;
}
.genderOpt {
  padding-right: 50px;
}
</style>

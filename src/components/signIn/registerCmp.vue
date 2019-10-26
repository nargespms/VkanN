<template >
  <div>
    <q-form v-if ="enableRegister"
      @submit="onSubmit"
      class="q-gutter-md RegisterForm"
    >
      <!-- user name -->
      <q-input  outlined required class="inputFieldText"
                    color="light-blue-10" ref="form.FirstName" v-model="form.FirstName"
                    label="FirstName"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 ]">
        <template v-slot:prepend>
          <q-icon name="fas fa-user" />
        </template>
      </q-input>
      <!-- last name -->
      <q-input  outlined required class="inputFieldText"
                    color="light-blue-10" ref="form.LastName" v-model="form.LastName"
                    label="LastName"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 ]">
        <template v-slot:prepend>
          <q-icon name="fas fa-user" />
        </template>
      </q-input>
      <!-- Email -->
      <q-input outlined required label="Email"
        ref="form.email"
        v-model="form.email"
        @blur="$v.form.email.$touch"
        @keyup.enter="submit"
        :error="$v.form.email.$error"
        :rules="[ val => val && val.length > 0 ]"
      />
      <!-- Phone Number -->
        <vue-tel-input required v-model="form.MobileNumber"
                      :rules="[
                        val => val !== null && val !== '' || 'Please type your age',
                      ]">
        </vue-tel-input>
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
                label="Enter Your Password"
                v-model="form.PassWord"  :type="isPwd ? 'password' : 'text'"
                lazy-rules
                ref="form.PassWord"
                :rules="[ val => val && val.length > 0]">
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
                label="ReEnter Your Password"
                v-model="form.Confirmpass"  :type="isPwd ? 'password' : 'text'"
                lazy-rules
                ref="form.Confirmpass"
                :rules="[ val => val && val.length > 0]">
        <template v-slot:prepend>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer visibilityPass"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-btn color="primary" @click="onSubmit">Submit</q-btn>
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
      isPwd: true,
      form: {
        email: '',
        FirstName: '',
        LastName: '',
        MobileNumber: '',
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
      // validation for first name &last name & email

      if ((this.$refs['form.FirstName'].validate()) && (this.$refs['form.LastName'].validate())
      && (this.$refs['form.email'].validate()) && (this.$refs['form.PassWord'].validate())
      && (this.$refs['form.Confirmpass'].validate()) && (this.form.MobileNumber.length !== 0)
      ) {
        if (this.form.PassWord === this.form.Confirmpass) {
          // last step
          this.$v.form.$touch();
          if (this.$v.form.$error) {
            this.$q.notify({
              message: 'Please Enter A valid Email',
              color: 'negative',
              icon: 'warning',
              position: 'top',
            });
          } else {
            this.enableRegister = false;
            this.$router.push({ path: 'dashboard' });
            this.$q.notify({
              color: 'dark',
              icon: 'verified_user',
              message: `Welcome ${this.form.FirstName}!`,
              position: 'top',
              timeout: Math.random() * 5000 + 3000,
            });
          }
          console.log('Loged In');
        } else {
          this.$q.notify({
            message: 'Password dosnt match',
            color: 'negative',
            icon: 'warning',
            position: 'top',
          });
        }
      } else if (this.form.MobileNumber.length === 0) {
        console.log(this.form.email.length);
        this.$q.notify({
          message: 'Please fill number',
          color: 'negative',
          icon: 'warning',
          position: 'top',
        });
      } else {
        this.$q.notify({
          message: 'Please fill required filds',
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
  [dir="rtl"] .RegisterForm .vti__dropdown-list {
    position: absolute;
    right: 0;
    direction: ltr;
  }
  .vti__dropdown-list {
    left: 0!important;
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
  padding-right: 50px
}
</style>

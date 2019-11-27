<template >
  <div class="registerWrapperCmp">
    <q-form v-if="enableRegister" @submit="onSubmit" class="q-gutter-md RegisterForm">
      <!-- user name -->
      <q-input
        outlined
        required
        class="inputFieldText"
        color="light-blue-10"
        v-model.lazy="$v.form.FirstName.$model"
        :label="$t('firstName')"
        lazy-rules
        :rules="[ val => val && val.length > 0 ]"
      >
        <template v-slot:prepend>
          <q-icon name="fas fa-user" />
        </template>
      </q-input>
      <!-- firstname validation -->
      <p v-if="errors" class="error">
        <span v-if="!$v.form.FirstName.required">this field is required.</span>
        <span
          v-if="!$v.form.FirstName.minLength"
        >Field must have at least {{ $v.form.FirstName.$params.minLength.min }} characters.</span>
      </p>
      <!-- firstname validation -->
      <!-- last name -->
      <q-input
        outlined
        required
        class="inputFieldText"
        color="light-blue-10"
        v-model="form.LastName"
        :label="$t('lastName')"
        lazy-rules
        :rules="[ val => val && val.length > 0 ]"
      >
        <template v-slot:prepend>
          <q-icon name="fas fa-user" />
        </template>
      </q-input>
      <!-- Email -->
      <q-input
        outlined
        required
        :label="$t('email')"
        v-model="form.email"
        @blur="$v.form.email.$touch"
        @keyup.enter="submit"
        :error="$v.form.email.$error"
      >
        <template v-slot:prepend>
          <q-icon name="email" class="mailIcon" />
        </template>
      </q-input>
      <!-- email errors -->
      <p v-if="errors" class="error">
        <span v-if="!$v.form.email.required">this field is required.</span>
        <span v-if="!$v.form.email.email">Needs to be a valid email.</span>
        <span v-if="!$v.form.email.isUnique">This email is already registered.</span>
      </p>
      <!-- email errors -->
      <!-- Phone Number -->
      <vue-tel-input
        required
        v-model="MobileNumber"
        :placeholder="$t('pleaseEnterYourPhoneNumber')"
      ></vue-tel-input>
      <!-- Gender -->
      <div class="genderRegister">
        <label>{{$t('gender')}}:</label>
        <q-radio class="genderOpt" v-model="form.Gender" val="female">{{$t('female')}}</q-radio>
        <q-radio class="genderOpt" v-model="form.Gender" val="male">{{$t('male')}}</q-radio>
      </div>
      <!-- password -->
      <q-input
        outlined
        required
        class="inputFieldText passwordField"
        color="light-blue-10"
        :label="$t('EnterYourPassword')"
        v-model="$v.form.PassWord.$model"
        :type="isPwd ? 'password' : 'text'"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      >
        <template v-slot:prepend>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer visibilityPass"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <p class="error" v-if="errors">
        <span v-if="!$v.form.PassWord.required">*</span>
        <span
          v-if="!$v.form.PassWord.strongPassword"
        >Strong passwords need to have a letter, a number, a special character, and be more than 8 characters long.</span>
      </p>
      <!-- Re enter password -->
      <q-input
        outlined
        required
        class="inputFieldText passwordField"
        color="light-blue-10"
        :label="$t('ReEnterYourPassword')"
        v-model="$v.form.Confirmpass.$model"
        :type="isPwd ? 'password' : 'text'"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      >
        <template v-slot:prepend>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer visibilityPass"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <!-- errors for pass2 -->
      <p v-if="errors" class="error">
        <span v-if="!$v.form.Confirmpass.required">*</span>
      </p>
      <p v-if="errors" class="error">
        <span v-if="!$v.form.Confirmpass.sameAsPassword">The passwords do not match.</span>
      </p>
      <!-- errors for pass2 -->

      <q-btn color="primary" @click.prevent="onSubmit">{{$t('submit')}}</q-btn>
      <p v-if="errors" class="error">
        The form above has errors,
        <br />please get your act together and resubmit
      </p>
      <p v-else-if="empty && uiState === 'submit clicked'" class="error">
        The form above is empty,
        <br />cmon y'all you can't submit an empty form!
      </p>
    </q-form>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';
import { VueTelInput } from 'vue-tel-input';

export default {
  components: {
    VueTelInput,
  },
  data() {
    return {
      // data for validation
      uiState: 'submit not clicked',
      errors: false,
      empty: true,
      // end of data for validation
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
      email: {
        required,
        email,
        isUnique(value) {
          // standalone validator ideally should not assume a field is required
          if (value === '') return true;

          // simulate async call, fail for all logins with even length
          return new Promise(resolve => {
            setTimeout(() => {
              resolve(
                typeof value === 'string' && value !== 'narges.pm@yahoo.com'
              );
            }, 350 + Math.random() * 300);
          });
        },
      },
      FirstName: { required, minLength: minLength(3) },
      PassWord: {
        required,
        strongPassword(PassWord) {
          return (
            /[a-z]/.test(PassWord) && // checks for a-z
            /[0-9]/.test(PassWord) && // checks for 0-9
            /\W|_/.test(PassWord) && // checks for special char
            PassWord.length >= 6
          );
        },
      },
      Confirmpass: {
        required,
        sameAsPassword: sameAs('PassWord'),
      },
    },
  },
  methods: {
    onSubmit() {
      this.empty = !this.$v.form.$anyDirty;
      this.errors = this.$v.form.$anyError;
      this.uiState = 'submit clicked';
      if (this.errors === false && this.empty === false) {
        // this is where you send the responses
        this.uiState = 'form submitted';
        this.$router.push({
          path: `/${this.$route.params.locale}/dashboard`,
        });
      } else {
        this.$q.notify({
          message: 'The form above has errors,',
          color: 'negative',
          icon: 'warning',
          position: 'top',
        });
      }
    },

    // console.log('Logged In');
    // this.$router.push({
    //   path: `/${this.$route.params.locale}/dashboard`,
    // });
    // console.log(this.form.email.length);
  },
};
</script>

<style lang="scss">
.registerWrapperCmp {
  overflow: hidden;
}
.RegisterForm {
  width: 100%;
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
.mailIcon {
  font-size: 17px;
}
</style>

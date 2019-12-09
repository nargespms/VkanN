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
        autofocus
      >
        <template v-slot:prepend>
          <q-icon name="fas fa-user" />
        </template>
        <!-- firstname validation -->
        <p v-if="errors" class="error">
          <span v-if="!$v.form.FirstName.required">*{{$t('thisfieldisrequired')}}.</span>
          <span v-if="!$v.form.FirstName.minLength">{{$t('Fieldmusthaveatleast3characters')}}</span>
        </p>
        <!-- firstname validation -->
      </q-input>
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
        <p v-if="errors" class="error">
          <span v-if="!$v.form.LastName.required">*{{$t('thisfieldisrequired')}}.</span>
        </p>
      </q-input>
      <!-- Email -->
      <q-input
        outlined
        required
        :label="$t('email')"
        v-model="form.email"
        @input="$v.form.email.$touch"
        @keyup.enter="submit"
        :error="$v.form.email.$error"
      >
        <template v-slot:prepend>
          <q-icon name="email" class="mailIcon" />
        </template>
        <!-- email errors -->
        <p v-if="errors" class="error">
          <span v-if="!$v.form.email.required">*{{$t('thisfieldisrequired')}}.</span>
          <span v-if="!$v.form.email.email">* {{$t('Needstobeavalidemail')}}.</span>
          <span v-if="!$v.form.email.isUnique">*{{$t('Thisemailisalreadyregistered')}}.</span>
        </p>
        <!-- email errors -->
      </q-input>
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
        <p v-if="errors" class="error float">
          <span v-if="!$v.form.Gender.required">*{{$t('thisfieldisrequired')}}.</span>
        </p>
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
        @input="EnableConf"
      >
        <template v-slot:prepend>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer visibilityPass"
            @click="isPwd = !isPwd"
          />
        </template>
        <p class="error" v-if="errors">
          <span v-if="!$v.form.PassWord.required">*{{$t('thisfieldisrequired')}}.</span>
        </p>
      </q-input>
      <p class="error" v-if="errors">
        <span v-if="!$v.form.PassWord.strongPassword">{{$t('Strongpasswords')}}</span>
      </p>
      <!-- Re enter password -->
      <q-input
        outlined
        required
        :disable="!this.enableConfirm"
        class="inputFieldText passwordField"
        color="light-blue-10"
        :label="$t('ReEnterYourPassword')"
        v-model="$v.form.Confirmpass.$model"
        :type="isPwd1 ? 'password' : 'text'"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      >
        <template v-slot:prepend>
          <q-icon
            :name="isPwd1 ? 'visibility_off' : 'visibility'"
            class="cursor-pointer visibilityPass"
            @click="isPwd1 = !isPwd1"
          />
        </template>
      </q-input>
      <!-- errors for pass2 -->
      <p v-if="errors" class="error">
        <span v-if="!$v.form.Confirmpass.sameAsPassword">The passwords do not match.</span>
      </p>
      <!-- errors for pass2 -->

      <q-btn color="primary" @click.prevent="onSubmit">{{$t('submit')}}</q-btn>
      <p v-if="errors" class="error">
        The form above has errors,
        <br />please get your act together and resubmit
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
      isPwd1: true,
      form: {
        email: '',
        FirstName: '',
        LastName: '',
        Gender: '',
        PassWord: '',
        Confirmpass: '',
      },
      enableConfirm: false,
    };
  },
  validations: {
    form: {
      Gender: { required },
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
      LastName: { required },
      PassWord: {
        required,
        strongPassword(PassWord) {
          return (
            /[a-z]/.test(PassWord) && // checks for a-z
            /[0-9]/.test(PassWord) && // checks for 0-9
            // /\W|_/.test(PassWord) && // checks for special char
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
      } else if (this.empty === true) {
        this.$q.notify({
          message: this.$t('emptyForm'),
          color: 'negative',
          icon: 'warning',
          position: 'top',
        });
      } else {
        this.$q.notify({
          message: this.$t('Theformabovehaserrors'),
          color: 'negative',
          icon: 'warning',
          position: 'top',
        });
      }
    },
    EnableConf() {
      this.enableConfirm = true;
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

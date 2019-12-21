<template>
  <div class="editProfileWrap col3th">
    <q-form @submit="onSubmit" class="q-gutter-md RegisterForm">
      <div class="col1">
        <!-- user name -->
        <q-input
          outlined
          required
          class="inputFieldText"
          color="light-blue-10"
          v-model.trim="form.FirstName"
          :label="$t('firstName')"
          lazy-rules
          :rules="[val => val && val.length > 0]"
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
          v-model.trim="form.LastName"
          :label="$t('lastName')"
          lazy-rules
          :rules="[val => val && val.length > 0]"
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
          v-model.trim="form.email"
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
        <!-- Mobile Phone Number -->
        <mobilePhone />
        <!-- Mobile Phone Number -->
        <vue-tel-input
          required
          v-model.trim="MobileNumber"
          class="mb20"
          :placeholder="$t('pleaseEnterYourMobilephoneNumber')"
        ></vue-tel-input>
        <!-- line Phone Number -->
        <vue-tel-input
          required
          v-model.trim="form.landLine"
          class="generalInputStyles"
          :placeholder="$t('pleaseEnterYourPhoneNumber')"
        ></vue-tel-input>

        <!-- Gender -->
        <q-select
          color="light-blue-10"
          outlined
          v-model.trim="form.gender"
          :options="genderList"
          :label="$t('Gender')"
          class="inputStyle pt20"
        >
          <template v-slot:append>
            <q-icon name />
          </template>
        </q-select>
        <!-- current password
        <q-input
          outlined
          required
          class="inputFieldText passwordField"
          color="light-blue-10"
          :label="$t('EnterYourCurrentPassword')"
          v-model="form.currentPass"
          :type="isPwd ? 'password' : 'text'"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type something']"
        >
          <template v-slot:prepend>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer visibilityPass"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>-->
        <!--New  password -->
        <q-input
          outlined
          required
          class="inputFieldText passwordField"
          color="light-blue-10"
          :label="$t('EnterYourPassword')"
          v-model.trim="form.PassWord"
          :type="isPwd ? 'password' : 'text'"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type something']"
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
          class="inputFieldText passwordField"
          color="light-blue-10"
          :label="$t('ReEnterYourPassword')"
          v-model.trim="form.Confirmpass"
          :type="isPwd1 ? 'password' : 'text'"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type something']"
          :disable="!this.enableConfirm"
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
      </div>
      <div class="col2">
        <!-- NationalId -->
        <q-input
          outlined
          required
          v-model.trim="form.nationalId"
          :label="$t('PleaseEnterNationalId')"
          class="inputStyle"
          :error="$v.form.nationalId.$error"
          mask="##########"
        >
          <template v-slot:prepend>
            <q-icon name />
          </template>
          <p v-if="errors" class="error">
            <span v-if="!$v.form.nationalId.required">*{{$t('thisfieldisrequired')}}.</span>
            <!-- <span v-if="!$v.form.nationalId.minLength">*{{$t('Fieldmusthaveatleast10characters')}}.</span> -->
            <span v-if="!$v.form.nationalId.isValidIranianNationalCode">*{{$t('invalidCode')}}.</span>
          </p>
        </q-input>
        <!-- Country -->
        <q-select
          color="light-blue-10"
          outlined
          v-model.trim="form.country"
          :options="countries"
          :label="$t('country')"
          class="inputStyle"
        >
          <template v-slot:append>
            <q-icon name />
          </template>
        </q-select>
        <!-- city -->
        <q-select
          color="light-blue-10"
          outlined
          v-model.trim="form.city"
          :options="cities"
          :label="$t('city')"
          class="inputStyle"
        >
          <template v-slot:append>
            <q-icon name />
          </template>
        </q-select>
        <!-- Adress -->
        <q-input outlined required :label="$t('adress')" v-model="form.adress">
          <template v-slot:prepend>
            <q-icon name="my_location" />
          </template>
        </q-input>
        <!-- Postal Code  -->
        <q-input
          outlined
          v-model.trim="form.postalCode"
          :label="$t('PleaseEnterPostalCode')"
          class="inputStyle pt20"
          :error="$v.form.postalCode.$error"
          mask="#####-#####"
        >
          <template v-slot:prepend>
            <q-icon name />
          </template>
          <p v-if="errors" class="error">
            <span v-if="!$v.form.postalCode.required">*{{$t('thisfieldisrequired')}}.</span>
            <span v-if="!$v.form.postalCode.minLength">*{{$t('Fieldmusthaveatleast10characters')}}.</span>
          </p>
        </q-input>
        <!-- Role -->
        <q-select
          color="light-blue-10"
          outlined
          v-model.trim="form.role"
          :options="roles"
          :label="$t('role')"
          class="inputStyle"
        >
          <template v-slot:append>
            <q-icon name />
          </template>
        </q-select>
        <!-- status -->
        <q-select
          color="light-blue-10"
          outlined
          v-model.trim="form.status"
          :options="states"
          :label="$t('status')"
          class="inputStyle"
        >
          <template v-slot:append>
            <q-icon name />
          </template>
        </q-select>
        <!-- tags -->
        <q-select
          color="light-blue-10"
          outlined
          v-model.trim="form.tag"
          :options="tags"
          :label="$t('Tag')"
          class="inputStyle"
        >
          <template v-slot:append>
            <q-icon name />
          </template>
        </q-select>
      </div>
      <div class="col3">
        <!-- personality -->
        <q-select
          color="light-blue-10"
          outlined
          v-model.trim="form.personality"
          :options="personality"
          :label="$t('personality')"
          class="inputStyle"
        >
          <template v-slot:append>
            <q-icon name />
          </template>
        </q-select>
        <!-- Sprint Time -->
        <q-input
          outlined
          v-model.trim="form.spirintTime"
          :label="$t('PleaseEnterSpirintTime')"
          class="inputStyle"
        >
          <template v-slot:prepend>
            <q-icon name />
          </template>
        </q-input>
        <!-- linkdin Url -->
        <q-input
          outlined
          v-model.trim="form.linkdin"
          :label="$t('PleaseEnterlinkdin')"
          class="inputStyle"
        >
          <template v-slot:prepend>
            <q-icon name="fab fa-linkedin-in" />
          </template>
        </q-input>
        <!-- github  -->
        <q-input
          outlined
          v-model.trim="form.git"
          :label="$t('PleaseEnterGithubGitlab')"
          class="inputStyle"
        >
          <template v-slot:prepend>
            <q-icon name="fab fa-gitlab" />
            <q-icon name="fab fa-github pl8" />
          </template>
        </q-input>
      </div>
      <div class="saveInfo">
        <q-btn color="primary" type="submit">{{ $t('save') }}</q-btn>
      </div>
    </q-form>
  </div>
</template>
<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';
// import { normalizeEmail } from 'normalize-email';
import { VueTelInput } from 'vue-tel-input';
import mobilePhone from '../structure/mobilePhone.vue';

const normalizeEmail = require('normalize-email');

export default {
  name: 'profileEditForm',
  components: {
    VueTelInput,
    mobilePhone,
  },
  data() {
    return {
      // data for validation
      uiState: 'submit not clicked',
      errors: false,
      empty: true,
      // data for validation
      countries: ['amrica', 'germany', 'iran', 'hind', 'japan', 'china'],
      cities: ['Finland', 'Canada', 'Berlin', 'Tehran', 'tokyo'],
      roles: ['staff', 'client', 'Admin', 'ProductManager', 'billing'],
      states: ['state1', 'state2'],
      personality: ['jurdical', 'natural'],
      genderList: [this.$t('man'), this.$t('woman')],
      tags: ['tag1', 'tag2'],
      MobileNumber: '',
      isPwd: true,
      isPwd1: true,
      form: {
        email: '',
        FirstName: '',
        LastName: '',
        Gender: '',
        currentPass: '',
        PassWord: '',
        Confirmpass: '',
        nationalId: '',
        landLine: '',
        country: '',
        city: '',
        adress: '',
        role: '',
        gender: '',
        tag: '',
        postalCode: '',
        spirintTime: '',
        linkdin: '',
        git: '',
      },
      enableConfirm: false,
    };
  },
  validations: {
    form: {
      nationalId: {
        required,
        // minLength: minLength(10),
        // national id check
        isValidIranianNationalCode(input) {
          if (!/^\d{10}$/.test(input)) return false;

          const check = +input[9];
          const sum =
            Array(9)
              .fill()
              .map((_, i) => +input[i] * (10 - i))
              .reduce((x, y) => x + y) % 11;
          return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11);
        },
      },
      postalCode: {
        required,
        minLength: minLength(10),
      },
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
      // console.log('edit profile');
      this.empty = !this.$v.form.$anyDirty;
      this.errors = this.$v.form.$anyError;
      this.uiState = 'submit clicked';
      if (this.errors === false && this.empty === false) {
        // this is where you send the responses
        this.uiState = 'form submitted';
        normalizeEmail(this.form.email);
        console.log(normalizeEmail(this.form.email));
        this.$router.push({
          path: `/${this.$route.params.locale}/userManagement`,
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
  },
};
</script>

<style lang="scss">
.mb20 {
  margin-bottom: 20px;
}

.maskInputStyles {
  input {
    text-align: center;
  }
}
.pt20 {
  padding-top: 20px;
}
.pl8 {
  padding-left: 8px;
}
.saveInfo {
  margin: auto;
  display: block;
  clear: both;
  width: 100%;
  button {
    width: 100px;
    margin: auto;
    display: block;
  }
}
</style>

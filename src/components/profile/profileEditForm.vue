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
          v-model="form.FirstName"
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
          v-model="form.LastName"
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
          v-model="form.email"
          @blur="$v.form.email.$touch"
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
          :placeholder="$t('pleaseEnterYourMobilephoneNumber')"
        ></vue-tel-input>
        <!-- Gender -->
        <q-select
          color="light-blue-10"
          outlined
          v-model="form.gender"
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
          v-model="form.newPassWord"
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
        </q-input>
        <!-- Re enter password -->
        <q-input
          outlined
          required
          class="inputFieldText passwordField"
          color="light-blue-10"
          :label="$t('ReEnterYourPassword')"
          v-model="form.Confirmpass"
          :type="isPwd ? 'password' : 'text'"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type something']"
          :disable="!this.enableConfirm"
        >
          <template v-slot:prepend>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer visibilityPass"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <div class="col2">
        <!-- Phone Number -->
        <vue-tel-input
          required
          v-model="form.landLine"
          class="generalInputStyles"
          :placeholder="$t('pleaseEnterYourPhoneNumber')"
        ></vue-tel-input>
        <!-- NationalId -->
        <q-input
          outlined
          v-model="form.nationalId"
          :label="$t('PleaseEnterNationalId')"
          class="inputStyle pt20"
        >
          <template v-slot:prepend>
            <q-icon name />
          </template>
        </q-input>
        <!-- Country -->
        <q-select
          color="light-blue-10"
          outlined
          v-model="form.country"
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
          v-model="form.city"
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
          v-model="form.postalCode"
          :label="$t('PleaseEnterPostalCode')"
          class="inputStyle pt20"
        >
          <template v-slot:prepend>
            <q-icon name />
          </template>
        </q-input>
        <!-- Role -->
        <q-select
          color="light-blue-10"
          outlined
          v-model="form.role"
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
          v-model="form.status"
          :options="states"
          :label="$t('status')"
          class="inputStyle"
        >
          <template v-slot:append>
            <q-icon name />
          </template>
        </q-select>
      </div>
      <div class="col3">
        <!-- tags -->
        <q-select
          color="light-blue-10"
          outlined
          v-model="form.tag"
          :options="tags"
          :label="$t('Tag')"
          class="inputStyle"
        >
          <template v-slot:append>
            <q-icon name />
          </template>
        </q-select>
        <!-- personality -->
        <q-select
          color="light-blue-10"
          outlined
          v-model="form.personality"
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
          v-model="form.spirintTime"
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
          v-model="form.linkdin"
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
          v-model="form.git"
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
import { required, email, minLength } from 'vuelidate/lib/validators';
import { VueTelInput } from 'vue-tel-input';

export default {
  name: 'profileEditForm',
  components: {
    VueTelInput,
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
      roles: ['staff', 'client', 'Admin', 'ProductManager', 'Billing'],
      states: ['state1', 'state2'],
      personality: ['jurdical', 'natural'],
      genderList: [this.$t('man'), this.$t('woman')],
      tags: ['tag1', 'tag2'],
      MobileNumber: '',
      isPwd: true,
      form: {
        email: '',
        FirstName: '',
        LastName: '',
        Gender: '',
        currentPass: '',
        newPassWord: '',
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
        this.$router.push({
          path: `/${this.$route.params.locale}/profile`,
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

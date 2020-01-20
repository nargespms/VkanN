<template>
  <div class="registerWrapperCmp">
    <q-form v-if="enableRegister" @submit="onSubmit" class="q-gutter-md RegisterForm">
      <!-- user name -->
      <q-input
        outlined
        required
        class="inputFieldText"
        color="light-blue-10"
        v-model.trim.lazy="$v.form.FirstName.$model"
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
          <span v-if="!$v.form.FirstName.required">*{{ $t('thisfieldisrequired') }}.</span>
          <span v-if="!$v.form.FirstName.minLength">
            {{
            $t('Fieldmusthaveatleast3characters')
            }}
          </span>
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
        <p v-if="errors" class="error">
          <span v-if="!$v.form.LastName.required">*{{ $t('thisfieldisrequired') }}.</span>
        </p>
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
        debounce="1500"
      >
        <template v-slot:prepend>
          <q-icon name="email" class="mailIcon" />
        </template>
        <template v-if="this.form.email.length > 0" v-slot:append>
          <q-icon
            v-if="verifyEmail && $v.form.email.email"
            name="fas fa-check"
            class="mailIcon text-positive"
          />
          <q-icon
            v-if="!verifyEmail && $v.form.email.email"
            name="fas fa-times"
            class="mailIcon text-negative"
          />
          <span
            v-if="!verifyEmail && $v.form.email.email"
            class="text-negative fn11"
          >{{ $t('enteredEmailisRegistered') }}</span>
        </template>
        <!-- email errors -->
        <p v-if="errors" class="error">
          <span v-if="!$v.form.email.required">*{{ $t('thisfieldisrequired') }}.</span>
          <span v-if="!$v.form.email.email">* {{ $t('Needstobeavalidemail') }}.</span>
          <span
            v-if="!$v.form.email.isUnique && !$v.form.email.email"
          >*{{ $t('Thisemailisalreadyregistered') }}.</span>
        </p>
        <!-- email errors -->
      </q-input>
      <!-- Phone Number -->
      <mobilePhoneWrapper />
      <!-- Gender -->
      <div class="genderRegister">
        <label>{{ $t('gender') }}:</label>
        <q-radio class="genderOpt" v-model="form.Gender" val="FEMALE">
          {{
          $t('female')
          }}
        </q-radio>
        <q-radio class="genderOpt" v-model="form.Gender" val="MALE">
          {{
          $t('male')
          }}
        </q-radio>
        <q-radio class="genderOpt" v-model="form.Gender" val="OTHER">
          {{
          $t('OTHER')
          }}
        </q-radio>
        <p v-if="errors" class="error float">
          <span v-if="!$v.form.Gender.required">*{{ $t('thisfieldisrequired') }}.</span>
        </p>
      </div>
      <!-- password -->
      <q-input
        outlined
        required
        class="inputFieldText passwordField"
        color="light-blue-10"
        :label="$t('EnterYourPassword')"
        v-model.trim="$v.form.PassWord.$model"
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
          <span v-if="!$v.form.PassWord.required">*{{ $t('thisfieldisrequired') }}.</span>
        </p>
      </q-input>
      <p class="error" v-if="errors">
        <span v-if="!$v.form.PassWord.strongPassword">
          {{
          $t('Strongpasswords')
          }}
        </span>
      </p>
      <!-- Re enter password -->
      <q-input
        outlined
        required
        :disable="!this.enableConfirm"
        class="inputFieldText passwordField"
        color="light-blue-10"
        :label="$t('ReEnterYourPassword')"
        v-model.trim="$v.form.Confirmpass.$model"
        :type="isPwd1 ? 'password' : 'text'"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      >
        <template v-slot:prepend>
          <q-icon
            :name="isPwd1 ? 'visibility_off' : 'visibility'"
            class="cursor-pointer visibilityPass"
            @click="isPwd1 = !isPwd1"
          />
        </template>
        <!-- errors for pass2 -->
        <p v-if="errors" class="error">
          <span v-if="!$v.form.Confirmpass.required">{{$t('thisfieldisrequired')}}.</span>
          <span
            v-if="!$v.form.Confirmpass.sameAsPassword && $v.form.Confirmpass.required"
          >{{$t('Thepasswordsdonotmatch')}}.</span>
        </p>
        <!-- errors for pass2 -->
      </q-input>
      <!-- adding captcha -->
      <captcha @captchaValid="captchaValid" :key="componentKey" />
      <q-btn color="primary" @click.prevent="onSubmit">
        {{
        $t('submit')
        }}
      </q-btn>
    </q-form>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';
import mobilePhoneWrapper from '../structure/mobilePhoneWrapper.vue';
// import { Cookies } from 'quasar';
import captcha from '../structure/captcha.vue';

export default {
  components: {
    mobilePhoneWrapper,
    captcha,
  },
  data() {
    return {
      componentKey: 0,
      verifyEmail: false,
      captchaObj: {},
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
      //  for captcha checking
      captcha: false,
    };
  },
  validations: {
    form: {
      Gender: { required },
      email: {
        required,
        email,
        isUnique(value) {
          if (this.$v.form.email.email && this.$v.form.email.required) {
            this.$axios
              .post('/v1/api/vkann/validation/email', {
                email: value,
                existed: false,
              })
              .then(response => {
                console.log(response);
                if (response.status === 204) {
                  console.log('lll');
                  this.verifyEmail = true;
                }
              })
              .catch(() => {
                this.verifyEmail = false;

                this.$q.notify({
                  color: 'negative',
                  position: 'top',
                  message: this.$t('enteredEmailisRegistered'),
                  icon: 'report_problem',
                });
              });
          }
          return true;
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
    captchaValid(value) {
      this.captcha = true;
      this.captchaObj = value;
    },
    onSubmit() {
      this.empty = !this.$v.form.$anyDirty;
      this.errors = this.$v.form.$anyError;
      this.uiState = 'submit clicked';
      if (this.errors === false && this.empty === false) {
        if (this.captcha === false) {
          this.$q.notify({
            message: this.$t('incorrectcaptcha'),
            color: 'negative',
            icon: 'warning',
            position: 'top',
          });
        } else {
          // this is where you send the responses
          this.uiState = 'form submitted';
          // should send data to server
          // req to server
          if (this.verifyEmail) {
            this.$axios
              .post('/v1/api/vkann/register', {
                captcha: this.captchaObj,
                firstName: this.form.FirstName,
                lastName: this.form.LastName,
                password: this.form.PassWord,
                gender: this.form.Gender,
                mobile: this.MobileNumber,
                email: this.form.email,
              })
              .then(Response => {
                if (Response.status === 200) {
                  console.log(Response);
                  this.showNotif('top-right');
                } else if (Response.status === 400) {
                  this.$q.notify({
                    message: this.$t('user exist'),
                    color: 'negative',
                    icon: 'warning',
                    position: 'top',
                  });
                  console.log('noch noch noch');
                }
              })
              .catch(() => {
                this.$q.notify({
                  color: 'negative',
                  position: 'top',
                  message: this.$t('error'),
                  icon: 'report_problem',
                });
                this.componentKey += 1;
              });
          } else {
            this.componentKey += 1;

            this.$q.notify({
              message: this.$t('correctTheErorrs'),
              color: 'negative',
              icon: 'warning',
              position: 'top',
            });
          }

          // req to server
        }
      } else if (this.empty === true) {
        this.$q.notify({
          message: this.$t('emptyForm'),
          color: 'negative',
          icon: 'warning',
          position: 'top',
        });
      } else {
        this.componentKey += 1;

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
    showNotif(position) {
      this.$q.notify({
        color: 'dark',
        icon: 'verified_user',
        message: `Welcome ${this.form.FirstName}!`,
        position,
        timeout: Math.random() * 5000 + 3000,
      });
      this.$router.push({ path: `/${this.$route.params.locale}/dashboard` });
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

<template>
  <div class="editProfileWrap col3th">
    <q-form @submit="onSubmit" class="q-gutter-md RegisterForm">
      <div class="col1">
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
            <span v-if="!$v.form.FirstName.required">*{{ $t('thisfieldisrequired') }}.</span>
            <span v-if="!$v.form.FirstName.minLength">
              {{
              $t('Fieldmusthaveatleast3characters')
              }}
            </span>
          </p>
        </q-input>
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
        <q-input
          outlined
          required
          :label="$t('email')"
          v-model.trim="form.email"
          @input="$v.form.email.$touch"
          @keyup.enter="submit"
          :error="$v.form.email.$error"
          debounce="11000"
        >
          <template v-slot:prepend>
            <q-icon name="email" class="mailIcon" />
          </template>
          <template v-if="this.form.email.length > 0" v-slot:append>
            <q-icon v-if="verifyEmail" name="fas fa-check" class="mailIcon text-positive" />
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
        </q-input>
        <mobilePhoneWrapper
          v-if="this.profileMode === 'ADD' || !this.mobileLoading"
          @mobileVerified="mobileVerified"
          :existed="this.profileMode === 'ADD' ? false : true"
          :data="this.profileMode === 'Edit' ? mobileData : ''"
          :mode="this.profileMode"
        />

        <q-select
          color="light-blue-10"
          outlined
          v-model.trim="form.gender"
          :options="genderList"
          :label="$t('Gender')"
          class="inputStyle"
        >
          <template v-slot:append>
            <q-icon name />
          </template>
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
              <q-item-section>
                <q-item-label>{{ $t(scope.opt) }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:selected-item="scope">{{ $t(scope.opt) }}</template>
        </q-select>

        <q-input
          outlined
          required
          class="inputFieldText passwordField"
          color="light-blue-10"
          :label="$t('EnterYourPassword')"
          v-model.trim="form.PassWord"
          :type="isPwd ? 'password' : 'text'"
          lazy-rules
          :rules="[val => (val && val.length > 0) ]"
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
        <q-input
          outlined
          required
          class="inputFieldText passwordField"
          color="light-blue-10"
          :label="$t('ReEnterYourPassword')"
          v-model.trim="form.Confirmpass"
          :type="isPwd1 ? 'password' : 'text'"
          lazy-rules
          :rules="[val => (val && val.length > 0) ]"
          :disable="!this.enableConfirm"
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
            <span v-if="!$v.form.Confirmpass.sameAsPassword">{{ $t('Thepasswordsdonotmatch') }}.</span>
          </p>
        </q-input>
      </div>
      <div class="col2">
        <q-input
          outlined
          required
          v-model.trim="form.nationalId"
          :label="$t('PleaseEnterNationalId')"
          class="inputStyle"
          :error="$v.form.nationalId.$error"
          mask="##########"
          @input="$v.form.nationalId.$touch"
          debounce="11000"
        >
          <template v-if="this.form.nationalId.length > 0" v-slot:append>
            <q-icon
              v-if="nationalID && $v.form.nationalId.isValidIranianNationalCode"
              name="fas fa-check"
              class="mailIcon text-positive"
            />
            <q-icon
              v-if="
                !nationalID && $v.form.nationalId.isValidIranianNationalCode
              "
              name="fas fa-times"
              class="mailIcon text-negative"
            />
          </template>
          <p v-if="errors" class="error">
            <span v-if="!$v.form.nationalId.required">*{{ $t('thisfieldisrequired') }}.</span>
            <!-- <span v-if="!$v.form.nationalId.minLength">*{{$t('Fieldmusthaveatleast10characters')}}.</span> -->
            <span
              v-if="
                !$v.form.nationalId.isValidIranianNationalCode &&
                  $v.form.nationalId.required
              "
            >*{{ $t('invalidCode') }}.</span>
          </p>
        </q-input>

        <q-input
          color="light-blue-10"
          outlined
          v-model.trim="form.city"
          :label="$t('city')"
          class="inputStyle"
        >
          <template v-slot:append>
            <q-icon name />
          </template>
        </q-input>

        <q-input outlined required :label="$t('address')" v-model="form.address">
          <template v-slot:prepend>
            <q-icon name="my_location" />
          </template>
        </q-input>

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
            <span v-if="!$v.form.postalCode.required">*{{ $t('thisfieldisrequired') }}.</span>
            <span
              v-if="!$v.form.postalCode.minLength"
            >*{{ $t('Fieldmusthaveatleast10characters') }}.</span>
          </p>
        </q-input>

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
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
              <q-item-section>
                <q-item-label>{{ $t(scope.opt) }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>

          <template v-slot:selected-item="scope">{{ $t(scope.opt) }}</template>
        </q-select>
        <!-- if role user was staff we should choose departman -->

        <q-select
          v-if="form.role.length > 0 && form.role !== 'CLIENT' "
          outlined
          :label="$t('departman')"
          v-model.trim="form.departman"
          :options="departmans"
          class="inputStyle"
          required
          :disable="!departmentAllow"
        >
          <template v-slot:prepend>
            <q-icon name="far fa-building" />
          </template>
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
              <q-item-section>
                <q-item-label>{{ $t(scope.opt) }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:selected-item="scope">{{ $t(scope.opt) }}</template>
        </q-select>

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
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
              <q-item-section>
                <q-item-label>{{ $t(scope.opt) }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:selected-item="scope">{{ $t(scope.opt) }}</template>
        </q-select>

        <tagsSelection :editData="profileMode === 'Edit' ? tagEdit : ''" @addTagFn="addTagFn" />

        <q-select
          color="light-blue-10"
          outlined
          v-model.trim="form.personality"
          :options="personality"
          :label="$t('personality')"
          class="inputStyle pt20"
        >
          <template v-slot:append>
            <q-icon name />
          </template>
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
              <q-item-section>
                <q-item-label>{{ $t(scope.opt) }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>

          <template v-slot:selected-item="scope">{{ $t(scope.opt) }}</template>
        </q-select>
      </div>
      <div class="col3">
        <q-input
          outlined
          v-model.trim="form.tel"
          :label="$t('PleaseEnterLandLine')"
          class="inputStyle"
          mask="############"
        >
          <template v-slot:prepend>
            <q-icon name />
          </template>
        </q-input>

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
import mobilePhoneWrapper from '../structure/mobilePhoneWrapper.vue';
import tagsSelection from '../structure/tagsSelection.vue';

const normalizeEmail = require('normalize-email');

export default {
  name: 'profileEditForm',
  components: {
    mobilePhoneWrapper,
    tagsSelection,
  },
  props: ['profileMode'],

  data() {
    return {
      errors: false,
      empty: true,
      departmans: ['INFO', 'TECH', 'BILLING'],
      roles: ['CLIENT', 'MEMBER', 'ASSISTANT', 'MANAGER'],
      states: ['ACTIVE', 'DEACTIVE', 'BAN'],
      personality: ['JURDICAL', 'NATURAL'],
      genderList: ['MALE', 'FEMALE', 'OTHER'],
      isPwd: true,
      isPwd1: true,
      editFormProfile: {},
      userId: '',
      form: {
        FirstName: '',
        LastName: '',
        gender: '',
        personality: '',
        email: '',
        country: '',
        MobileNumber: '',
        currentPass: '',
        PassWord: '',
        Confirmpass: '',
        nationalId: '',
        tel: '',
        status: '',
        city: '',
        address: '',
        role: '',
        departman: '',
        tags: [],
        postalCode: '',
        spirintTime: 0,
        linkdin: '',
        git: '',
      },
      enableConfirm: false,
      nationalID: false,
      verifyEmail: false,
      mobileData: {},
      mobileLoading: true,
      tagEdit: '',
    };
  },
  validations: {
    form: {
      nationalId: {
        required,
        // minLength: minLength(10),
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
        isUnique() {
          if (this.form.nationalId.length > 0) {
            if (this.$v.form.nationalId.isValidIranianNationalCode) {
              this.$axios
                .post('/v1/api/vkann/validation/national-id', {
                  nationalId: this.form.nationalId,
                  ...(this.profileMode === 'ADD' ? '' : { id: this.userId }),
                })
                .then(response => {
                  if (response.status === 204) {
                    this.nationalID = true;
                  }
                })
                .catch(() => {
                  this.nationalID = false;
                  this.$q.notify({
                    color: 'negative',
                    position: 'top',
                    message: this.$t('incorrectnationalID'),
                    icon: 'report_problem',
                  });
                });
            }
          }
          return true;
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
          if (this.$v.form.email.email) {
            this.$axios
              .post('/v1/api/vkann/validation/email', {
                email: value,
                ...(this.profileMode === 'ADD'
                  ? { existed: false }
                  : { existed: false, id: this.userId }),
              })
              .then(response => {
                if (response.status === 204) {
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
    verifyId() {
      this.$axios
        .post('/v1/api/vkann/validation/national-id', {
          nationalId: this.form.nationalId,
        })
        .then(response => {
          console.log(response);
          this.nationalID = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    addTagFn(value) {
      this.form.tags = value.map(v => v.id);
    },

    onSubmit() {
      if (this.profileMode === 'ADD') {
        this.empty = !this.$v.form.$anyDirty;
        this.errors = this.$v.form.$anyError;
        this.uiState = 'submit clicked';

        if (this.errors === false && this.empty === false) {
          normalizeEmail(this.form.email);
          console.log(normalizeEmail(this.form.email));

          // should emit to parent
          //  (beacause it is used in 2 place (profile & add user))
          if (this.nationalID && this.verifyEmail) {
            this.$emit('sendDataUser', this.form);
            console.log(this.form);
          }
        } else {
          this.$q.notify({
            message: this.$t('Theformabovehaserrors'),
            color: 'negative',
            icon: 'warning',
            position: 'top',
          });
        }
      }
      if (this.profileMode === 'Edit') {
        this.empty = !this.$v.form.$anyDirty;
        this.errors = this.$v.form.$anyError;

        this.uiState = 'submit clicked';

        if (this.errors === false && this.empty === false) {
          this.uiState = 'form submitted';
          normalizeEmail(this.form.email);
          console.log(normalizeEmail(this.form.email));
          //  (beacause it is used in 2 place (profile & add user))
          if (this.nationalID && this.verifyEmail) {
            this.$emit('editDataUser', this.form);
          }
        } else {
          this.$q.notify({
            message: this.$t('Theformabovehaserrors'),
            color: 'negative',
            icon: 'warning',
            position: 'top',
          });
        }
      }
    },
    EnableConf() {
      this.enableConfirm = true;
    },
    mobileVerified(value, con) {
      this.form.country = con;
      this.form.MobileNumber = value;
    },
  },
  computed: {
    departmentAllow() {
      return this.$store.state.module1.userData.user.role === 'MANAGER';
    },
  },
  mounted() {
    if (
      this.profileMode === 'Edit' &&
      this.$route.path
        .split('/')
        .slice(2, 3)
        .toString() === 'profile'
    ) {
      this.$axios.get('/v1/api/vkann/profile').then(response => {
        if (response.status === 200) {
          this.userId = response.data.user.id;
          this.form.FirstName = response.data.user.firstName;
          this.form.LastName = response.data.user.lastName;
          this.form.email = response.data.user.email;
          this.form.country = response.data.user.country;
          this.form.MobileNumber = response.data.user.mobile;
          this.form.tel = response.data.user.tel;
          this.form.gender = response.data.user.gender;
          this.form.role = response.data.user.role;
          this.form.city = response.data.user.city;
          this.form.address = response.data.user.address;
          this.form.postalCode = response.data.user.zipCode;
          this.form.git = response.data.user.git;
          this.form.linkdin = response.data.user.linkedin;

          this.form.nationalId = response.data.user.nationalId;
          this.form.departman = response.data.user.department;
          this.form.status = response.data.user.status;
          this.form.personality = response.data.user.personality;
          this.nationalID = true;
          this.verifyEmail = true;
          this.mobileData.con = response.data.user.country;
          this.mobileData.mobile = response.data.user.mobile;
          this.mobileLoading = false;

          if (response.data.user.tags.length > 0) {
            // for tags
            const serverItems = response.data.user.tags.map(item => ({
              // eslint-disable-next-line no-underscore-dangle
              id: item._id,
              title: item.title,
            }));
            this.tagEdit = serverItems;
            this.form.tags = serverItems.map(item => {
              // eslint-disable-next-line no-underscore-dangle
              return item.id;
            });
          }
          this.$v.$touch();
        }
      });
    } else if (
      this.profileMode === 'Edit' &&
      this.$route.path
        .split('/')
        .slice(2, 3)
        .toString() !== 'profile'
    ) {
      this.$axios
        .get(`/v1/api/vkann/users/${this.$route.params.userId}`)
        .then(response => {
          if (response.status === 200) {
            this.userId = response.data.user.id;
            this.form.FirstName = response.data.user.firstName;
            this.form.LastName = response.data.user.lastName;
            this.form.email = response.data.user.email;
            this.form.country = response.data.user.country;
            this.form.city = response.data.user.city;
            this.form.address = response.data.user.address;
            this.form.postalCode = response.data.user.zipCode;
            this.form.departman = response.data.user.department;
            this.form.status = response.data.user.status;
            this.form.git = response.data.user.git;
            this.form.linkdin = response.data.user.linkedin;

            this.form.MobileNumber = response.data.user.mobile;
            this.form.tel = response.data.user.tel;
            this.form.gender = response.data.user.gender;
            this.form.role = response.data.user.role;
            this.form.nationalId = response.data.user.nationalId;
            this.form.personality = response.data.user.personality;
            this.nationalID = true;
            this.verifyEmail = true;
            this.mobileData.con = response.data.user.country;
            this.mobileData.mobile = response.data.user.mobile;
            this.mobileLoading = false;
            if (response.data.user.tags.length > 1) {
              // for tags
              const serverItems = response.data.user.tags.map(item => ({
                // eslint-disable-next-line no-underscore-dangle
                id: item._id,
                title: item.title,
              }));
              this.tagEdit = serverItems;
              this.form.tags = serverItems.map(item => {
                // eslint-disable-next-line no-underscore-dangle
                return item.id;
              });
            }
            this.$v.$touch();
          }
        })
        .catch(e => {
          console.log(e.response.status);
        });
    }
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

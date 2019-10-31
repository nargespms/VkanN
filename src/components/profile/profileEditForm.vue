<template>
    <div class="editProfileWrap">
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
                    :rules="[ val => val && val.length > 0 ]"
                >
                    <template v-slot:prepend>
                    <q-icon name="fas fa-user" />
                    </template>
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
                <!-- current password -->
                <q-input
                    outlined
                    required
                    class="inputFieldText passwordField"
                    color="light-blue-10"
                    :label="$t('EnterYourPassword')"
                    v-model="form.currentPass"
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
            </div>
            <q-btn color="primary" type="submit">{{$t('submit')}}</q-btn>
        </q-form>
    </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { VueTelInput } from 'vue-tel-input';

export default {
  name: 'profileEditForm',
  components: {
    VueTelInput,
  },
  data() {
    return {
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
      console.log('edit profile');
    },
  },
};
</script>

<style lang="scss">
.editProfileWrap {
  overflow: auto;
  .col1 {
    float: left;
    width: 50%;
  }
}
</style>

<template >
  <div class="captchaWrap">
    <div class="captcha">
      <div class="captchaImg">
        <img class :src="this.capImg" />
      </div>
      <div class="captchaEnter">
        <q-input
          outlined
          required
          class="inputFieldText"
          color="light-blue-10"
          v-model.trim="captcha"
          lazy-rules
          @input="$v.captcha.$touch"
          :error="$v.captcha.$error"
          @blur="validate"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
        </q-input>
        <p class="error" v-if="errors">
          <span v-if="!$v.captcha.isUnique">{{$t('incorrectcaptcha')}}.</span>
        </p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'captcha',
  data() {
    return {
      // data for validation
      errors: false,
      empty: true,
      // end of data for validation
      capImg: '',
      captcha: '',
    };
  },
  validations: {
    captcha: {
      isUnique(value) {
        // standalone validator ideally should not assume a field is required
        if (value === '') return false;

        // simulate async call, fail for all logins with even length
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(typeof value === 'string' && value === 'captcha');
          }, 350 + Math.random() * 300);
        });
      },
    },
  },
  methods: {
    validate() {
      this.empty = !this.$v.captcha.$anyDirty;
      this.errors = this.$v.captcha.$anyError;
      console.log(this.errors);
      if (this.errors === false && this.empty === false) {
        console.log('correct');
        console.log(this.errors);
        this.$emit('captchaValid', true);
      } else {
        this.$q.notify({
          message: this.$t('incorrectcaptcha'),
          color: 'negative',
          icon: 'warning',
          position: 'top',
        });
      }
    },
  },
  mounted() {
    this.$axios
      .get(
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAjYCtB2w7osT7x3iaZg9Vq2PzufZ2JQqeztYNjQnY8mJoTk-7&s'
      )
      .then(response => {
        this.capImg = response.config.url;
        console.log(this.capImg);
      });
  },
};
</script>


<style lang="scss">
.captchaImg {
  width: 40%;
  margin: auto;
  img {
    width: 100%;
    height: 80px;
  }
}
.captchaEnter {
  width: 40%;
  margin: auto;
}
</style>

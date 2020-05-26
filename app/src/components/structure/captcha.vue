<template>
  <div class="captchaWrap">
    <div class="captcha">
      <div class="captchaImg">
        <div class="captchaImgWrap" v-html="capImg"></div>
        <q-icon class="getNewCaptcha" name="fas fa-undo" @click="getNewCaptcha">
          <q-tooltip
            v-model="showing1"
            transition-show="scale"
            transition-hide="scale"
          >{{ $t('getNewCaptcha') }}</q-tooltip>
        </q-icon>
      </div>
      <div class="captchaEnter">
        <q-input
          outlined
          required
          class="inputFieldText"
          color="light-blue-10"
          v-model.trim="captcha.value"
          @input="validate"
          debounce="3000"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
        </q-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'captcha',
  data() {
    return {
      showing1: false,
      capImg: '',
      captcha: {
        token: '',
        value: '',
      },
    };
  },

  methods: {
    validate() {
      this.$axios
        .post('/v1/api/vkann/captcha', {
          token: this.captcha.token,
          value: this.captcha.value,
        })
        .then(response => {
          console.log(response);
          if (response.status === 204) {
            console.log('hello');
            this.$emit('captchaValid', this.captcha);
          } else if (response.status === 403) {
            this.$q.notify({
              message: this.$t('incorrectcaptcha'),
              color: 'negative',
              icon: 'warning',
              position: 'top',
            });
          }
        });
      // this.empty = !this.$v.captcha.$anyDirty;
      // this.errors = this.$v.captcha.$anyError;
      // console.log(this.errors);
      // if (this.errors === false && this.empty === false) {
      //   console.log('correct');
      //   // console.log(this.errors);
      //   this.$emit('captchaValid', true);
      // } else {
      //   this.$q.notify({
      //     message: this.$t('incorrectcaptcha'),
      //     color: 'negative',
      //     icon: 'warning',
      //     position: 'top',
      //   });
      // }
    },
    getNewCaptcha() {
      this.$axios.get('/v1/api/vkann/captcha').then(response => {
        this.capImg = response.data.svg;
        this.captcha.token = response.data.token;
      });
    },
  },
  mounted() {
    this.$axios.get('/v1/api/vkann/captcha').then(response => {
      this.capImg = response.data.svg;
      this.captcha.token = response.data.token;
    });
  },
};
</script>

<style lang="scss">
.captchaImg {
  width: 45%;
  margin: auto;
  position: relative;

  img {
    width: 100%;
    height: 80px;
  }
}
.captchaEnter {
  width: 45%;
  margin: auto;
}

.getNewCaptcha {
  position: absolute;
  bottom: 35px;
  right: 9px;
  font-size: 19px;
  color: palevioletred;
  cursor: pointer;
}
.captchaImgWrap {
  svg {
    width: 100%;
  }
}
</style>

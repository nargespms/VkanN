<template>
  <div>
    <!-- contries -->
    <q-select
      outlined
      :options="options"
      option-value="code"
      option-label="name"
      map-options
      emit-value
      use-input
      @filter="filterFn"
      v-model="con"
      :label="$t('country')"
      lazy-rules
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">No results</q-item-section>
        </q-item>
      </template>
    </q-select>
    <!-- contries -->
    <!-- enter mobile phone number -->
    <q-input
      outlined
      required
      v-model.trim="number"
      :label="$t('pleaseEnterYourMobilephoneNumber')"
      lazy-rules
      :rules="[val => val && val.length > 0]"
      @input="$v.number.$touch"
      :error="$v.number.$error"
      mask="############"
      :disable="!this.con"
      debounce="1000"
      @blur="formatter"
      class="pt20"
    >
      <template v-slot:prepend>
        <q-icon name="fas fa-phone" />
      </template>
      <!-- check for async validation -->
      <template v-if="this.number.length > 0" v-slot:append>
        <q-icon
          v-if="verifyMobile"
          name="fas fa-check"
          class="mailIcon text-positive"
        />
        <q-icon
          v-if="!verifyMobile"
          name="fas fa-times"
          class="mailIcon text-negative"
        />
        <p class="error" v-if="wrongNumber">
          <span class="fn11">{{ $t('wrongnumber') }}</span>
        </p>
      </template>

      <!-- check for async validation -->
      <p v-if="errors" class="error">
        <span class="fn11" v-if="!$v.number.minLength"
          >*{{ $t('Fieldmusthaveatleast10characters') }}.</span
        >
      </p>
    </q-input>
    <!-- enter mobile phone number -->
  </div>
</template>

<script>
import { minLength } from 'vuelidate/lib/validators';

// Require `PhoneNumberFormat`.
const PNF = require('google-libphonenumber').PhoneNumberFormat;
// Get an instance of `PhoneNumberUtil`.
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

export default {
  props: ['data', 'existed', 'editData'],
  data() {
    return {
      // data for validation
      uiState: 'submit not clicked',
      errors: false,
      empty: true,
      // data for validation
      options: Object.freeze(this.data),
      filterOption: '',
      number: '',
      con: '',
      verifyMobile: false,
      wrongNumber: false,
    };
  },
  validations: {
    number: {
      minLength: minLength(10),
    },
  },

  methods: {
    filterFn(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        this.options = this.data.filter(
          v => v.name.toLowerCase().indexOf(needle) > -1
        );
      });
    },

    formatter() {
      this.empty = !this.$v.number.$anyDirty;
      this.errors = this.$v.number.$anyError;
      this.uiState = 'submit clicked';
      if (this.errors === false && this.empty === false) {
        // ...........*************........................

        // const number = phoneUtil.parseAndKeepRawInput(this.num, this.con);
        const number = phoneUtil.parseAndKeepRawInput(this.number, this.con);
        // gets the conuntry code
        console.log(number.getCountryCode());
        // gets standard number
        console.log(phoneUtil.format(number, PNF.E164));
        // is it correct or not
        const completeNum = phoneUtil.format(number, PNF.E164);
        console.log(phoneUtil.isValidNumber(phoneUtil.parse(completeNum)));

        // ...........*************........................

        if (phoneUtil.isValidNumber(phoneUtil.parse(completeNum))) {
          // async validation

          this.$axios
            .post('/v1/api/vkann/validation/mobile', {
              mobile: completeNum,
              existed: this.existed,
            })
            .then(response => {
              console.log(response);
              if (response.status === 204) {
                this.verifyMobile = true;
                console.log(this.verifyMobile);
              } else if (response.status === 404) {
                this.verifyMobile = false;
                console.log(this.verifyMobile);
              }
            })
            .catch(e => {
              console.log(e.response.status);
              console.log(this.verifyMobile);
            });
          this.verifyMobile = false;

          this.wrongNumber = false;
          console.log('miad inja');
          this.$emit('mobileVerified', completeNum, this.con);
          // async validation
        } else {
          this.wrongNumber = true;
          this.verifyMobile = false;
        }
      }
    },
  },
  mounted() {
    if (this.existed) {
      this.con = this.editData.con;
      this.number = this.editData.mobile;
      console.log(this.existed);
      console.log(this.editData);
      this.verifyMobile = true;
    } else {
      this.con = '';
      this.number = '';
    }
  },
};
</script>

<style lang="scss">
.q-menu .scroll {
  overflow: hidden !important;
}
.scroll {
  overflow: hidden !important;
}
</style>

<template >
  <div>
    <h4>type number</h4>
    <input type="text" v-model="num" @input="formatter()" />
    <input type="text" v-model="conuntry" @blur="formatter()" />
  </div>
</template>


<script>
// import { parsePhoneNumberFromString } from 'libphonenumber-js';

// Require `PhoneNumberFormat`.
const PNF = require('google-libphonenumber').PhoneNumberFormat;
// Get an instance of `PhoneNumberUtil`.
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

// Parse number with country code and keep raw input.

export default {
  data() {
    return {
      num: {},
      country: '',
    };
  },
  methods: {
    formatter() {
      const number = phoneUtil.parseAndKeepRawInput(this.num, this.country);
      console.log(number.getCountryCode());
      console.log(phoneUtil.format(number, PNF.E164));
    },
  },
};
</script>

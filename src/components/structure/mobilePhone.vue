<template >
  <div>
    <h4>type number</h4>
    <input type="text" v-model="formatter" @input="formatter()" />
  </div>
</template>


<script>
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export default {
  data() {
    return {};
  },
  methods: {
    formatter() {
      const phoneNumber = parsePhoneNumberFromString('+12133734253');

      phoneNumber.format('NATIONAL') === '(213) 373-4253';
      phoneNumber.format('INTERNATIONAL') === '+1 213 373 4253';
      phoneNumber.format('RFC3966') === 'tel:+12133734253';

      // Aliases
      phoneNumber.formatNational() === phoneNumber.format('NATIONAL');
      phoneNumber.formatInternational() === phoneNumber.format('INTERNATIONAL');
      phoneNumber.getURI() === phoneNumber.format('RFC3966');
    },
  },
};
</script>

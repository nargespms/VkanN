<template >
  <div class="contactUsWrapper">
    <p>{{$t('contactmsg')}}</p>
  </div>
</template>

<script>
export default {
  name: 'contactUs',
};
</script>

<style lang="scss">
.contactUsWrapper {
  float: right;
  width: 40%;
  @media screen and (max-width: 640px) {
    margin-top: 16px;
    width: 100%;
  }
  p {
    color: #fff;
    font-size: 16px;
    margin-bottom: 12px;
    // font-family: 'ShabnamBold';
  }
}
</style>

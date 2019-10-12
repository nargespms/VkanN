<template >
  <div class="aboutWrapper">
    <h5>
      {{$t('AboutHeader')}}
    </h5>
    <p>
      {{$t('aboutmsg')}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'aboutUs',

};
</script>

<style lang="scss">
  .aboutWrapper {
    width: 30%;
    line-height: 25px;
    float: left;
    h5 {
      color: #fff;
      font-size: 16px;
      margin-bottom: 12px;
      font-family: "ShabnamBold";
    }
  }
</style>

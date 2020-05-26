<template >
  <div class="copyRightWrapper">
    <div class="copyRightMsg">
      <p>
        {{$t('copyRightMsg')}}
      </p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'copyRight',
};
</script>


<style lang="scss">
.copyRightWrapper {
  overflow: auto;
  justify-content: space-around;
  display: flex;
  margin-top: 12px;
}
.copyRightMsg {
  border-top: 1px solid #605f5f;
  float: right;
  display: flex;
  justify-content: space-evenly;
  padding: 2px 24px;
}
</style>

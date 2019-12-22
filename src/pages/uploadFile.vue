<template >
  <div class="q-pa-xl">
    <div class="uploadFileWrapperPage">
      <uploadfile :UploadButton="true" :text="'uploadFile'" />
    </div>
  </div>
</template>

<script>
import uploadfile from '../components/structure/uploadfile.vue';

export default {
  name: 'uploadFile',
  components: {
    uploadfile,
  },
};
</script>
<style lang="scss">
.uploadFileWrapperPage {
  width: 50%;
  margin: 24px auto;
}
</style>

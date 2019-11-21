<template >
  <div class="fileUploadWrapper">
    <div class="fileUploadPlace">
      <div class="fileUploadPlaceInner">
        <q-icon name="fas fa-cloud-upload-alt" />
        <span>upload files</span>
      </div>
      <input type="file" name="filesToUpload" multiple id="upload_file" />
    </div>
    <input type="submit" @click="submit_btn" />
  </div>
</template>

<script>
import tus from '../../../node_modules/tus-js-client/dist/tus.js';

export default {
  methods: {
    submit_btn() {
      const [file] = document.querySelector('input[type=file]').files;
      if (file) {
        // get the extension from file
        const extensionArray = file.name.split('.').slice();
        const extension = file.name
          .split('.')
          .slice(extensionArray.length - 1)
          .toString();
        // console.log(extensionArray);
        // console.log(extension);
        // Create a new tus upload
        const upload = new tus.Upload(file, {
          endpoint: 'http://localhost:8083/files/',
          retryDelays: [0, 3000, 5000, 10000, 20000],
          metadata: {
            filename: file.name,
            filetype: file.type,
            extension,
          },
          onError(error) {
            console.log(`Failed because: ${error}`);
          },
          onProgress(bytesUploaded, bytesTotal) {
            const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
            console.log(bytesUploaded, bytesTotal, `${percentage}%`);
          },
          onSuccess() {
            console.log('Download %s from %s', upload.file.name, upload.url);
          },
        });

        // Start the upload
        upload.start();
      }
    },
  },
};
</script>

<style lang="scss">
.fileUploadWrapper {
  width: 300px;
  input[type='file'] {
    height: 100px;
    opacity: 0;
    width: 100%;
    cursor: pointer;
  }
}
.fileUploadPlace {
  background-color: #fff;
  border: 1px solid #cecece;
  position: relative;
  .fileUploadPlaceInner {
    color: #aeaeae;
    font-size: 20px;
    position: absolute;
    right: 30%;
    top: 40%;
    i {
      padding-right: 12px;
    }
  }
}
</style>

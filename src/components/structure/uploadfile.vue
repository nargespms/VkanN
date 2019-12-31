<template >
  <div class="clear">
    <div class="fileUploadWrapper">
      <div class="fileUploadPlace">
        <div class="fileUploadPlaceInner">
          <div v-if="!fileValue" class="emptyFile">
            <q-icon name="fas fa-cloud-upload-alt" />
            <span>Browse ....</span>
            <span>{{$t(this.text)}}</span>
          </div>
          <div v-if="fileValue" class="uploadedFile">
            <q-icon name="fas fa-file" />
            <!-- <span v-for="file in fileContent" :key="file.id">{{file.name}}</span> -->
          </div>
        </div>
        <input type="file" name="filesToUpload" multiple id="upload_file" @change="fileStatus" />
      </div>
    </div>
    <q-btn
      v-if="UploadButton"
      class="uploadBut"
      color="primary"
      type="submit"
      @click="submit_btn"
    >{{ $t('upload') }}</q-btn>
    <q-btn v-if="addMoreButton" class="uploadBut addMoreBut" color="primary" type="submit">
      <q-icon name="fas fa-plus" />
      {{ $t('addmore') }}
    </q-btn>
  </div>
</template>

<script>
import tus from '../../../node_modules/tus-js-client/dist/tus.js';

export default {
  props: ['UploadButton', 'text', 'addMoreButton'],
  data() {
    return {
      fileValue: false,
    };
  },
  // computed: {
  //   fileContent() {
  //     return document.querySelector('input[type=file]').files;
  //   },
  // },
  methods: {
    fileStatus() {
      this.fileValue = true;
      // this.fileContent = document.querySelector('input[type=file]').files;
      // console.log(this.fileContent[0]);
    },

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
        console.log(extension);
        // Create a new tus upload
        const upload = new tus.Upload(file, {
          endpoint: 'files/',
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
        console.log(upload);

        // Start the upload
        upload.start();
      }
    },
  },
};
</script>

<style lang="scss">
.fileUploadWrapper {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
    0 3px 1px -5px rgba(0, 0, 0, 0.12);
  width: 100%;
  background-color: #fff;
  border: 1px solid #cecece;
  input[type='file'] {
    height: 208px;
    opacity: 0;
    width: 100%;
    cursor: pointer;
  }
}
.fileUploadPlace {
  // width: 300px;
  background-color: transparent;
  position: relative;
  cursor: pointer;
  .fileUploadPlaceInner {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    color: #aeaeae;
    .uploadedFile {
      text-align: center;
      height: 100%;
      width: 100%;
      padding-top: 40px;
      display: inline-block;
      font-size: 45px;
    }
    .emptyFile {
      text-align: center;
      height: 100%;
      width: 100%;
      padding-top: 40px;
      display: inline-block;
      font-size: 20px;
      cursor: pointer;
      padding-right: 12px;
      i {
        padding-right: 12px;
      }
    }
  }
}
.uploadBut {
  float: right;
  margin-top: 12px;
}
.addMoreBut {
  i {
    font-size: 15px;
    padding-right: 12px;
  }
}
</style>

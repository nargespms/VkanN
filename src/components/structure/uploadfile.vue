<template >
  <div class="clear">
    <div class="fileUploadWrapper">
      <div id="preview">
        <img v-if="imgUrl" :src="imgUrl" />
      </div>
      <div v-if="fileValue" class="uploadedFile">
        <span v-for="file in fileContent" :key="file.id">{{file.name}}</span>
      </div>
      <div class="fileUploadPlace">
        <div class="fileUploadPlaceInner">
          <div class="emptyFile">
            <q-icon name="fas fa-cloud-upload-alt" />
            <span>Browse ....</span>
            <span>{{$t(this.text)}}</span>
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
      imgUrl: null,
    };
  },
  computed: {
    fileContent() {
      return document.querySelector('input[type=file]').files;
    },
  },
  methods: {
    fileStatus(e) {
      console.log(e);

      this.fileValue = true;
      const file = e.target.files[0];
      this.imgUrl = URL.createObjectURL(file);
    },

    submit_btn() {
      const [file] = document.querySelector('input[type=file]').files;
      if (file) {
        const { name } = file;

        // get the extension from file
        const extension = name.slice(name.lastIndexOf('.') + 1);

        // Create a new tus upload
        const upload = new tus.Upload(file, {
          endpoint: '/v1/api/vkann/upload',
          retryDelays: [0, 3000, 5000, 10000, 20000],
          metadata: {
            filename: file.name,
            filetype: file.type,
            extension,
          },
          onError(error) {
            console.log(`Failed because: ${error}`);
            console.log(upload.url);
          },
          onProgress(bytesUploaded, bytesTotal) {
            const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
            console.log(bytesUploaded, bytesTotal, `${percentage}%`);
          },
          onSuccess: () => {
            this.postUrl(upload, extension);
          },
        });

        upload.start();
      }
    },
    postUrl(file, extension) {
      const { url } = file;
      const id = url.slice(url.lastIndexOf('/') + 1);
      this.$axios
        .post(`/v1/api/vkann/save/${id}`, {
          extension,
        })
        .then(res => {
          console.log(res);
        });
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
#preview {
  img {
    max-width: 100%;
    height: 250px;
    margin: auto;
    display: block;
    padding: 12px;
  }
}
.uploadedFile {
  background: #f4f4f4;
  border: 1px solid #aeaeae;
  width: 95%;
  margin: auto;
  border-radius: 2px;
  padding: 12px;
  span {
    display: block;
  }
}
</style>

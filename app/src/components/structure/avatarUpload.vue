<template >
  <div>
    <div class="avatarWrapp">
      <div id="preview">
        <img v-if="!imgUrl" src="../../assets/Default-user.png" />
        <img v-if="imgUrl" :src="imgUrl" />
      </div>

      <p class="absolute-bottom text-h6 choosePhoto">{{ $t('choosePhoto') }}</p>
      <input
        class="choosePhoto"
        type="file"
        name="filesToUpload"
        multiple
        id="upload_avatar"
        @change="fileStatus"
      />
    </div>
  </div>
</template>

<script>
import tus from '../../../node_modules/tus-js-client/dist/tus.js';

export default {
  name: 'avatarUpload',
  props: ['UploadButton'],
  data() {
    return {
      fileValue: false,
      imgUrl: null,
      startUpload: false,
    };
  },
  methods: {
    fileStatus(e) {
      console.log(e);

      this.fileValue = true;
      const file = e.target.files[0];
      this.imgUrl = URL.createObjectURL(file);
      if (!this.UploadButton) {
        console.log('hi');
        this.submit_btn();
      }
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
          onError: error => {
            console.log(`Failed because: ${error}`);
            console.log(upload.url);
            this.$q.notify({
              message: this.$t('413 Request Entity Too Large'),
              color: 'negative',
              icon: 'warning',
              position: 'top',
            });
          },
          onProgress: (bytesUploaded, bytesTotal) => {
            const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
            console.log(bytesUploaded, bytesTotal, `${percentage}%`);
          },
          onSuccess: () => {
            this.postUrl(upload, extension);
            this.startUpload = true;
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
          this.$emit('changAvatar', id);
        });
    },
  },
};
</script>

<style lang="scss">
.avatarWrapp {
  input[type='file'] {
    opacity: 0;
    width: 100%;
    cursor: pointer;
  }
}
.choosePhoto {
  cursor: pointer;
  background-color: #38373799;
  padding: 12px;
  text-align: center;
  color: #fff;
  font-size: 15px;
}
</style>

<template>
  <div class="addTagWrapp">
    <q-input
      outlined
      class="inputFieldText bg-white mb12"
      color="light-blue-10"
      v-model="newTag"
      :label="$t('EnterNewTag')"
      lazy-rules
      @keyup.enter="addTag"
      autofocus
    >
      <template v-slot:prepend>
        <q-icon name="label" color="primary" />
      </template>
      <template v-slot:append>
        <q-icon name="fas fa-plus" class="addTagIcon" @click="addTag">
          <q-tooltip
            v-model="showing1"
            transition-show="scale"
            transition-hide="scale"
          >{{ $t('addTag') }}</q-tooltip>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  name: 'addTagCmp',
  data() {
    return {
      newTag: '',
      mytags: this.data,
      showing1: false,
    };
  },
  props: ['data'],
  methods: {
    addTag() {
      if (this.newTag.length !== 0) {
        this.$axios
          .post('/v1/api/vkann/tags', {
            description: this.newTag,
            status: 'ACTIVE',
            title: this.newTag,
          })
          .then(response => {
            if (response.status === 200) {
              this.$q.notify({
                message: this.$t('newTagHasBeenAdded'),
                color: 'positive',
                icon: 'check',
                position: 'top',
              });
              this.newTag = null;
              this.$emit('addTag', this.mytags);
            } else if (response.status === 400) {
              this.$q.notify({
                message: this.$t('unvalidtag'),
                color: 'negative',
                icon: 'warning',
                position: 'top',
              });
            }
          })
          .catch(e => {
            if (e.response.status === 403) {
              this.$q.notify({
                message: this.$t('forbidenAccess'),
                color: 'negative',
                icon: 'warning',
                position: 'top',
              });
            } else if (e.response.status === 409) {
              this.$q.notify({
                message: this.$t('reapetedtag'),
                color: 'negative',
                icon: 'warning',
                position: 'top',
              });
            }
          });
      } else {
        this.$q.notify({
          message: this.$t('pleaseTypesomething'),
          color: 'negative',
          icon: 'warning',
          position: 'top',
        });
      }
    },
  },
};
</script>

<style lang="scss">
.addTagWrapp {
  .q-field--outlined .q-field__control {
    padding: 0px 0px 0px 12px;
  }
  .q-field__append {
    background-color: #027be3;
    color: #fff;
    padding: 12px;
    cursor: pointer;
  }
}
</style>

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
          >{{$t('addTag')}}</q-tooltip>
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
      this.$axios
        .post('/v1/api/vkann/tags', {
          description: this.newTag,
          status: 'ACTIVE',
          title: this.newTag,
        })
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            console.log(response);
          } else {
            console.log(response);
          }
        });

      // if (this.newTag) {
      //   // for prevent to add duplicate tag
      //   let isDuplicate = false;
      //   try {
      //     this.mytags.forEach(tag => {
      //       isDuplicate = tag.name === this.newTag;
      //       console.log(`${isDuplicate}foreach`);
      //       if (isDuplicate) throw this.BreakException;
      //     });
      //   } catch (e) {
      //     if (e !== this.BreakException) throw e;
      //   }
      //   if (isDuplicate) {
      //     this.$q.notify({
      //       message: this.$t('tagIsNotValid'),
      //       color: 'negative',
      //       icon: 'warning',
      //       position: 'top',
      //     });
      //   } else {
      //     this.mytags.push({
      //       name: this.newTag,
      //       status: 'active',
      //     });
      //     this.newTag = '';
      //     // console.log(this.mytags[1].name);
      //   }
      // }

      this.$emit('addTag', this.mytags);
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

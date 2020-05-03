<template>
  <div>
    <q-editor
      v-model="qeditor"
      :dense="$q.screen.lt.md"
      min-height="20rem"
      toolbar-text-color="white"
      @input="sendText"
      toolbar-toggle-color="yellow-8"
      toolbar-bg="blue-grey-14"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['token', 'hr', 'link', 'custom_btn'],
        ['removeFormat' , 'code'],
        ['quote', 'unordered', 'ordered'],

        ['undo', 'redo'],
        ['fullscreen'],
      ]"
      :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana',
      }"
    />
  </div>
</template>

<script>
export default {
  name: 'editorProp',
  props: ['data'],
  data() {
    return {
      ticket: this.data,
      qeditor: this.data,
    };
  },
  methods: {
    sendText() {
      this.ticket = this.qeditor;
      this.$emit('changeEditedText', this.ticket);
    },
  },
  watch: {
    /* If our prop ever gets changed outside of this component then we need to update our local data version of the prop */
    data(newVal) {
      this.qeditor = newVal;
    },
  },
};
</script>

<style lang="scss">
.editor {
  min-height: 350px;
}
blockquote {
  background-color: #eee;
  padding: 12px;
  border-radius: 12px;
}
p {
  pre {
    text-align: right;
    direction: rtl;
    margin: 0;
    background-color: #000;
    color: #99dcec;
    padding: 0px 12px;
  }
}
pre {
  text-align: right;
  direction: rtl;
  margin: 0;
  background-color: #000;
  color: #99dcec;
  padding: 0px 12px;
}
</style>

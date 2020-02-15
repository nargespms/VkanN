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
        ['removeFormat'],
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
      qeditor: this.data.desc,
    };
  },
  methods: {
    sendText() {
      this.ticket.desc = this.qeditor;
      this.$emit('changeEditedText', this.ticket);
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
</style>

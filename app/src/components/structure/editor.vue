<template>
  <div>
    <q-editor
      v-model="qeditor"
      :dense="$q.screen.lt.md"
      ref="editor"
      @input="sendText"
      min-height="20rem"
      toolbar-text-color="white"
      toolbar-toggle-color="yellow-8"
      toolbar-bg="blue-grey-14"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['token', 'hr', 'link', 'custom_btn'],
        ['removeFormat' ],
        ['quote', 'unordered', 'ordered' , 'code'],

        ['undo', 'redo'],
        ['fullscreen'],

        ['viewsource'],
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
    ></q-editor>
  </div>
</template>

<script>
export default {
  name: 'editor',
  props: {
    data: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      qeditor: '',
    };
  },
  methods: {
    sendText() {
      this.$emit('getTextFromEditor', this.qeditor);
    },
    add(name) {
      const edit = this.$refs.editor;
      edit.caret.restore();
      edit.runCmd(
        'insertHTML',
        `&nbsp;<div class="addedText editor_token row inline items-center" contenteditable="false">&nbsp;<span>${name}</span>&nbsp;<i class="q-icon material-icons cursor-pointer closeReply" onclick="this.parentNode.parentNode.removeChild(this.parentNode)">close</i></div>&nbsp;`
      );
      edit.focus();
      console.log('addFunc');
    },
  },
  mounted() {
    if (this.data.length > 0) {
      this.add(this.data);
    }
  },
  watch: {
    /* If our prop ever gets changed outside of this component then we need to update our local data version of the prop */
    data(newVal) {
      this.add(newVal);
    },
  },
};
</script>

<style lang="scss">
.editor {
  min-height: 350px;
}

.addedText {
  background-color: #e1e1e1;
  padding: 14px 48px;
  width: 80%;
  margin: auto;
  display: block !important;
  position: relative;
  line-height: 30px;
  word-spacing: 2px;
}
.closeReply {
  position: absolute;
  left: 5px;
  top: 3px;
  font-size: 18px;
  color: red;
  background: #fff5f5;
  border-radius: 1px;
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

blockquote::after {
  content: quote-right;
  font-family: 'FontAwesome';
}
.codeStyle {
  background-color: #000;
  color: #eee;
  direction: ltr;
}
// blockquote {
//   position: relative;
//   /* background: #ddd; */
// }
// blockquote:before {
//   position: absolute;
//   content: open-quote;
//   font-size: 4em;
//   margin-left: -0.6em;
//   margin-top: -0.4em;
// }
// blockquote:after {
//   position: absolute;
//   content: close-quote;
//   font-size: 4em;
//   bottom: 0;
//   right: 0;
//   margin-right: -0.6em;
//   margin-bottom: -0.8em;
// }
</style>

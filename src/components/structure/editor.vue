<template>
  <div>
    <q-editor
      v-model="qeditor"
      :dense="$q.screen.lt.md"
      min-height="20rem"
      toolbar-text-color="white"
      toolbar-toggle-color="yellow-8"
      toolbar-bg="blue-grey-14"
      :toolbar="[
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['bold', 'italic', 'strike', 'underline'],
        ['token', 'hr', 'link', 'custom_btn'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'code'
            ]
          },
          {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },

          'removeFormat'
        ],
        ['quote', 'unordered', 'ordered'],

        ['undo', 'redo'],
        ['print', 'fullscreen'],

        ['viewsource']
      ]"
      :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }"
    />
  </div>
</template>

<script>
export default {
  name: 'editor',
  data() {
    return {
      qeditor: '',
    };
  },
};
</script>

<style lang="scss">
.editor {
  min-height: 350px;
}
</style>

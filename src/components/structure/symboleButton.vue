<template>
  <div class="closeButton" @click="$emit('click')" :class="{ invert: invert }">
    <svg x="0px" y="0px" :width="width" viewBox="0 0 512 512">
      <path
        v-if="symbole === 'back'"
        d="M352 115.4L331.3 96 160 256l171.3 160 20.7-19.3L201.5 256z"
      />
      <path
        v-else
        d="M340.2 160l-84.4 84.3-84-83.9-11.8 11.8 84 83.8-84 83.9 11.8 11.7 84-83.8 84.4 84.2 11.8-11.7-84.4-84.3 84.4-84.2z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    invert: {
      type: Boolean,
      default: false,
    },
    width: {
      default: 42,
      type: Number,
    },
    symbole: {
      type: String,
      default: 'close',
    },
  },
};
</script>

<style lang="scss">
.closeButton {
  cursor: pointer;
  svg {
    fill: #97896b;
    transition: fill 300ms;
    &:hover {
      fill: black;
    }
  }

  &.invert {
    svg {
      fill: white;
      transition: fill 300ms;
      &:hover {
        fill: #97896b;
      }
    }
  }
}
</style>

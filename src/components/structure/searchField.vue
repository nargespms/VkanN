<template>
  <div class="searchWrap">
    <div @click="toggleSearch" class="searchButton">
      <q-icon name="fas fa-search" class="pr12" />
      <span>{{ $t('search') }}</span>
    </div>
    <q-dialog v-model="isOpen" :maximized="maximizedToggle">
      <div class="fullscreenSearchWrap" :class="{ open: isOpen }">
        <form @submit="search">
          <input type="text" required v-model.trim="searchQuery" :placeholder="$t('search')" />
        </form>
        <symboleButton class="searchCloseButton" invert @click="toggleSearch" />
      </div>
    </q-dialog>
  </div>
</template>

<script>
import symboleButton from './symboleButton.vue';

export default {
  components: {
    symboleButton,
  },
  props: ['locale'],
  data() {
    return {
      isOpen: false,
      searchQuery: null,
      maximizedToggle: true,
    };
  },

  methods: {
    toggleSearch() {
      this.isOpen = !this.isOpen;
      this.searchQuery = '';
    },
    search(event) {
      this.$router.push({
        path: `/${this.locale}/search`,
        query: { s: this.searchQuery },
      });
      event.preventDefault();
      this.toggleSearch();
    },
  },
};
</script>

<style lang="scss">
.searchWrap {
  display: inline-block;
  position: relative;
  // margin-left: 24px;
}

.searchButton {
  color: white;
  font-family: inherit;
  font-size: 12px;
  font-weight: bold;
  background: none;
  border: none;
  display: inline;
  padding: 0;
  cursor: pointer;
  &:focus {
    outline: none;
  }
}

.fullscreenSearchWrap {
  visibility: hidden;
  opacity: 0;
  transition: all 300ms;

  &.open {
    opacity: 1;
    visibility: visible;
  }

  background: rgba(0, 0, 0, 0.95);
  position: static;
  z-index: 999999 !important;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    flex: 1;
    max-width: 500px;
  }

  input[type='text'] {
    &:focus {
      outline: none;
    }
    flex: 1;
    font-family: inherit;
    font-size: 18px;
    padding: 12px 0;
    width: 100%;
    border-width: 0 0 1px 0;
    color: white;
    background: none;
  }
}

.searchCloseButton {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}
</style>

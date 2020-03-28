<template>
  <div class="tagWrapper">
    <h3 class="tagsHeader fnb">{{ $t('tagsManagement') }}</h3>
    <addTagCmp :data="tags" @addTag="addToTags" />
    <tagsList
      :key="componentKey"
      @deleteTag="deleteTag"
      @activeAgain="activeagain"
      @setEditTag="addToTags"
    />
  </div>
</template>

<script>
import addTagCmp from './addTagCmp.vue';
import tagsList from './tagsList.vue';

export default {
  name: 'tagWrapper',
  components: {
    addTagCmp,
    tagsList,
  },
  data() {
    return {
      componentKey: 0,
      tags: [
        {
          name: 'tag1',
          status: 'active',
        },
      ],
    };
  },
  methods: {
    addToTags(value) {
      this.tags = value;
      console.log(this.tags);
      this.componentKey += 1;
      // should post to server
    },
    deleteTag(value) {
      this.tags = value;
      this.componentKey += 1;

      // should post to server
    },
    activeagain(value) {
      this.tag = value;
      this.componentKey += 1;
    },
  },
};
</script>

<style scss="scss">
.tagsHeader {
  font-size: 18px;
}
.tagWrapper {
  margin: auto;
  width: 60%;
}
@media screen and (max-width: 1200px) {
  .tagWrapper {
    width: 96%;
  }
}
</style>

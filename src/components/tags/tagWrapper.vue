<template>
  <div class="tagWrapper">
    <h3 class="tagsHeader fnb">{{$t('tagsManagement')}}</h3>
    <addTagCmp :data="tags" @addTag="addToTags" />
    <tagsList
      :data="tags"
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
      // should post to server
    },
    deleteTag(value) {
      this.tags = value;
      // console.log('wrapper');
      // console.log(this.tags);
      // should post to server
    },
    activeagain(value) {
      this.tag = value;
    },
  },
};
</script>

<style scss="scss">
.tagsHeader {
  font-size: 18px;
}
.tagWrapper {
  width: 60%;
  margin: auto;
}
</style>
